"use server"

import { createServerClient } from "@/lib/supabase/server"

export async function createAdminUser() {
  const supabase = createServerClient()

  try {
    // First, try to sign up the admin user
    const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
      email: "admin@company.com",
      password: "S@feShield2024!",
      email_confirm: true,
      user_metadata: {
        full_name: "System Administrator",
        role: "Admin",
      },
    })

    if (signUpError) {
      console.error("Error creating admin user:", signUpError)
      return { error: signUpError.message }
    }

    if (signUpData.user) {
      // Create the profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: signUpData.user.id,
        email: "admin@company.com",
        full_name: "System Administrator",
        role: "Admin",
        status: "active",
      })

      if (profileError) {
        console.error("Error creating admin profile:", profileError)
        return { error: profileError.message }
      }

      console.log("Admin user created successfully")
      return { success: true }
    }

    return { error: "Failed to create admin user" }
  } catch (error) {
    console.error("Unexpected error creating admin user:", error)
    return { error: "Unexpected error occurred" }
  }
}
