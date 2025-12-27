"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/app/actions/auth"
import { Loader2, Mail, Lock } from "lucide-react"

export function SignInForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    try {
      const result = await signIn(formData)

      if (result.success) {
        router.push("/")
        router.refresh()
      } else {
        setError(result.error || "Invalid email or password")
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
              placeholder="Enter your password"
              required
              disabled={isLoading}
              className="h-12 bg-background/50 border-primary/20 focus:border-primary/40 transition-colors"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-primary/20 text-primary focus:ring-primary" />
              <span className="text-muted-foreground">Remember me</span>
            </label>
            <a href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Forgot password?
            </a>
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
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </div>

      {/* Demo Credentials */}
      <div className="glass-panel p-4 rounded-xl border border-chart-2/20 bg-chart-2/5">
        <p className="text-xs text-muted-foreground text-center">
          <strong className="text-foreground">Demo:</strong> rajesh.kumar@gearguard.in / password123
        </p>
      </div>
    </form>
  )
}
