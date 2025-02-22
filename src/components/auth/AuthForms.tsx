
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

type AuthFormType = "login" | "register";

export function AuthForms() {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<AuthFormType>("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle authentication
    toast({
      title: formType === "login" ? "Login Attempted" : "Registration Attempted",
      description: "This is a demo. Authentication is not implemented yet.",
    });
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-white border-white hover:text-gold-500 hover:border-gold-500">
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
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
          <div className="flex flex-col gap-4 pt-4">
            <Button 
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-600 text-barber-950"
            >
              {formType === "login" ? "Sign In" : "Create Account"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={toggleForm}
              className="text-barber-400 hover:text-white"
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
