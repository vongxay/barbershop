import Image from "next/image";
import Link from "next/link";

export default function Register() {
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
            <span className="font-semibold text-xl">สมัครสมาชิก</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">สมัครสมาชิกใหม่</h1>
            <form className="space-y-4">
              {/* Personal Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อ-นามสกุล *
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เบอร์โทรศัพท์ *
                </label>
                <input
                  type="tel"
                  required
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
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  วันเกิด
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
              </div>

              {/* Account Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รหัสผ่าน *
                </label>
                <input
                  type="password"
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ยืนยันรหัสผ่าน *
                </label>
                <input
                  type="password"
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
              </div>

              {/* Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  บริการที่สนใจ
                </label>
                <div className="space-y-2">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span>{service.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-600">
                    ฉันยอมรับ{" "}
                    <Link href="/terms" className="text-black underline">
                      เงื่อนไขการใช้งาน
                    </Link>{" "}
                    และ{" "}
                    <Link href="/privacy" className="text-black underline">
                      นโยบายความเป็นส่วนตัว
                    </Link>
                  </span>
                </label>

                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-600">
                    ฉันต้องการรับข่าวสาร โปรโมชั่น และสิทธิพิเศษต่างๆ
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              >
                สมัครสมาชิก
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-4 text-center text-sm text-gray-600">
              มีบัญชีอยู่แล้ว?{" "}
              <Link href="/login" className="text-black underline">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>

          {/* Member Benefits */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">สิทธิประโยชน์สมาชิก</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                ส่วนลด 20% สำหรับการใช้บริการครั้งแรก
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                สะสมแต้มเพื่อแลกรับบริการฟรี
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                สิทธิพิเศษในวันเกิด
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                รับข่าวสารและโปรโมชั่นก่อนใคร
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
} 