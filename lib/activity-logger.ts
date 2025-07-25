import { getSupabaseClient } from "./supabase/client"

interface LogActivityParams {
  userId: string
  action: string
  entityType: string
  entityId?: string
  details?: Record<string, any>
  ipAddress?: string
}

export async function logActivity({
  userId,
  action,
  entityType,
  entityId,
  details = {},
  ipAddress,
}: LogActivityParams) {
  try {
    const supabase = getSupabaseClient()

    const { error } = await supabase.from("activity_logs").insert([
      {
        user_id: userId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        details,
        ip_address: ipAddress,
      },
    ])

    if (error) {
      console.error("Error logging activity:", error)
    }
  } catch (error) {
    console.error("Failed to log activity:", error)
  }
}

export async function getActivityLogs(options: {
  userId?: string
  entityType?: string
  entityId?: string
  limit?: number
  offset?: number
}) {
  try {
    const supabase = getSupabaseClient()
    const { userId, entityType, entityId, limit = 50, offset = 0 } = options

    let query = supabase.from("activity_logs").select(`
      *,
      users:user_id (name, email)
    `)

    if (userId) {
      query = query.eq("user_id", userId)
    }

    if (entityType) {
      query = query.eq("entity_type", entityType)
    }

    if (entityId) {
      query = query.eq("entity_id", entityId)
    }

    const { data, error } = await query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error fetching activity logs:", error)
    return []
  }
}
