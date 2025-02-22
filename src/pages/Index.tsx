import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Scissors, Clock, CalendarDays, MapPin, Phone, Mail, Facebook, ChevronDown } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { useIsMobile } from "@/hooks/use-mobile";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AuthForms } from "@/components/auth/AuthForms";
import { BookingForm } from "@/components/booking/BookingForm";

const services = [
  {
    id: 1,
    name: "Classic Haircut",
    price: "$30",
    duration: "30 min",
    description: "Traditional haircut with modern styling",
  },
  {
    id: 2,
    name: "Beard Trim",
    price: "$25",
    duration: "20 min",
    description: "Professional beard grooming and shaping",
  },
  {
    id: 3,
    name: "Hot Towel Shave",
    price: "$35",
    duration: "45 min",
    description: "Luxurious traditional straight razor shave",
  },
  {
    id: 4,
    name: "Hair & Beard Combo",
    price: "$50",
    duration: "60 min",
    description: "Complete grooming package",
  },
];

const galleryImages = [
  {
    id: 1,
    type: "before-after",
    title: "Classic Fade Transformation",
    beforeImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e",
    afterImage: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c",
  },
  {
    id: 2,
    type: "interior",
    title: "Modern Workspace",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
    description: "Our state-of-the-art barbershop interior",
  },
  {
    id: 3,
    type: "before-after",
    title: "Beard Grooming",
    beforeImage: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
    afterImage: "https://images.unsplash.com/photo-1621605774974-01ecce055b78",
  },
  {
    id: 4,
    type: "interior",
    title: "Waiting Area",
    image: "https://images.unsplash.com/photo-1519415943484-9b6adf564897",
    description: "Comfortable waiting area for our clients",
  },
];

