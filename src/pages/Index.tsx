import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Scissors, Clock, CalendarDays, MapPin, Phone, Mail, Facebook, ChevronDown, Heart, Share2, Download, X, ChevronLeft, ChevronRight, Maximize2, Star, Flame, Users } from "lucide-react";
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
import { UdifyChat } from "@/components/chat/UdifyChat";

const services = [
  {
    id: 1,
    name: "Classic Haircut",
    price: "$30",
    duration: "30 min",
    description: "Traditional haircut with modern styling",
    rating: 4.8,
    bookingsCount: 1250,
    isPopular: true
  },
  {
    id: 2,
    name: "Beard Trim",
    price: "$25",
    duration: "20 min",
    description: "Professional beard grooming and shaping",
    rating: 4.9,
    bookingsCount: 980,
    isPopular: false
  },
  {
    id: 3,
    name: "Hot Towel Shave",
    price: "$35",
    duration: "45 min",
    description: "Luxurious traditional straight razor shave",
    rating: 4.7,
    bookingsCount: 750,
    isPopular: false
  },
  {
    id: 4,
    name: "Hair & Beard Combo",
    price: "$50",
    duration: "60 min",
    description: "Complete grooming package",
    rating: 4.9,
    bookingsCount: 1100,
    isPopular: true
  },
];

const galleryImages = [
  {
    id: 1,
    type: "before-after",
    title: "Classic Fade Transformation",
    beforeImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e",
    afterImage: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c",
    likes: 0,
  },
  {
    id: 2,
    type: "interior",
    title: "Modern Workspace",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
    description: "Our state-of-the-art barbershop interior",
    likes: 0,
  },
  {
    id: 3,
    type: "before-after",
    title: "Beard Grooming",
    beforeImage: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
    afterImage: "https://images.unsplash.com/photo-1621605774974-01ecce055b78",
    likes: 0,
  },
  {
    id: 4,
    type: "interior",
    title: "Waiting Area",
    image: "https://images.unsplash.com/photo-1519415943484-9b6adf564897",
    description: "Comfortable waiting area for our clients",
    likes: 0,
  },
];

