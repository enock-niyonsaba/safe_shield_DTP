"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { logActivity } from "@/lib/activity-logger"
import { revalidatePath } from "next/cache"

export async function startTrainingModule(moduleId: string) {
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

    // Check if progress already exists
    const { data: existingProgress } = await supabase
      .from("training_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("module_id", moduleId)
      .single()

    if (existingProgress) {
      return { success: true, progress: existingProgress }
    }

    // Create new progress record
    const { data: progress, error } = await supabase
      .from("training_progress")
      .insert([
        {
          user_id: user.id,
          module_id: moduleId,
          progress: 0,
          completed: false,
        },
      ])
      .select(`
        *,
        training_modules:module_id (title, description, duration, difficulty, category)
      `)
      .single()

    if (error) {
      throw error
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: "start",
      entityType: "training_module",
      entityId: moduleId,
      details: {
        module_id: moduleId,
      },
    })

    revalidatePath("/training")

    return { success: true, progress }
  } catch (error: any) {
    console.error("Error starting training module:", error)
    return { success: false, error: error.message }
  }
}

export async function updateTrainingProgress(moduleId: string, progressPercentage: number) {
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

    // Validate progress percentage
    const validProgress = Math.max(0, Math.min(100, progressPercentage))
    const isCompleted = validProgress >= 100

    // Update progress
    const { data: progress, error } = await supabase
      .from("training_progress")
      .update({
        progress: validProgress,
        completed: isCompleted,
        completed_at: isCompleted ? new Date().toISOString() : null,
      })
      .eq("user_id", user.id)
      .eq("module_id", moduleId)
      .select(`
        *,
        training_modules:module_id (title, description, duration, difficulty, category)
      `)
      .single()

    if (error) {
      throw error
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: isCompleted ? "complete" : "update",
      entityType: "training_progress",
      entityId: progress.id,
      details: {
        module_id: moduleId,
        progress: validProgress,
        completed: isCompleted,
      },
    })

    revalidatePath("/training")

    return { success: true, progress }
  } catch (error: any) {
    console.error("Error updating training progress:", error)
    return { success: false, error: error.message }
  }
}

export async function submitTrainingScore(moduleId: string, score: number) {
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

    // Validate score
    const validScore = Math.max(0, Math.min(100, score))

    // Update progress with score
    const { data: progress, error } = await supabase
      .from("training_progress")
      .update({
        score: validScore,
        completed: true,
        completed_at: new Date().toISOString(),
        progress: 100,
      })
      .eq("user_id", user.id)
      .eq("module_id", moduleId)
      .select(`
        *,
        training_modules:module_id (title, description, duration, difficulty, category)
      `)
      .single()

    if (error) {
      throw error
    }

    // Log activity
    await logActivity({
      userId: user.id,
      action: "submit_score",
      entityType: "training_progress",
      entityId: progress.id,
      details: {
        module_id: moduleId,
        score: validScore,
      },
    })

    revalidatePath("/training")

    return { success: true, progress }
  } catch (error: any) {
    console.error("Error submitting training score:", error)
    return { success: false, error: error.message }
  }
}

export async function getTrainingProgress(userId?: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Get current user if no userId provided
    let targetUserId = userId
    if (!targetUserId) {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()
      if (authError || !user) {
        throw new Error("User not authenticated")
      }
      targetUserId = user.id
    }

    // Get training progress
    const { data: progress, error } = await supabase
      .from("training_progress")
      .select(`
        *,
        training_modules:module_id (
          id,
          title,
          description,
          duration,
          difficulty,
          category,
          content_path
        )
      `)
      .eq("user_id", targetUserId)
      .order("started_at", { ascending: false })

    if (error) {
      throw error
    }

    return { success: true, progress }
  } catch (error: any) {
    console.error("Error getting training progress:", error)
    return { success: false, error: error.message }
  }
}