const Index = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically handle the form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHR3ZGR5bjIwbHNpMmttbGxkMGg3emluIn0.zcJtmxCqZVbGZR-JLJqL1g';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.006, 40.7128], // Example coordinates (NYC)
      zoom: 15
    });

    new mapboxgl.Marker()
      .setLngLat([-74.006, 40.7128])
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-barber-50">
      <header className="fixed w-full bg-barber-950/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Scissors className="w-8 h-8 text-gold-500" />
                <div className="hidden md:block">
                  <h1 className="text-xl font-bold text-white">VongCut</h1>
                  <p className="text-sm text-barber-400">Craft Your Style</p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <a href="/" className="flex items-center gap-1 text-white hover:text-gold-500 transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </a>

                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-white hover:text-gold-500 transition-colors">
                    Services <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-barber-900 border-barber-800">
                    {services.map((service) => (
                      <DropdownMenuItem
                        key={service.id}
                        className="text-barber-200 hover:text-white hover:bg-barber-800 cursor-pointer"
                      >
                        <Scissors className="w-4 h-4 mr-2" />
                        <span>{service.name}</span>
                        <span className="ml-auto text-sm text-gold-500">{service.price}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-white hover:text-gold-500 transition-colors">
                    About <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-barber-900 border-barber-800">
                    <DropdownMenuItem className="text-barber-200 hover:text-white hover:bg-barber-800 cursor-pointer">
                      Our Story
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-barber-200 hover:text-white hover:bg-barber-800 cursor-pointer">
                      Team
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-barber-200 hover:text-white hover:bg-barber-800 cursor-pointer">
                      Gallery
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <a href="#contact" className="text-white hover:text-gold-500 transition-colors">
                  Contact
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-barber-300">
                <Phone className="w-4 h-4 text-gold-500" />
                <span>2077832019</span>
              </div>
              <AuthForms />
              <Button 
                size={isMobile ? "default" : "lg"}
                className="bg-gold-500 hover:bg-gold-600 text-barber-950"
              >
                Book Now
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:text-gold-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <ChevronDown className="w-6 h-6 rotate-180 transition-transform" />
                ) : (
                  <ChevronDown className="w-6 h-6 transition-transform" />
                )}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden py-4 mt-4 border-t border-barber-800"
            >
              <div className="flex flex-col gap-4">
                <a href="/" className="flex items-center gap-2 text-white hover:text-gold-500 transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </a>
                
                <div className="space-y-2">
                  <p className="text-barber-400 text-sm font-medium">Services</p>
                  {services.map((service) => (
                    <a
                      key={service.id}
                      href="#"
                      className="flex items-center gap-2 text-white hover:text-gold-500 transition-colors pl-4"
                    >
                      <Scissors className="w-4 h-4" />
                      <span>{service.name}</span>
                      <span className="ml-auto text-sm text-gold-500">{service.price}</span>
                    </a>
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="text-barber-400 text-sm font-medium">About</p>
                  <a href="#" className="block text-white hover:text-gold-500 transition-colors pl-4">Our Story</a>
                  <a href="#" className="block text-white hover:text-gold-500 transition-colors pl-4">Team</a>
                  <a href="#" className="block text-white hover:text-gold-500 transition-colors pl-4">Gallery</a>
                </div>

                <a href="#contact" className="text-white hover:text-gold-500 transition-colors">
                  Contact
                </a>

                <div className="flex items-center gap-2 text-barber-300">
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span>2077832019</span>
                </div>
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full"
          >
            <source
              src="https://player.vimeo.com/external/467937301.sd.mp4?s=04b3d5e45dc1d25fe3d49839523f385f02c733b6&profile_id=165&oauth2_token_id=57447761"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-barber-950/90 to-barber-950/70" />
        </div>

        <div className="container mx-auto px-4 relative z-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left max-w-xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premium Grooming Experience
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Experience the art of traditional barbering with modern sophistication. Our master barbers are dedicated to crafting your perfect style.
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg"
                className="bg-gold-500 hover:bg-gold-600 text-barber-950"
              >
                Book Appointment
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-gold hover:bg-white/10 hover:text-gold-500"
              >
                View Services
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Book Your Visit</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="w-5 h-5 text-gold-500" />
                <span>Open 7 days a week, 9AM - 8PM</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-gold-500" />
                <span>123 Barber Street, Downtown</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CalendarDays className="w-5 h-5 text-gold-500" />
                <span>Next available: Today at 2:30 PM</span>
              </div>
              <Button 
                size="lg"
                className="w-full bg-gold-500 hover:bg-gold-600 text-barber-950 mt-4"
              >
                Check Available Times
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-barber-900 mb-4">
              Our Services
            </h2>
            <p className="text-barber-600">
              Professional grooming services for the modern gentleman
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-barber-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <Scissors className="w-10 h-10 text-gold-500 mb-4" />
                <h3 className="text-xl font-semibold text-barber-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-barber-600 mb-4">{service.description}</p>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gold-500 font-semibold">{service.price}</span>
                    <span className="text-barber-500 text-sm">{service.duration}</span>
                  </div>
                  <BookingForm service={service} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-barber-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Gallery
            </h2>
            <p className="text-barber-400">
              See the transformations and our premium barbershop environment
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {galleryImages.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg overflow-hidden"
              >
                {item.type === "before-after" ? (
                  <div className="relative group">
                    <div className="relative h-40 md:h-80 w-full">
                      <img
                        src={item.beforeImage}
                        alt={`Before - ${item.title}`}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                      <img
                        src={item.afterImage}
                        alt={`After - ${item.title}`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white text-sm md:text-xl font-semibold">{item.title}</h3>
                        <p className="text-barber-200 text-xs md:text-sm">Hover to see transformation</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-40 md:h-80">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white text-sm md:text-xl font-semibold">{item.title}</h3>
                        <p className="text-barber-200 text-xs md:text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-barber-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-barber-600">
              Have questions? Drop us a message and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 bg-white rounded-lg shadow-sm p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[150px]"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-600 text-barber-950"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex flex-col items-start p-6 rounded-lg bg-barber-50">
                <h3 className="text-xl font-semibold text-barber-900 mb-4">Find Us</h3>
                <p className="text-barber-600 mb-4">123 Barber Street, Downtown</p>
                <div ref={mapContainer} className="w-full h-[300px] rounded-lg overflow-hidden" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-barber-900 mb-6">
              Ready for a Fresh Look?
            </h2>
            <p className="text-barber-600 mb-8 max-w-2xl mx-auto">
              Experience the finest in men's grooming. Our skilled barbers are ready to help you achieve your perfect style.
            </p>
            <Button 
              size="lg"
              className="bg-gold-500 hover:bg-gold-600 text-barber-950"
            >
              Book Your Visit
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="bg-barber-950 text-barber-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Scissors className="w-6 h-6 text-gold-500" />
                <h3 className="text-xl font-bold text-white">VongCut</h3>
              </div>
              <p className="text-sm text-barber-400">
                Premium grooming services for the modern gentleman.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gold-500 hover:text-gold-400">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gold-500 hover:text-gold-400">
                  <BsWhatsapp className="w-5 h-5" />
                </a>
                <a href="#" className="text-gold-500 hover:text-gold-400">
                  <FaTiktok className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-barber-400 hover:text-gold-500">Services</a>
                </li>
                <li>
                  <a href="#" className="text-barber-400 hover:text-gold-500">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-barber-400 hover:text-gold-500">Gallery</a>
                </li>
                <li>
                  <a href="#" className="text-barber-400 hover:text-gold-500">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Business Hours</h4>
              <ul className="space-y-2">
                <li className="text-barber-400">Monday - Friday: 9AM - 8PM</li>
                <li className="text-barber-400">Saturday: 9AM - 6PM</li>
                <li className="text-barber-400">Sunday: 10AM - 4PM</li>
              </ul>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-barber-400">
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span>2077832019</span>
                </div>
                <div className="flex items-center gap-2 text-barber-400">
                  <Mail className="w-4 h-4 text-gold-500" />
                  <span>info@vongcut.com</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-barber-400 hover:text-gold-500">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-barber-400 hover:text-gold-500">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-barber-400 hover:text-gold-500">Cancellation Policy</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-barber-800 mt-12 pt-8 text-center text-barber-400 text-sm">
            <p>&copy; {new Date().getFullYear()} VongCut. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
