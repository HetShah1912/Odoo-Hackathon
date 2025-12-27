"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, Wrench, Calendar, Menu, X, LogOut, UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/app/actions/auth"

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/equipment", label: "Equipment", icon: Package },
  { href: "/maintenance", label: "Maintenance", icon: Wrench },
  { href: "/calendar", label: "Calendar", icon: Calendar },
]

interface NavigationProps {
  user?: {
    name: string
    email: string
    role: string
  } | null
}

export function Navigation({ user }: NavigationProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (pathname?.startsWith("/auth/")) {
    return null
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-primary to-chart-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105 glow-primary">
              <Wrench className="h-5 w-5 text-primary-foreground" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
              GearGuard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium relative overflow-hidden group",
                    isActive
                      ? "bg-gradient-to-r from-primary to-chart-1 text-primary-foreground shadow-lg glow-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/80",
                  )}
                >
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  )}
                  <item.icon className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )
            })}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="ml-2 h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 hover:from-primary/30 hover:to-chart-2/30 border border-primary/20"
                  >
                    <UserIcon className="h-5 w-5 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-panel border-primary/20">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-primary/10" />
                  <DropdownMenuItem className="text-muted-foreground">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary/10" />
                  <DropdownMenuItem
                    className="text-red-400 focus:text-red-400 focus:bg-red-400/10"
                    onClick={async () => {
                      await signOut()
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/signin">
                <Button className="ml-2 bg-gradient-to-r from-primary to-chart-2">Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-accent/80 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium",
                    isActive
                      ? "bg-gradient-to-r from-primary to-chart-1 text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/80",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            {user ? (
              <>
                <div className="border-t border-border/50 pt-4 mt-4">
                  <div className="px-4 py-2 mb-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <button
                    onClick={async () => {
                      await signOut()
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-red-400 hover:bg-red-400/10 w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-primary to-chart-2">Sign In</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
