"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUp } from "@/app/actions/auth"
import { Loader2, Mail, Lock, User } from "lucide-react"

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const result = await signUp(formData)

      if (result.success) {
        router.push("/")
        router.refresh()
      } else {
        setError(result.error || "Failed to create account")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="glass-panel p-8 rounded-2xl border border-primary/20">
        <div className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Rajesh Kumar"
              required
              disabled={isLoading}
              className="h-12 bg-background/50 border-primary/20 focus:border-primary/40 transition-colors"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="rajesh.kumar@example.com"
              required
              disabled={isLoading}
              className="h-12 bg-background/50 border-primary/20 focus:border-primary/40 transition-colors"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              required
              minLength={8}
              disabled={isLoading}
              className="h-12 bg-background/50 border-primary/20 focus:border-primary/40 transition-colors"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              required
              minLength={8}
              disabled={isLoading}
              className="h-12 bg-background/50 border-primary/20 focus:border-primary/40 transition-colors"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm pt-2">
            <input
              type="checkbox"
              required
              className="mt-0.5 rounded border-primary/20 text-primary focus:ring-primary"
            />
            <span className="text-muted-foreground text-xs">
              I agree to the{" "}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Privacy Policy
              </a>
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 h-12 bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 transition-all duration-300 text-base font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
    </form>
  )
}
