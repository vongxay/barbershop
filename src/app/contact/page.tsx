import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Barbershop Logo"
              width={40}
              height={40}
              className="w-10"
            />
            <span className="font-semibold text-xl">ติดต่อเรา</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h1 className="text-3xl font-bold mb-6">ติดต่อเรา</h1>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">ที่อยู่</h3>
                    <p className="text-gray-600">123 ถนนสุขุมวิท<br />แขวงคลองเตย เขตคลองเตย<br />กรุงเทพฯ 10110</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">เวลาทำการ</h3>
                    <p className="text-gray-600">จันทร์ - ศุกร์: 10:00 - 20:00<br />เสาร์ - อาทิตย์: 09:00 - 21:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">ติดต่อ</h3>
                    <p className="text-gray-600">โทร: 02-123-4567<br />อีเมล: info@barbershop.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">ช่องทางติดตาม</h3>
                    <div className="flex gap-4 mt-2">
                      <Link href="#" className="text-gray-600 hover:text-black">
                        <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
                      </Link>
                      <Link href="#" className="text-gray-600 hover:text-black">
                        <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
                      </Link>
                      <Link href="#" className="text-gray-600 hover:text-black">
                        <Image src="/line.svg" alt="Line" width={24} height={24} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">ส่งข้อความถึงเรา</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อ-นามสกุล *
                  </label>
                  <input
                    type="text"
                    required
                    aria-label="ชื่อ-นามสกุล"
                    placeholder="กรุณากรอกชื่อ-นามสกุล"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    อีเมล *
                  </label>
                  <input
                    type="email"
                    required
                    aria-label="อีเมล"
                    placeholder="กรุณากรอกอีเมล"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    aria-label="เบอร์โทรศัพท์"
                    placeholder="กรุณากรอกเบอร์โทรศัพท์"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    หัวข้อ *
                  </label>
                  <select
                    required
                    aria-label="หัวข้อ"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  >
                    <option value="">เลือกหัวข้อ</option>
                    <option value="booking">เกี่ยวกับการจองคิว</option>
                    <option value="service">สอบถามบริการ</option>
                    <option value="price">สอบถามราคา</option>
                    <option value="other">อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ข้อความ *
                  </label>
                  <textarea
                    required
                    rows={4}
                    aria-label="ข้อความ"
                    placeholder="กรุณากรอกข้อความที่ต้องการติดต่อ"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                >
                  ส่งข้อความ
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">แผนที่</h2>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5438350844397!2d100.56824867575666!3d13.742569997575455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee109dab6e1%3A0xfd15aa1c632d9677!2sSukhumvit%20Rd%2C%20Khwaeng%20Khlong%20Toei%2C%20Khet%20Khlong%20Toei%2C%20Krung%20Thep%20Maha%20Nakhon!5e0!3m2!1sen!2sth!4v1708601234567!5m2!1sen!2sth"
                className="w-full h-full border-0"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 