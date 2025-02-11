import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

// Mock data for services, barbers, testimonials
const services = [
  {
    id: 1,
    name: "Men's Haircut",
    description: "Haircut service with wash and blow dry",
    price: "300฿",
    duration: "45 mins",
    image: "/images/services/service-1.png"
  },
  {
    id: 2,
    name: "Beard Trim",
    description: "Professional beard and mustache styling",
    price: "200฿",
    duration: "30 mins",
    image: "/images/services/service-2.jpg"
  },
  {
    id: 3,
    name: "Clean Shave",
    description: "Traditional shaving service with premium razor",
    price: "150฿",
    duration: "20 mins",
    image: "/images/services/service-3.jpg"
  },
  {
    id: 4,
    name: "Hair Wash",
    description: "Relaxing hair wash with head massage",
    price: "200฿",
    duration: "30 mins",
    image: "/images/services/service-4.jpg"
  },
  {
    id: 5,
    name: "Hair Color",
    description: "Professional hair coloring service",
    price: "1,500฿",
    duration: "120 mins",
    image: "/images/services/service-5.png"
  },
  {
    id: 6,
    name: "Hair Styling",
    description: "Custom hair styling to your preference",
    price: "500฿",
    duration: "45 mins",
    image: "/images/services/service-6.png"
  }
];

const barbers = [
  {
    id: 1,
    name: "Mr. Ake",
    image: "/images/barbers/barber.jpg",
    experience: "10 years",
    speciality: "Classic Haircuts",
    description: "Expert in classic haircuts with over 10 years of experience",
    rating: 4.9,
    reviews: 150
  },
  {
    id: 2,
    name: "Mr. Joe",
    image: "/images/barbers/barber.jpg",
    experience: "8 years",
    speciality: "Modern Styles",
    description: "Modern hairstyle specialist with expertise in fashion trends",
    rating: 4.8,
    reviews: 120
  },
  {
    id: 3,
    name: "Mr. Bank",
    image: "/images/barbers/barber.jpg",
    experience: "5 years",
    speciality: "Hair Coloring",
    description: "Hair coloring expert with deep knowledge in hair care",
    rating: 4.7,
    reviews: 90
  },
  {
    id: 4,
    name: "Mr. Ben",
    image: "/images/barbers/barber.jpg",
    experience: "7 years",
    speciality: "Beard Care",
    description: "Specialist in beard grooming and traditional shaving",
    rating: 4.9,
    reviews: 110
  }
];

const testimonials = [
  {
    id: 1,
    name: "Mr. Somchai",
    image: "/images/testimonials/client.jpg",
    rating: 5,
    comment: "Excellent service, very professional staff, got exactly the style I wanted",
    date: "15/02/2024"
  },
  {
    id: 2,
    name: "Mr. Wichai",
    image: "/images/testimonials/client.jpg",
    rating: 5,
    comment: "Very impressed with the atmosphere, cleanliness, and attention to detail",
    date: "14/02/2024"
  },
  {
    id: 3,
    name: "Mr. Kitti",
    image: "/images/testimonials/client.jpg",
    rating: 4,
    comment: "Professional barbers with great advice and reasonable prices",
    date: "13/02/2024"
  }
];

