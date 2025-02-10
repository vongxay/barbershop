'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Mock data for services
const services = [
  {
    id: 1,
    name: "ตัดผมชาย",
    description: "บริการตัดผมพร้อมสระและเป่า",
    price: "300฿",
    duration: "45 นาที",
    image: "/services/haircut.jpg"
  },
  {
    id: 2,
    name: "เล็มเครา",
    description: "จัดแต่งเครา หนวด ให้เข้ารูป",
    price: "200฿",
    duration: "30 นาที",
    image: "/services/beard.jpg"
  },
  {
    id: 3,
    name: "โกนหนวด",
    description: "บริการโกนหนวดด้วยมีดโกนคุณภาพสูง",
    price: "150฿",
    duration: "20 นาที",
    image: "/services/shave.jpg"
  },
  {
    id: 4,
    name: "สระผม",
    description: "สระผมพร้อมนวดศีรษะผ่อนคลาย",
    price: "200฿",
    duration: "30 นาที",
    image: "/services/wash.jpg"
  },
  {
    id: 5,
    name: "ย้อมผม",
    description: "บริการย้อมผมด้วยผลิตภัณฑ์คุณภาพ",
    price: "1,500฿",
    duration: "120 นาที",
    image: "/services/color.jpg"
  },
  {
    id: 6,
    name: "สไตล์ลิ่ง",
    description: "จัดแต่งทรงผมตามสไตล์ที่ต้องการ",
    price: "500฿",
    duration: "45 นาที",
    image: "/services/styling.jpg"
  }
];

// Mock data for barbers
const barbers = [
  {
    id: 1,
    name: "คุณเอก",
    image: "/barbers/barber1.jpg",
    experience: "10 ปี",
    speciality: "ทรงผมคลาสสิก",
    description: "ผู้เชี่ยวชาญด้านการตัดผมสไตล์คลาสสิก มีประสบการณ์กว่า 10 ปี",
    rating: 4.9,
    reviews: 150
  },
  {
    id: 2,
    name: "คุณโจ",
    image: "/barbers/barber2.jpg",
    experience: "8 ปี",
    speciality: "ทรงผมสมัยใหม่",
    description: "ช่างตัดผมสไตล์โมเดิร์น เชี่ยวชาญการจัดแต่งทรงผมแฟชั่น",
    rating: 4.8,
    reviews: 120
  },
  {
    id: 3,
    name: "คุณแบงค์",
    image: "/barbers/barber3.jpg",
    experience: "5 ปี",
    speciality: "การย้อมผม",
    description: "ผู้เชี่ยวชาญด้านการย้อมผมและทำสีผม มีความรู้ด้านการดูแลเส้นผม",
    rating: 4.7,
    reviews: 90
  },
  {
    id: 4,
    name: "คุณเบน",
    image: "/barbers/barber4.jpg",
    experience: "7 ปี",
    speciality: "การดูแลเครา",
    description: "เชี่ยวชาญการตกแต่งเครา หนวด และการโกนหนวดแบบดั้งเดิม",
    rating: 4.9,
    reviews: 110
  }
];

// Mock data for available time slots
const timeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30"
];

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: ส่งข้อมูลการจองไปยัง API
    console.log({
      service: selectedService,
      barber: selectedBarber,
      date: selectedDate,
      time: selectedTime
    });
  };

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
            <span className="font-semibold text-xl">จองคิวตัดผม</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">จองคิวออนไลน์</h1>

          {/* Booking Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เลือกบริการ
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className="relative flex items-start p-4 cursor-pointer rounded-lg border hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        onChange={(e) => setSelectedService(Number(e.target.value))}
                        className="sr-only peer"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{service.name}</span>
                        <span className="text-sm text-gray-500">
                          {service.duration}
                        </span>
                        <span className="font-semibold mt-1">{service.price}</span>
                      </div>
                      <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-black pointer-events-none"></div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Barber Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เลือกช่าง (ไม่บังคับ)
                </label>
                <div className="grid md:grid-cols-4 gap-4">
                  {barbers.map((barber) => (
                    <label
                      key={barber.id}
                      className="relative flex flex-col items-center p-4 cursor-pointer rounded-lg border hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="barber"
                        value={barber.id}
                        onChange={(e) => setSelectedBarber(Number(e.target.value))}
                        className="sr-only peer"
                      />
                      <div className="relative w-20 h-20 mb-2">
                        <Image
                          src={barber.image}
                          alt={barber.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <span className="font-medium text-center">{barber.name}</span>
                      <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-black pointer-events-none"></div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เลือกวันที่
                </label>
                <input
                  type="date"
                  title="เลือกวันที่จอง"
                  placeholder="เลือกวันที่"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เลือกเวลา
                </label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {timeSlots.map((time) => (
                    <label
                      key={time}
                      className="relative flex items-center justify-center"
                    >
                      <input
                        type="radio"
                        name="time"
                        value={time}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="sr-only peer"
                      />
                      <span className="block w-full py-2 text-sm text-center rounded-lg border cursor-pointer peer-checked:bg-black peer-checked:text-white hover:bg-gray-50 peer-checked:hover:bg-black">
                        {time}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="กรอกชื่อ-นามสกุล"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="กรอกเบอร์โทรศัพท์"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    placeholder="กรอกอีเมล"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    หมายเหตุเพิ่มเติม
                  </label>
                  <textarea
                    placeholder="กรอกหมายเหตุเพิ่มเติม (ถ้ามี)"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    rows={3}
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              >
                ยืนยันการจอง
              </button>
            </form>
          </div>

          {/* Booking Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">ข้อมูลการจอง</h2>
            <div className="space-y-4 text-sm">
              <p>
                • กรุณามาก่อนเวลานัดหมาย 5-10 นาที
              </p>
              <p>
                • หากต้องการยกเลิกหรือเลื่อนนัด กรุณาแจ้งล่วงหน้าอย่างน้อย 2 ชั่วโมง
              </p>
              <p>
                • การจองจะสมบูรณ์เมื่อได้รับการยืนยันผ่าน SMS หรืออีเมล
              </p>
              <p>
                • สามารถชำระเงินด้วยเงินสดหรือโอนผ่านธนาคาร
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 