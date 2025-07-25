"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { logActivity } from "@/lib/activity-logger"
import { revalidatePath } from "next/cache"

export async function uploadEvidence(incidentId: string, formData: FormData) {
  try {
    const supabase = createServerSupabaseClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      throw new Error("User not authenticated")
    }

    const file = formData.get("file") as File
    const description = formData.get("description") as string

    if (!file) {
      throw new Error("No file provided")
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      throw new Error("File size exceeds 50MB limit")
    }

    // Generate unique file path
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `evidence/${incidentId}/${fileName}`

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage.from("evidence").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (uploadError) {
      throw uploadError
    }

    // Create evidence record
    const { data: evidence, error: dbError } = await supabase
      .from("evidence")
      .insert([
        {
          incident_id: incidentId,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: user.id,
          description,
        },
      ])
      .select(`
        *,
        users:uploaded_by (name, email)
      `)
      .single()

    if (dbError) {
      // Clean up uploaded file if database insert fails
      await supabase.storage.from("evidence").remove([filePath])
      throw dbError
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: "upload",
      entityType: "evidence",
      entityId: evidence.id,
      details: {
        incident_id: incidentId,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
      },
    })

    revalidatePath(`/incidents/${incidentId}`)

    return { success: true, evidence }
  } catch (error: any) {
    console.error("Error uploading evidence:", error)
    return { success: false, error: error.message }
  }
}

export async function downloadEvidence(evidenceId: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      throw new Error("User not authenticated")
    }

    // Get evidence record
    const { data: evidence, error: evidenceError } = await supabase
      .from("evidence")
      .select("*")
      .eq("id", evidenceId)
      .single()

    if (evidenceError || !evidence) {
      throw new Error("Evidence not found")
    }

    // Get signed URL for download
    const { data: signedUrl, error: urlError } = await supabase.storage
      .from("evidence")
      .createSignedUrl(evidence.file_path, 3600) // 1 hour expiry

    if (urlError) {
      throw urlError
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: "download",
      entityType: "evidence",
      entityId: evidenceId,
      details: {
        file_name: evidence.file_name,
        incident_id: evidence.incident_id,
      },
    })

    return { success: true, url: signedUrl.signedUrl, fileName: evidence.file_name }
  } catch (error: any) {
    console.error("Error downloading evidence:", error)
    return { success: false, error: error.message }
  }
}

export async function deleteEvidence(evidenceId: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      throw new Error("User not authenticated")
    }

    // Get evidence record
    const { data: evidence, error: evidenceError } = await supabase
      .from("evidence")
      .select("*")
      .eq("id", evidenceId)
      .single()

    if (evidenceError || !evidence) {
      throw new Error("Evidence not found")
    }

    // Check permissions (only uploader or admin can delete)
    const { data: userProfile } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (evidence.uploaded_by !== user.id && userProfile?.role !== "admin") {
      throw new Error("Permission denied")
    }

    // Delete file from storage
    const { error: storageError } = await supabase.storage.from("evidence").remove([evidence.file_path])

    if (storageError) {
      console.error("Error deleting file from storage:", storageError)
    }

    // Delete evidence record
    const { error: deleteError } = await supabase.from("evidence").delete().eq("id", evidenceId)

    if (deleteError) {
      throw deleteError
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: "delete",
      entityType: "evidence",
      entityId: evidenceId,
      details: {
        file_name: evidence.file_name,
        incident_id: evidence.incident_id,
      },
    })

    revalidatePath(`/incidents/${evidence.incident_id}`)

    return { success: true }
  } catch (error: any) {
    console.error("Error deleting evidence:", error)
    return { success: false, error: error.message }
  }
}
