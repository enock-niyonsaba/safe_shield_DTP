export interface PasswordStrength {
  score: number
  feedback: string[]
  isValid: boolean
}

export function checkPasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = []
  let score = 0

  // Length check
  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push("Password must be at least 8 characters long")
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push("Add at least one uppercase letter")
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push("Add at least one lowercase letter")
  }

  // Number check
  if (/\d/.test(password)) {
    score += 1
  } else {
    feedback.push("Add at least one number")
  }

  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1
  } else {
    feedback.push("Add at least one special character")
  }

  return {
    score,
    feedback,
    isValid: score >= 4 && password.length >= 8,
  }
}

export function getPasswordStrengthLabel(score: number): string {
  switch (score) {
    case 0:
    case 1:
      return "Very Weak"
    case 2:
      return "Weak"
    case 3:
      return "Fair"
    case 4:
      return "Good"
    case 5:
      return "Strong"
    default:
      return "Very Weak"
  }
}

export function getPasswordStrengthColor(score: number): string {
  switch (score) {
    case 0:
    case 1:
      return "bg-red-500"
    case 2:
      return "bg-orange-500"
    case 3:
      return "bg-yellow-500"
    case 4:
      return "bg-blue-500"
    case 5:
      return "bg-green-500"
    default:
      return "bg-red-500"
  }
}
