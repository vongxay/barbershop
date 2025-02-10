import Image from "next/image";
import Link from "next/link";

// Mock data for gallery items
const galleryItems = [
  ...gallery, // นำข้อมูลจากหน้าแรกมาใช้
  {
    id: 7,
    image: "/gallery/style3.jpg",
    category: "ทรงผม",
    title: "ทรงผมแฟชั่น"
  },
  {
    id: 8,
    image: "/gallery/beard2.jpg",
    category: "เครา",
    title: "เครารูปแบบต่างๆ"
  },
  {
    id: 9,
    image: "/gallery/color2.jpg",
    category: "สี",
    title: "การย้อมสีผมแฟชั่น"
  },
  {
    id: 10,
    image: "/gallery/style4.jpg",
    category: "ทรงผม",
    title: "ทรงผมวินเทจ"
  },
  {
    id: 11,
    image: "/gallery/interior3.jpg",
    category: "ร้าน",
    title: "มุมพักผ่อน"
  },
  {
    id: 12,
    image: "/gallery/interior4.jpg",
    category: "ร้าน",
    title: "บรรยากาศการให้บริการ"
  }
];

const categories = ["ทั้งหมด", "ทรงผม", "เครา", "สี", "ร้าน"];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-50">
        <div className="container mx-auto py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Barbershop Logo"
              width={40}
              height={40}
              className="w-10"
            />
            <span className="font-semibold text-xl">แกลเลอรี่ผลงาน</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto pt-24 pb-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full border hover:bg-black hover:text-white transition"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
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

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
            โหลดเพิ่มเติม
          </button>
        </div>
      </main>
    </div>
  );
} 