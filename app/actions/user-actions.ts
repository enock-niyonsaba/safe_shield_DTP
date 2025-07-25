"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { logActivity } from "@/lib/activity-logger"
import { revalidatePath } from "next/cache"

export async function approveUser(userId: string) {
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

    // Check if current user is admin
    const { data: currentUserProfile } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (currentUserProfile?.role !== "admin") {
      throw new Error("Only admins can approve users")
    }

    // Update user status
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({ status: "active" })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      throw error
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: "approve",
      entityType: "user",
      entityId: userId,
      details: {
        status: "active",
      },
    })

    revalidatePath("/admin/account-approvals")

    return { success: true, user: updatedUser }
  } catch (error: any) {
    console.error("Error approving user:", error)
    return { success: false, error: error.message }
  }
}

export async function rejectUser(userId: string, reason?: string) {
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

    // Check if current user is admin
    const { data: currentUserProfile } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (currentUserProfile?.role !== "admin") {
      throw new Error("Only admins can reject users")
    }

    // Update user status
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({ status: "inactive" })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      throw error
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: "reject",
      entityType: "user",
      entityId: userId,
      details: {
        status: "inactive",
        reason,
      },
    })

    revalidatePath("/admin/account-approvals")

    return { success: true, user: updatedUser }
  } catch (error: any) {
    console.error("Error rejecting user:", error)
    return { success: false, error: error.message }
  }
}

export async function updateUserProfile(formData: FormData) {
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
    const name = formData.get("name") as string
    const department = formData.get("department") as string
    const phone = formData.get("phone") as string

    // Update user profile
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({
        name,
        department,
        phone,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: "update",
      entityType: "user_profile",
      entityId: user.id,
      details: {
        name,
        department,
        phone,
      },
    })

    revalidatePath("/profile")

    return { success: true, user: updatedUser }
  } catch (error: any) {
    console.error("Error updating profile:", error)
    return { success: false, error: error.message }
  }
}

export async function changeUserRole(userId: string, newRole: string) {
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

    // Check if current user is admin
    const { data: currentUserProfile } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (currentUserProfile?.role !== "admin") {
      throw new Error("Only admins can change user roles")
    }

    // Update user role
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({
        role: newRole,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      throw error
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: "change_role",
      entityType: "user",
      entityId: userId,
      details: {
        new_role: newRole,
      },
    })

    revalidatePath("/admin")
    revalidatePath("/admin/account-approvals")

    return { success: true, user: updatedUser }
  } catch (error: any) {
    console.error("Error changing user role:", error)
    return { success: false, error: error.message }
  }
}
