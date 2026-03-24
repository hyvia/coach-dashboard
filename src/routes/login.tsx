import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useLogin } from "@/features/auth/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import hvyiaLogo from "@/assets/hyvia_logo.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password }, { onSuccess: () => navigate({ to: "/" }) });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-[400px] bg-surface rounded-2xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <img src={hvyiaLogo} alt="Hyvia" className="w-40" />
          <span className="font-heading text-xs font-semibold tracking-[3px] text-muted mt-3">
            COACH PORTAL
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="coach@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-12"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 border-transparent text-muted hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>

          <div className="text-right">
            <Button type="button" variant="link" size="sm">
              Forgot password?
            </Button>
          </div>

          {error && (
            <div className="bg-error-10 text-error text-sm px-4 py-3 rounded-sm">
              {error instanceof Error ? error.message : "Authentication failed"}
            </div>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center mt-8">
          <span className="text-xs text-text-tertiary">Hyvia Coach v1.0.0</span>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
