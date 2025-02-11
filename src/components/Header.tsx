'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ปิดเมนูเมื่อหน้าจอมีการ resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ปิดเมนูเมื่อคลิกลิงก์
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3" onClick={handleLinkClick}>
            <div className="relative">
              <Image
                src="/logo/logo.jpg"
                alt="Barbershop Logo"
                width={20}
                height={20}
                className="w-16 md:w-20 h-auto object-contain transition-transform hover:scale-105"
                priority
                quality={100}
              />
            </div>
            <div className="hidden md:block border-l-2 border-gray-200 pl-2">
              <p className="text-gray-700 text-xs font-medium">ร้านตัดผมมืออาชีพ</p>
              <p className="text-gray-500 text-[10px]">Professional Barber Shop</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-black transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black hover:after:w-full after:transition-all"
              onClick={handleLinkClick}
            >
              หน้าแรก
            </Link>
            <Link 
              href="/services" 
              className="text-gray-700 hover:text-black transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black hover:after:w-full after:transition-all"
              onClick={handleLinkClick}
            >
              บริการ
            </Link>
            <Link 
              href="/gallery" 
              className="text-gray-700 hover:text-black transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black hover:after:w-full after:transition-all"
              onClick={handleLinkClick}
            >
              แกลเลอรี่
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-black transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black hover:after:w-full after:transition-all"
              onClick={handleLinkClick}
            >
              เกี่ยวกับเรา
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-black transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black hover:after:w-full after:transition-all"
              onClick={handleLinkClick}
            >
              ติดต่อ
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Link 
            href="/login" 
            className="hidden md:flex items-center gap-2 text-gray-700 hover:text-black transition-colors font-medium"
            onClick={handleLinkClick}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            เข้าสู่ระบบ
          </Link>
          <Link
            href="/booking"
            className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors font-medium text-sm md:text-base flex items-center gap-2"
            onClick={handleLinkClick}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="hidden md:inline">จองคิว</span>
            <span className="md:hidden">จอง</span>
          </Link>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="เปิด/ปิดเมนู"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white border-t shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto py-4">
          <nav className="flex flex-col">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-black hover:bg-gray-50 transition-colors px-4 py-3 font-medium"
              onClick={handleLinkClick}
            >
              หน้าแรก
            </Link>
            <Link 
              href="/services" 
              className="text-gray-700 hover:text-black hover:bg-gray-50 transition-colors px-4 py-3 font-medium"
              onClick={handleLinkClick}
            >
              บริการ
            </Link>
            <Link 
              href="/gallery" 
              className="text-gray-700 hover:text-black hover:bg-gray-50 transition-colors px-4 py-3 font-medium"
              onClick={handleLinkClick}
            >
              แกลเลอรี่
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-black hover:bg-gray-50 transition-colors px-4 py-3 font-medium"
              onClick={handleLinkClick}
            >
              เกี่ยวกับเรา
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-black hover:bg-gray-50 transition-colors px-4 py-3 font-medium"
              onClick={handleLinkClick}
            >
              ติดต่อ
            </Link>
            <Link 
              href="/login" 
              className="text-gray-700 hover:text-black hover:bg-gray-50 transition-colors px-4 py-3 font-medium flex items-center gap-2"
              onClick={handleLinkClick}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              เข้าสู่ระบบ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 