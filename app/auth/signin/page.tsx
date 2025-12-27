import { SignInForm } from "@/components/auth/signin-form"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Shield } from "lucide-react"

export default async function SignInPage() {
  const user = await getSession()

  if (user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-chart-2/20 backdrop-blur-xl border border-primary/20 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-chart-2 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">Sign in to access GearGuard</p>
        </div>

        {/* Sign In Form */}
        <SignInForm />

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {"Don't have an account? "}
          <a href="/auth/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