const Index = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [likedImages, setLikedImages] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleLike = (imageId: number) => {
    setLikedImages(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      }
      return [...prev, imageId];
    });
  };

  const handleShare = async (image: typeof galleryImages[0]) => {
    try {
      const shareData = {
        title: image.title,
        text: `Check out this amazing ${image.title} at VongCut Barbershop!`,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(shareData.text);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = async (image: typeof galleryImages[0]) => {
    try {
      const imageUrl = image.type === "before-after" ? image.afterImage : image.image;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleImageClick = (image: typeof galleryImages[0], index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handleCloseGallery = () => {
    setSelectedImage(null);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev - 1;
      if (newIndex < 0) return galleryImages.length - 1;
      return newIndex;
    });
    setSelectedImage(galleryImages[currentImageIndex]);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex >= galleryImages.length) return 0;
      return newIndex;
    });
    setSelectedImage(galleryImages[currentImageIndex]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage) {
      if (e.key === 'Escape') handleCloseGallery();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHR3ZGR5bjIwbHNpMmttbGxkMGg3emluIn0.zcJtmxCqZVbGZR-JLJqL1g';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [102.6331, 17.9757], // พิกัดของเวียงจันทน์ ลาว
      zoom: 14
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // เพิ่มเส้นทางระหว่างจุดต่างๆ
      map.current.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [102.6281, 17.9707], // จุดเริ่มต้น (บ้าน)
              [102.6301, 17.9727],
              [102.6321, 17.9747],
              [102.6331, 17.9757], // จุดสิ้นสุด (ร้านตัดผม)
            ]
          }
        }
      });
      
      map.current.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#FF0000',
          'line-width': 6
        }
      });

      // เพิ่มไอคอนบ้าน
      const homeElement = document.createElement('div');
      homeElement.className = 'home-marker';
      homeElement.innerHTML = `
        <div style="background-color: #FF0000; border-radius: 50%; width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 10px rgba(0,0,0,0.3);">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
      `;
      
      new mapboxgl.Marker(homeElement)
        .setLngLat([102.6281, 17.9707])
        .addTo(map.current);

      // เพิ่มไอคอนรถเข็นช้อปปิ้ง (ตามภาพที่แสดง)
      const cartElement = document.createElement('div');
      cartElement.className = 'cart-marker';
      cartElement.innerHTML = `
        <div style="background-color: #FF0000; border-radius: 50%; width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 10px rgba(0,0,0,0.3);">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
      `;
      
      new mapboxgl.Marker(cartElement)
        .setLngLat([102.6351, 17.9767])
        .addTo(map.current);

      // เพิ่มเส้นทางที่สอง (เส้นทางจากบ้านไปยังร้านค้า)
      map.current.addSource('route2', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [102.6281, 17.9707], // จุดเริ่มต้น (บ้าน)
              [102.6311, 17.9737],
              [102.6351, 17.9767], // จุดสิ้นสุด (ร้านค้า)
            ]
          }
        }
      });
      
      map.current.addLayer({
        'id': 'route2',
        'type': 'line',
        'source': 'route2',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#FF0000',
          'line-width': 6
        }
      });

      // เพิ่มพื้นที่สีเขียวอ่อนและสระน้ำสีฟ้า (สวนสาธารณะ)
      map.current.addSource('park', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Polygon',
            'coordinates': [[
              [102.6341, 17.9757],
              [102.6361, 17.9777],
              [102.6381, 17.9767],
              [102.6371, 17.9747],
              [102.6341, 17.9757]
            ]]
          }
        }
      });
      
      map.current.addLayer({
        'id': 'park',
        'type': 'fill',
        'source': 'park',
        'layout': {},
        'paint': {
          'fill-color': '#ABEBC6',
          'fill-opacity': 0.8
        }
      });

      // เพิ่มสระน้ำสีฟ้า
      map.current.addSource('lake', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Polygon',
            'coordinates': [[
              [102.6351, 17.9757],
              [102.6361, 17.9767],
              [102.6371, 17.9757],
              [102.6361, 17.9747],
              [102.6351, 17.9757]
            ]]
          }
        }
      });
      
      map.current.addLayer({
        'id': 'lake',
        'type': 'fill',
        'source': 'lake',
        'layout': {},
        'paint': {
          'fill-color': '#AED6F1',
          'fill-opacity': 0.8
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex]);

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
                      <a href="#gallery">
                        Gallery
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <a href="#contact" className="text-white hover:text-gold-500 transition-colors">
                  Contact
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <a 
                  href="https://wa.me/8562077832019" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-barber-300 hover:text-gold-500 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span>2077832019</span>
                </a>
              </div>
              <AuthForms />
              <Button 
                size={isMobile ? "default" : "lg"}
                className="bg-gold-500 hover:bg-gold-600 text-barber-950"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
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
                  <a href="/our-story" className="block text-white hover:text-gold-500 transition-colors pl-4">Our Story</a>
                  <a href="/team" className="block text-white hover:text-gold-500 transition-colors pl-4">Team</a>
                  <a href="/gallery" className="block text-white hover:text-gold-500 transition-colors pl-4">Gallery</a>
                </div>

                <a href="#contact" className="text-white hover:text-gold-500 transition-colors">
                  Contact
                </a>

                <div className="flex items-center gap-2 text-barber-300">
                  <a 
                  href="https://wa.me/8562077832019" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-barber-300 hover:text-gold-500 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span>2077832019</span>
                </a>
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
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book Appointment
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-gold hover:bg-white/10 hover:text-gold-500"
                onClick={() => window.location.href = "#services"}
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
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Check Available Times
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
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
                className="bg-barber-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative"
              >
                {service.isPopular && (
                  <div className="absolute -top-3 -right-3 transform rotate-12">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold-500 rounded-lg blur-sm opacity-50"></div>
                      <div className="relative bg-gradient-to-r from-gold-500 to-gold-600 text-barber-950 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                        <Flame className="w-4 h-4 animate-pulse" />
                        <span className="font-semibold text-xs">Popular Choice</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <Scissors className="w-10 h-10 text-gold-500" />
                  {service.bookingsCount > 1000 && (
                    <div className="flex items-center gap-1 text-barber-500 bg-barber-100 px-2 py-1 rounded-full">
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-medium">1000+ clients</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-barber-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-barber-600 mb-4">{service.description}</p>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gold-500 font-semibold">{service.price}</span>
                    <span className="text-barber-500 text-sm">{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.floor(service.rating)
                            ? "fill-gold-500 text-gold-500"
                            : index < service.rating
                            ? "fill-gold-500/50 text-gold-500"
                            : "text-barber-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-barber-600">{service.rating}</span>
                  </div>
                  <div className="text-sm text-barber-500">
                    <span>{service.bookingsCount.toLocaleString()} bookings completed</span>
                  </div>
                  <BookingForm service={service} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-barber-950">
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
            {galleryImages.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => handleImageClick(item, index)}
              >
                {item.type === "before-after" ? (
                  <div className="relative">
                    <div className="relative h-40 md:h-80 w-full">
                      <img
                        src={item.afterImage}
                        alt={`${item.title}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white text-sm md:text-xl font-semibold">{item.title}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(item.id);
                            }}
                            className="flex items-center gap-1 text-white hover:text-gold-500 transition-colors"
                          >
                            <Heart className={`w-5 h-5 ${likedImages.includes(item.id) ? 'fill-gold-500 text-gold-500' : ''}`} />
                            <span>{likedImages.includes(item.id) ? item.likes + 1 : item.likes}</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(item);
                            }}
                            className="flex items-center gap-1 text-white hover:text-gold-500 transition-colors"
                          >
                            <Share2 className="w-5 h-5" />
                            <span>Share</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(item);
                            }}
                            className="flex items-center gap-1 text-white hover:text-gold-500 transition-colors"
                          >
                            <Download className="w-5 h-5" />
                            <span>Download</span>
                          </button>
                        </div>
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
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white text-sm md:text-xl font-semibold">{item.title}</h3>
                        <p className="text-barber-200 text-xs md:text-sm">{item.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(item.id);
                            }}
                            className="flex items-center gap-1 text-white hover:text-gold-500 transition-colors"
                          >
                            <Heart className={`w-5 h-5 ${likedImages.includes(item.id) ? 'fill-gold-500 text-gold-500' : ''}`} />
                            <span>{likedImages.includes(item.id) ? item.likes + 1 : item.likes}</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(item);
                            }}
                            className="flex items-center gap-1 text-white hover:text-gold-500 transition-colors"
                          >
                            <Share2 className="w-5 h-5" />
                            <span>Share</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(item);
                            }}
                            className="flex items-center gap-1 text-white hover:text-gold-500 transition-colors"
                          >
                            <Download className="w-5 h-5" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-1 bg-white rounded-lg shadow-sm p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
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
              className="md:col-span-2 h-full"
            >
              <div className="flex flex-col h-full bg-barber-50 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-barber-900 mb-4">Find Us</h3>
                  <p className="text-barber-600 mb-4">123 Barber Street, Downtown</p>
                </div>
                <div className="flex-grow w-full h-full min-h-[500px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.5511068475856!2d102.63095731538602!3d17.975699987714787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDU4JzMyLjUiTiAxMDLCsDM3JzU5LjkiRQ!5e0!3m2!1sen!2sth!4v1623456789012!5m2!1sen!2sth" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, display: 'block', minHeight: '100%' }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    title="Google Maps"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
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
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
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
                  <a href="#services" className="text-barber-400 hover:text-gold-500">Services</a>
                </li>
                <li>
                  <a href="#about" className="text-barber-400 hover:text-gold-500">About Us</a>
                </li>
                <li>
                  <a href="#gallery" className="text-barber-400 hover:text-gold-500">Gallery</a>
                </li>
                <li>
                  <a href="#contact" className="text-barber-400 hover:text-gold-500">Contact</a>
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
                <a 
                  href="https://wa.me/8562077832019" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-barber-300 hover:text-gold-500 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span>2077832019</span>
                </a>
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

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={handleCloseGallery}
          >
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={handleCloseGallery}
                className="text-white hover:text-gold-500 transition-colors"
                title="Close gallery"
                aria-label="Close gallery"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 text-white hover:text-gold-500 transition-colors"
              title="Previous image"
              aria-label="View previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div
              className="relative max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage.type === "before-after" ? (
                <div className="relative">
                  <img
                    src={selectedImage.afterImage}
                    alt={`${selectedImage.title}`}
                    className="max-h-[80vh]"
                  />
                </div>
              ) : (
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[80vh]"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white text-xl font-semibold">{selectedImage.title}</h3>
                {selectedImage.type !== "before-after" && (
                  <p className="text-barber-200">{selectedImage.description}</p>
                )}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 text-white hover:text-gold-500 transition-colors"
              title="Next image"
              aria-label="View next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* แชทบอลลอยตัวจาก Udify */}
      <UdifyChat />
    </div>
  );
};

export default Index;
