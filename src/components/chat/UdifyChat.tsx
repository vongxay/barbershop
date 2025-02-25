import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Maximize2, Minimize2, BellRing, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UdifyChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [chatHeight, setChatHeight] = useState(600); // เพิ่มความสูงเริ่มต้นเป็น 600px
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const notificationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // เพิ่มฟังก์ชันสำหรับรีโหลด iframe
  const reloadIframe = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      // แก้ไขข้อผิดพลาดของ linter โดยใช้ URL เดิมแทนการกำหนดค่าให้กับตัวเอง
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = "about:blank";
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
        }
      }, 100);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isOpen === false) {
      // เมื่อเปิดแชท ให้ล้างการแจ้งเตือน
      setHasNewMessage(false);
      if (notificationTimerRef.current) {
        clearInterval(notificationTimerRef.current);
        notificationTimerRef.current = null;
      }
    }
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // เพิ่มฟังก์ชันสำหรับปรับความสูงของแชท
  const adjustHeight = (amount: number) => {
    setChatHeight(prevHeight => {
      const newHeight = prevHeight + amount;
      // กำหนดค่าต่ำสุดและสูงสุดของความสูง
      return Math.max(500, Math.min(900, newHeight)); // เพิ่มความสูงขั้นต่ำเป็น 500px
    });
  };

  // ตรวจสอบเมื่อ iframe โหลดเสร็จ
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // จำลองการได้รับข้อความใหม่ทุก 30 วินาที (เฉพาะเมื่อแชทปิดอยู่)
  useEffect(() => {
    if (!isOpen && !notificationTimerRef.current) {
      notificationTimerRef.current = setInterval(() => {
        setHasNewMessage(true);
        
        // เล่นเสียงแจ้งเตือน (ถ้าต้องการ)
        try {
          const audio = new Audio('/notification.mp3');
          audio.play().catch(e => console.log('ไม่สามารถเล่นเสียงแจ้งเตือนได้:', e));
        } catch (error) {
          console.log('ไม่สามารถเล่นเสียงแจ้งเตือนได้:', error);
        }
      }, 30000); // 30 วินาที
    }

    return () => {
      if (notificationTimerRef.current) {
        clearInterval(notificationTimerRef.current);
        notificationTimerRef.current = null;
      }
    };
  }, [isOpen]);

  // ปิดแชทเมื่อกดปุ่ม Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // เมื่อเปิดแชท ให้รีโหลด iframe หากจำเป็น
  useEffect(() => {
    if (isOpen && iframeRef.current) {
      // ตรวจสอบว่า iframe มีเนื้อหาหรือไม่
      setTimeout(() => {
        try {
          const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
          if (!iframeDoc || iframeDoc.body.innerHTML === '') {
            reloadIframe();
          }
        } catch (error) {
          console.log('ไม่สามารถตรวจสอบเนื้อหาของ iframe ได้:', error);
        }
      }, 1000);
    }
  }, [isOpen]);

  return (
    <div className={`fixed z-50 ${isMaximized ? 'inset-0' : 'bottom-6 right-6'}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className={`
              bg-white rounded-lg shadow-xl overflow-hidden
              ${isMaximized 
                ? 'fixed inset-4 w-auto h-auto' 
                : `mb-4 w-80 sm:w-96`}
            `}
            style={!isMaximized ? { height: `${chatHeight}px` } : {}}
          >
            <div className="bg-gold-500 text-barber-950 p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <h3 className="font-semibold">VongCut Chat Assistant</h3>
              </div>
              <div className="flex items-center gap-1">
                {!isLoading && (
                  <button
                    onClick={reloadIframe}
                    className="p-1.5 rounded-md hover:bg-gold-600 transition-colors"
                    aria-label="Reload chat"
                    title="รีโหลดแชท"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                      <path d="M21 3v5h-5"></path>
                      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                      <path d="M8 16H3v5"></path>
                    </svg>
                  </button>
                )}
                {!isMaximized && (
                  <>
                    <button
                      onClick={() => adjustHeight(50)}
                      className="p-1.5 rounded-md hover:bg-gold-600 transition-colors"
                      aria-label="Increase height"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => adjustHeight(-50)}
                      className="p-1.5 rounded-md hover:bg-gold-600 transition-colors"
                      aria-label="Decrease height"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={toggleMaximize}
                  className="p-1.5 rounded-md hover:bg-gold-600 transition-colors"
                  aria-label={isMaximized ? "Minimize chat" : "Maximize chat"}
                >
                  {isMaximized ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1.5 rounded-md hover:bg-gold-600 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-barber-600">กำลังโหลดแชท...</p>
                </div>
              </div>
            )}

            <div className="relative h-[calc(100%-48px)] w-full">
              <iframe
                ref={iframeRef}
                src="https://udify.app/chat/vL1Ny4yaBdGe4V91"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="microphone"
                title="Udify Chat"
                className="bg-white absolute inset-0"
                onLoad={handleIframeLoad}
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.div className="relative">
          {hasNewMessage && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs z-10"
            >
              <span>1</span>
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className={`
              bg-gold-500 hover:bg-gold-600 text-barber-950 rounded-full p-4 shadow-lg 
              flex items-center justify-center
              ${hasNewMessage ? 'animate-pulse' : ''}
            `}
          >
            {hasNewMessage ? (
              <BellRing className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}; 