const gallery = [
  {
    id: 1,
    image: "/images/gallery/gallery-1.jpg",
    category: "Haircuts",
    title: "Classic Haircuts"
  },
  {
    id: 2,
    image: "/images/gallery/gallery-2.jpg",
    category: "Haircuts",
    title: "Modern Styles"
  },
  {
    id: 3,
    image: "/images/gallery/gallery-3.jpg",
    category: "Beard",
    title: "Beard Styling"
  },
  {
    id: 4,
    image: "/images/gallery/gallery-4.jpg",
    category: "Color",
    title: "Hair Coloring"
  },
  {
    id: 5,
    image: "/images/gallery/gallery-5.jpg",
    category: "Shop",
    title: "Shop Interior"
  },
  {
    id: 6,
    image: "/images/gallery/gallery-6.jpg",
    category: "Shop",
    title: "Service Area"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
          </div>
        </div>

        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-image.jpg"
            alt="Barbershop Interior"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        
        <div className="container mx-auto relative z-10 px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-4 animate-fade-in-up">
                <span className="inline-block text-yellow-400 text-lg font-medium tracking-wider uppercase mb-2">Welcome to Our Barbershop</span>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Experience
                  <span className="block mt-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-500 text-transparent bg-clip-text">Haircuts</span>
                  <span className="block mt-2">at Their Finest</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                  Professional haircut services with experienced barbers in a relaxing atmosphere
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-8 animate-fade-in-up animation-delay-300">
                <Link
                  href="/booking"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-4 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2 font-semibold text-black">
                    Book Now
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </span>
                </Link>
                
                <Link
                  href="#services"
                  className="group relative overflow-hidden rounded-full px-8 py-4"
                >
                  <div className="absolute inset-0 border-2 border-yellow-400 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-2 text-white group-hover:text-yellow-400 transition-colors duration-300">
                    View Our Services
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-12 animate-fade-in-up animation-delay-600">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">10+</div>
                  <div className="text-gray-400 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">1.2K+</div>
                  <div className="text-gray-400 text-sm">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">4.9</div>
                  <div className="text-gray-400 text-sm">Review Score</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="hidden md:block relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full filter blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/5 rounded-full filter blur-3xl" />
        </div>

        <div className="container mx-auto px-8 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block text-yellow-400 text-lg font-medium tracking-wider uppercase mb-4">Our Services</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the service that matches your style with our team of professional barbers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-800/50 hover:border-yellow-400/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative h-72 mb-8 overflow-hidden rounded-2xl">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">{service.description}</p>
                
                <div className="flex justify-between items-center mb-8">
                  <span className="text-4xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {service.price}
                  </span>
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-lg">{service.duration}</span>
                  </div>
                </div>
                
                <Link
                  href={`/booking?service=${service.id}`}
                  className="relative overflow-hidden block w-full text-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Book This Service
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barbers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Professional Barbers</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {barbers.map((barber) => (
              <div
                key={barber.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center group"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={barber.image}
                    alt={barber.name}
                    fill
                    className="object-cover rounded-full transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{barber.name}</h3>
                <p className="text-gray-600">Experience {barber.experience}</p>
                <p className="text-gray-500 text-sm mb-3">{barber.speciality}</p>
                <p className="text-gray-600 text-sm mb-4">{barber.description}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(barber.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600">({barber.reviews} Reviews)</span>
                </div>
                <Link
                  href={`/booking?barber=${barber.id}`}
                  className="mt-4 inline-block bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-black transition"
                >
                  Book Appointment
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Client Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.date}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group relative h-64 overflow-hidden rounded-lg"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-white text-sm">{item.category}</span>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/gallery"
              className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
            >
              View All Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Promotion Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Special Promotion for New Clients</h2>
              <p className="text-gray-300 mb-8">
                Get 20% off on your first visit and exclusive benefits when you become a member
              </p>
              <Link
                href="/register"
                className="inline-block bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition"
              >
                Register Now
              </Link>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/promotion.jpg"
                alt="Promotion"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              If you have any questions or need more information, please contact us through the channels below.
              We&apos;re happy to help and answer all your questions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-black rounded-full p-3 shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Address</h3>
                    <p className="text-gray-600 leading-relaxed">
                      123 Sukhumvit Road<br />
                      Klongtoey, Klongtoey<br />
                      Bangkok 10110
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-black rounded-full p-3 shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Monday - Friday</span>
                        <span>10:00 - 20:00</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Saturday - Sunday</span>
                        <span>09:00 - 21:00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-black rounded-full p-3 shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Contact</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Tel:</span> 02-123-4567
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Email:</span> info@barbershop.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-black rounded-full p-3 shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                    <div className="flex gap-4 mt-3">
                      <Link 
                        href="#" 
                        className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
                      </Link>
                      <Link 
                        href="#" 
                        className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
                      </Link>
                      <Link 
                        href="#" 
                        className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Image src="/line.svg" alt="Line" width={24} height={24} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition mt-8 group"
              >
                <span>Contact Us</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>

            {/* Map */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent rounded-2xl pointer-events-none"></div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5438350844397!2d100.56824867575666!3d13.742569997575455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee109dab6e1%3A0xfd15aa1c632d9677!2sSukhumvit%20Rd%2C%20Khwaeng%20Khlong%20Toei%2C%20Khet%20Khlong%20Toei%2C%20Krung%20Thep%20Maha%20Nakhon!5e0!3m2!1sen!2sth!4v1708601234567!5m2!1sen!2sth"
                  className="w-full aspect-square border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p>123 Sukhumvit Road</p>
              <p>Bangkok 10110</p>
              <p>Tel: 02-123-4567</p>
              <p>Email: info@barbershop.com</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
              <p>Monday - Friday: 10:00 - 20:00</p>
              <p>Saturday - Sunday: 09:00 - 21:00</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul>
                <li><Link href="/booking" className="hover:underline">Book Appointment</Link></li>
                <li><Link href="/services" className="hover:underline">Services</Link></li>
                <li><Link href="/gallery" className="hover:underline">Gallery</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Social Media</h3>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-gray-300">
                  <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
                </Link>
                <Link href="#" className="hover:text-gray-300">
                  <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
                </Link>
                <Link href="#" className="hover:text-gray-300">
                  <Image src="/line.svg" alt="Line" width={24} height={24} />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2024 Barbershop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
