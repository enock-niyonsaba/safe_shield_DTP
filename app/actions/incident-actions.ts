"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { logActivity } from "@/lib/activity-logger"
import { revalidatePath } from "next/cache"

export async function createIncident(formData: FormData) {
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

    // Extract form data
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const severity = formData.get("severity") as string
    const category = formData.get("category") as string
    const ipAddress = formData.get("ipAddress") as string
    const affectedSystems = formData.get("affectedSystems") as string

    // Validate required fields
    if (!title || !description || !severity || !category) {
      throw new Error("Missing required fields")
    }

    // Parse affected systems
    const systemsArray = affectedSystems
      ? affectedSystems
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : []

    // Create incident
    const { data: incident, error } = await supabase
      .from("incidents")
      .insert([
        {
          title,
          description,
          severity,
          category,
          ip_address: ipAddress || null,
          affected_systems: systemsArray,
          reported_by: user.id,
        },
      ])
      .select()
      .single()

    if (error) {
      throw error
    }

    // Auto-assign to analyst if severity is high or critical
    if (severity === "high" || severity === "critical") {
      const { data: assignedUser } = await supabase.rpc("assign_incident_to_user", {
        incident_id: incident.id,
      })

      if (assignedUser) {
        await supabase.from("incidents").update({ assigned_to: assignedUser }).eq("id", incident.id)
      }
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: "create",
      entityType: "incident",
      entityId: incident.id,
      details: {
        title,
        severity,
        category,
      },
    })

    revalidatePath("/incidents")
    revalidatePath("/dashboard")

    return { success: true, incident }
  } catch (error: any) {
    console.error("Error creating incident:", error)
    return { success: false, error: error.message }
  }
}

export async function assignIncident(incidentId: string, userId: string) {
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

    // Update incident assignment
    const { data: incident, error } = await supabase
      .from("incidents")
      .update({
        assigned_to: userId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", incidentId)
      .select()
      .single()

    if (error) {
      throw error
    }

    // Create assignment record
    const { error: assignmentError } = await supabase.from("incident_assignments").insert([
      {
        incident_id: incidentId,
        assigned_to: userId,
        assigned_by: user.id,
      },
    ])

    if (assignmentError) {
      throw assignmentError
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: "assign",
      entityType: "incident",
      entityId: incidentId,
      details: {
        assigned_to: userId,
      },
    })

    revalidatePath("/incidents")
    revalidatePath(`/incidents/${incidentId}`)
    revalidatePath("/dashboard")

    return { success: true, incident }
  } catch (error: any) {
    console.error("Error assigning incident:", error)
    return { success: false, error: error.message }
  }
}

export async function updateIncident(incidentId: string, formData: FormData) {
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

    // Extract form data
    const status = formData.get("status") as string
    const resolution = formData.get("resolution") as string
    const assignedTo = formData.get("assignedTo") as string

    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (status) updateData.status = status
    if (resolution) updateData.resolution = resolution
    if (assignedTo) updateData.assigned_to = assignedTo

    // Update incident
    const { data: incident, error } = await supabase
      .from("incidents")
      .update(updateData)
      .eq("id", incidentId)
      .select()
      .single()

    if (error) {
      throw error
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: "update",
      entityType: "incident",
      entityId: incidentId,
      details: updateData,
    })

    revalidatePath("/incidents")
    revalidatePath(`/incidents/${incidentId}`)
    revalidatePath("/dashboard")

    return { success: true, incident }
  } catch (error: any) {
    console.error("Error updating incident:", error)
    return { success: false, error: error.message }
  }
}

export async function addIncidentComment(incidentId: string, content: string) {
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

    // Add comment
    const { data: comment, error } = await supabase
      .from("incident_comments")
      .insert([
        {
          incident_id: incidentId,
          user_id: user.id,
          content,
        },
      ])
      .select(`
        *,
        users:user_id (name, email)
      `)
      .single()

    if (error) {
      throw error
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: "create",
      entityType: "incident_comment",
      entityId: comment.id,
      details: {
        incident_id: incidentId,
        content,
      },
    })

    revalidatePath(`/incidents/${incidentId}`)

    return { success: true, comment }
  } catch (error: any) {
    console.error("Error adding comment:", error)
    return { success: false, error: error.message }
  }
}
