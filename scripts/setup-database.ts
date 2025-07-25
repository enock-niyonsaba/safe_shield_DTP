import fs from "fs"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

// Load environment variables
dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  try {
    console.log("Setting up database...")

    // Read schema SQL
    const schemaSql = fs.readFileSync("./scripts/schema.sql", "utf8")

    // Execute schema SQL
    console.log("Creating database schema...")
    const { error: schemaError } = await supabase.rpc("pgexec", { query: schemaSql })

    if (schemaError) {
      throw new Error(`Error creating schema: ${schemaError.message}`)
    }

    console.log("Schema created successfully")

    // Read seed SQL
    const seedSql = fs.readFileSync("./scripts/seed.sql", "utf8")

    // Execute seed SQL
    console.log("Seeding database...")
    const { error: seedError } = await supabase.rpc("pgexec", { query: seedSql })

    if (seedError) {
      throw new Error(`Error seeding database: ${seedError.message}`)
    }

    console.log("Database seeded successfully")

    // Create admin user in auth
    console.log("Creating admin user...")
    const { error: signUpError } = await supabase.auth.admin.createUser({
      email: "admin@company.com",
      password: "S@feShield2024!",
      email_confirm: true,
      user_metadata: {
        name: "Admin User",
        role: "admin",
      },
    })

    if (signUpError) {
      throw new Error(`Error creating admin user: ${signUpError.message}`)
    }

    console.log("Admin user created successfully")
    console.log("Database setup complete!")
  } catch (error) {
    console.error("Error setting up database:", error)
    process.exit(1)
  }
}

setupDatabase()
