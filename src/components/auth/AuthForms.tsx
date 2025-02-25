import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, User } from "lucide-react";

type AuthFormType = "login" | "register";

export function AuthForms() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [formType, setFormType] = useState<AuthFormType>("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { user, signOut } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (formType === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
            },
          },
        });

        if (signUpError) throw signUpError;

        toast({
          title: "Registration successful",
          description: "Please check your email to verify your account.",
        });
      }

      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleForm = () => {
    setFormType(formType === "login" ? "register" : "login");
    setFormData({ email: "", password: "", name: "" });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-white">{user.user_metadata.full_name}</span>
        <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gold-500"
            >
              <User className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-barber-900 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">Confirm logout</DialogTitle>
              <DialogDescription className="text-barber-400">
                Are you sure you want to logout?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 mt-4">
              <Button
                variant="ghost"
                onClick={() => setIsLogoutDialogOpen(false)}
                className="text-white hover:text-gold-500"
              >
                cancel
              </Button>
              <Button
                onClick={handleSignOut}
                className="bg-gold-500 hover:bg-gold-600 text-barber-950"
              >
                confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-gold-700 border-white hover:text-gold-500 hover:border-gold-500">
          {formType === "login" ? "Login" : "Register"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-barber-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
            {formType === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-barber-400">
            {formType === "login"
              ? "Enter your credentials to access your account"
              : "Fill out the form below to create your account"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formType === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="bg-barber-800 border-barber-700 text-white placeholder:text-barber-500"
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-barber-800 border-barber-700 text-white placeholder:text-barber-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="bg-barber-800 border-barber-700 text-white placeholder:text-barber-500"
              required
            />
          </div>
          <div className="space-y-4">
            <Button 
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-600 text-barber-950"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : formType === "login" ? "Sign In" : "Create Account"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={toggleForm}
              className="text-barber-400 hover:text-white"
              disabled={isLoading}
            >
              {formType === "login"
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
