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
import { AuthForms } from "@/components/auth/AuthForms";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

type Service = {
  id: number;
  name: string;
  price: string;
  duration: string;
  description: string;
};

type BookingFormProps = {
  service: Service;
};

export function BookingForm({ service }: BookingFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    notes: "",
  });
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!user) throw new Error("Please login to book an appointment");

      const { error } = await supabase
        .from("bookings")
        .insert([
          {
            user_id: user.id,
            service_id: service.id,
            service_name: service.name,
            booking_date: `${formData.date}T${formData.time}`,
            notes: formData.notes,
            status: "pending",
          },
        ]);

      if (error) throw error;

      toast({
        title: "Booking successful",
        description: "We'll confirm your appointment shortly.",
      });
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full bg-gold-500 hover:bg-gold-600 text-barber-950"
          size="sm"
        >
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-barber-900 text-white">
        {!isAuthenticated ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">
                Login Required
              </DialogTitle>
              <DialogDescription className="text-barber-400">
                Please login or create an account to book an appointment
              </DialogDescription>
            </DialogHeader>
            <AuthForms />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">
                Book {service.name}
              </DialogTitle>
              <DialogDescription className="text-barber-400">
                Duration: {service.duration} • Price: {service.price}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-white">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="bg-barber-800 border-barber-700 text-white"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-white">Time</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="bg-barber-800 border-barber-700 text-white"
                  required
                  min="09:00"
                  max="18:00"
                  step="1800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-white">Notes (Optional)</Label>
                <Input
                  id="notes"
                  name="notes"
                  type="text"
                  placeholder="Any special requests?"
                  value={formData.notes}
                  onChange={handleChange}
                  className="bg-barber-800 border-barber-700 text-white placeholder:text-barber-500"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-gold-500 hover:bg-gold-600 text-barber-950"
                disabled={isLoading}
              >
                {isLoading ? "Booking..." : "Confirm Booking"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
