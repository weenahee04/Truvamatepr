
import React, { useState, useEffect } from 'react';
import { LotteryGame, AppView, Ticket } from './types';
import { generateLuckyNumbers } from './services/geminiService';
import { 
  IconLogo, IconCheck, IconSecurity, IconFast, IconGlobal, IconCart, 
  IconStar, IconBot, IconPhone, IconMail, IconSearch, IconDocument, IconUserCheck,
  IconArrowLeft, IconArrowRight, IconCalendar, IconUser, IconArrowNarrowRight,
  IconTrophy, IconFilter, IconTicket, IconPencil, IconScan, IconClock,
  IconQuote, IconQuestion, IconLightning, IconTrash, IconCreditCard, IconQRCode, 
  IconWallet, IconLock, IconPlus, IconX, IconUserCircle, IconHistory, IconLogout,
  IconChat, IconCookie, IconMenu, IconBank, IconMoney, IconEdit, IconChevronRight, IconInfo,
  IconArrowUp, IconArrowDown
} from './components/Icons';

// --- Constants ---
const GAMES: LotteryGame[] = [
  {
    id: 'powerball',
    name: 'Powerball',
    jackpot: '$154 Million',
    drawDate: 'พุธ 20 ก.ย.',
    price: 150,
    logoColor: 'text-red-600',
    maxMainNumbers: 5,
    maxSpecialNumbers: 1,
    mainNumberLimit: 69,
    specialNumberLimit: 26
  },
  {
    id: 'mega',
    name: 'Mega Millions',
    jackpot: '$89 Million',
    drawDate: 'อังคาร 19 ก.ย.',
    price: 150,
    logoColor: 'text-blue-600',
    maxMainNumbers: 5,
    maxSpecialNumbers: 1,
    mainNumberLimit: 70,
    specialNumberLimit: 25
  },
  {
    id: 'cash4life',
    name: 'Cash4Life',
    jackpot: '$1,000/Day',
    drawDate: 'ทุกวัน',
    price: 100,
    logoColor: 'text-green-600',
    maxMainNumbers: 5,
    maxSpecialNumbers: 1,
    mainNumberLimit: 60,
    specialNumberLimit: 4
  }
];

const PAST_RESULTS = [
  { 
    id: 1, 
    gameId: 'powerball', 
    gameName: 'Powerball', 
    date: '2023-09-18', 
    displayDate: '18 ก.ย. 2023',
    numbers: [2, 11, 22, 35, 60], 
    special: 23, 
    jackpot: '$150 Million', 
    winners: 0 
  },
  { 
    id: 2, 
    gameId: 'mega', 
    gameName: 'Mega Millions', 
    date: '2023-09-17', 
    displayDate: '17 ก.ย. 2023',
    numbers: [10, 24, 45, 50, 66], 
    special: 12, 
    jackpot: '$85 Million', 
    winners: 1 
  },
  { 
    id: 3, 
    gameId: 'cash4life', 
    gameName: 'Cash4Life', 
    date: '2023-09-17', 
    displayDate: '17 ก.ย. 2023',
    numbers: [5, 15, 25, 35, 45], 
    special: 4, 
    jackpot: '$1,000/Day', 
    winners: 3 
  },
  { 
    id: 4, 
    gameId: 'powerball', 
    gameName: 'Powerball', 
    date: '2023-09-16', 
    displayDate: '16 ก.ย. 2023',
    numbers: [8, 19, 24, 39, 55], 
    special: 8, 
    jackpot: '$145 Million', 
    winners: 0 
  },
  { 
    id: 5, 
    gameId: 'mega', 
    gameName: 'Mega Millions', 
    date: '2023-09-15', 
    displayDate: '15 ก.ย. 2023',
    numbers: [1, 5, 9, 20, 25], 
    special: 10, 
    jackpot: '$80 Million', 
    winners: 0 
  },
];

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink?: string;
  action?: AppView;
  image: string;
  theme: 'dark' | 'light';
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "บริการฝากซื้อล็อตเตอรี่ USA ที่ดีที่สุดในไทย",
    subtitle: "Truvamate คือแพลตฟอร์มฝากซื้อหวยอเมริการะดับโลกที่น่าเชื่อถือที่สุด ปลอดภัยด้วยการสแกนตั๋วจริงทุกใบ ส่งตรงถึงมือคุณ",
    buttonText: "ซื้อล็อตเตอรี่",
    buttonLink: "#games",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    theme: 'light'
  },
  {
    id: 2,
    title: "สมาชิกใหม่รับโบนัสฟรี 100 บาท!",
    subtitle: "สมัครวันนี้เพื่อรับสิทธิพิเศษและโปรโมชั่นมากมาย สำหรับการซื้อครั้งแรกของคุณ",
    buttonText: "สมัครสมาชิกเลย",
    buttonLink: "#",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    theme: 'dark'
  },
  {
    id: 3,
    title: "ถูกรางวัลใหญ่ แจ้งเตือนทันที",
    subtitle: "ระบบตรวจรางวัลอัตโนมัติ แม่นยำ รวดเร็ว พร้อมบริการขึ้นเงินรางวัลโดยทีมงานมืออาชีพ",
    buttonText: "ดูผลรางวัล",
    action: AppView.RESULTS,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    theme: 'light'
  }
];

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "5 เทคนิคการเลือกเลข Powerball ให้มีโอกาสถูกรางวัล",
    category: "Tips & Tricks",
    date: "20 ก.ย. 2023",
    author: "Admin Truva",
    excerpt: "เปิดเผยสถิติและเทคนิคการวิเคราะห์ตัวเลขจากเซียนหวยระดับโลก ที่จะช่วยเพิ่มโอกาสให้คุณเป็นเศรษฐี...",
    image: "https://images.unsplash.com/photo-1629754048995-1711e96e255f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "ทำความรู้จัก Mega Millions ล็อตเตอรี่ที่แจ็คพอตแตกบ่อยที่สุด",
    category: "Knowledge",
    date: "18 ก.ย. 2023",
    author: "กองบรรณาธิการ",
    excerpt: "เจาะลึกประวัติศาสตร์และกติกาของ Mega Millions ทำไมถึงเป็นที่นิยมและสร้างเศรษฐีใหม่มากที่สุด...",
    image: "https://images.unsplash.com/photo-1518183214770-9cffbec72538?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "รวมเรื่องราวผู้โชคดีที่ถูกรางวัลผ่าน Truvamate",
    category: "Success Stories",
    date: "15 ก.ย. 2023",
    author: "Admin Truva",
    excerpt: "บทสัมภาษณ์พิเศษจากผู้โชคดีชาวไทยที่ได้รับรางวัลจริง พร้อมแชร์ประสบการณ์การใช้บริการ...",
    image: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

interface Transaction {
  id: string;
  date: string;
  type: 'deposit' | 'withdraw' | 'purchase' | 'win';
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TX123456', date: '20 ก.ย. 2023 10:30', type: 'deposit', description: 'เติมเงินผ่าน QR Code', amount: 1000, status: 'completed' },
  { id: 'TX123457', date: '20 ก.ย. 2023 10:35', type: 'purchase', description: 'ซื้อหวย Powerball (2 ใบ)', amount: -300, status: 'completed' },
  { id: 'TX123458', date: '18 ก.ย. 2023 09:00', type: 'win', description: 'ถูกรางวัล Mega Millions', amount: 2500, status: 'completed' },
  { id: 'TX123459', date: '15 ก.ย. 2023 14:20', type: 'withdraw', description: 'ถอนเงินเข้าบัญชีธนาคาร', amount: -2000, status: 'pending' },
  { id: 'TX123460', date: '10 ก.ย. 2023 08:15', type: 'purchase', description: 'ซื้อหวย Cash4Life (1 ใบ)', amount: -100, status: 'completed' },
];

// --- Subcomponents ---

const TopBar = ({ onLoginClick, user, onViewChange }: { onLoginClick: () => void, user: any, onViewChange: (v: AppView) => void }) => (
  <div className="bg-gray-100 border-b border-gray-200 hidden md:block">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-10 text-xs text-gray-500">
        <div className="flex space-x-6">
          <span className="flex items-center hover:text-truva-orange cursor-pointer"><IconPhone /> Call Center: 02-123-4567</span>
          <span className="flex items-center hover:text-truva-orange cursor-pointer"><IconMail /> support@truvamate.com</span>
        </div>
        <div className="flex space-x-4 items-center">
           <a href="#" onClick={(e) => { e.preventDefault(); onViewChange(AppView.HELP); }} className="hover:text-truva-orange">ช่วยเหลื่อ</a>
           <span className="text-gray-300">|</span>
           {!user ? (
             <>
               <button onClick={onLoginClick} className="hover:text-truva-orange">สมัครสมาชิก</button>
               <span className="text-gray-300">|</span>
               <button onClick={onLoginClick} className="hover:text-truva-orange">เข้าสู่ระบบ</button>
             </>
           ) : (
             <span className="font-bold text-truva-blue cursor-pointer" onClick={() => onViewChange(AppView.DASHBOARD)}>สวัสดี, {user.name}</span>
           )}
           <span className="text-gray-300">|</span>
           <span className="flex items-center cursor-pointer font-bold text-truva-blue">TH <span className="text-gray-400 font-normal ml-1">/ EN</span></span>
        </div>
      </div>
    </div>
  </div>
);

const Navbar = ({ cartCount, onViewChange, onLoginClick, user }: { cartCount: number, onViewChange: (v: AppView) => void, onLoginClick: () => void, user: any }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => onViewChange(AppView.HOME)}>
              <IconLogo />
              <div className="flex flex-col">
                 <span className="font-bold text-2xl tracking-tight text-truva-dark leading-none">Truva<span className="text-truva-orange">mate</span></span>
                 <span className="text-[10px] text-gray-500 uppercase tracking-widest">Global Lottery Service</span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 h-full items-center">
              <a href="#" onClick={(e) => { e.preventDefault(); onViewChange(AppView.HOME); }} className="text-gray-700 hover:text-truva-orange font-medium h-full flex items-center border-b-2 border-transparent hover:border-truva-orange transition-all">หน้าแรก</a>
              <a href="#games" onClick={(e) => { e.preventDefault(); onViewChange(AppView.HOME); setTimeout(() => window.location.href='#games', 100); }} className="text-gray-700 hover:text-truva-orange font-medium h-full flex items-center border-b-2 border-transparent hover:border-truva-orange transition-all">บริการของเรา</a>
              <button onClick={() => onViewChange(AppView.RESULTS)} className="text-gray-700 hover:text-truva-orange font-medium h-full flex items-center border-b-2 border-transparent hover:border-truva-orange transition-all">ตรวจผลรางวัล</button>
              <a href="#blog" onClick={(e) => { e.preventDefault(); onViewChange(AppView.HOME); setTimeout(() => window.location.href='#blog', 100); }} className="text-gray-700 hover:text-truva-orange font-medium h-full flex items-center border-b-2 border-transparent hover:border-truva-orange transition-all">บทความ</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onViewChange(AppView.CONTACT); }} className="text-gray-700 hover:text-truva-orange font-medium h-full flex items-center border-b-2 border-transparent hover:border-truva-orange transition-all">ติดต่อเรา</a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onViewChange(AppView.CART)}
                className="relative p-2 text-gray-600 hover:text-truva-orange transition-colors"
              >
                <IconCart />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-truva-orange rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {user ? (
                <button 
                  onClick={() => onViewChange(AppView.DASHBOARD)}
                  className="hidden sm:flex items-center bg-gray-100 text-truva-dark px-4 py-2 rounded hover:bg-gray-200 transition-all font-medium text-sm shadow-sm"
                >
                  <IconUserCircle /> <span className="ml-2">บัญชีของฉัน</span>
                </button>
              ) : (
                <button 
                  onClick={onLoginClick}
                  className="hidden sm:block bg-truva-dark text-white px-6 py-2.5 rounded hover:bg-opacity-90 transition-all font-medium text-sm shadow-sm"
                >
                  เข้าสู่ระบบ
                </button>
              )}

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-gray-600 hover:text-truva-dark"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <IconX /> : <IconMenu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative bg-white w-64 max-w-xs h-full shadow-xl flex flex-col py-6 px-4 animate-slide-in-right">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center text-truva-dark">
                    <IconLogo />
                    <span className="font-bold text-xl">Truvamate</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-red-500">
                    <IconX />
                </button>
             </div>

             <div className="flex-grow space-y-1">
                <a href="#" onClick={() => { setIsMobileMenuOpen(false); onViewChange(AppView.HOME); }} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded font-medium">หน้าแรก</a>
                <a href="#games" onClick={() => { setIsMobileMenuOpen(false); onViewChange(AppView.HOME); setTimeout(() => window.location.href='#games', 100); }} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded font-medium">บริการของเรา</a>
                <button onClick={() => { setIsMobileMenuOpen(false); onViewChange(AppView.RESULTS); }} className="w-full text-left block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded font-medium">ตรวจผลรางวัล</button>
                <a href="#blog" onClick={() => { setIsMobileMenuOpen(false); onViewChange(AppView.HOME); setTimeout(() => window.location.href='#blog', 100); }} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded font-medium">บทความ</a>
                <a href="#" onClick={() => { setIsMobileMenuOpen(false); onViewChange(AppView.CONTACT); }} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded font-medium">ติดต่อเรา</a>
                <a href="#" onClick={() => { setIsMobileMenuOpen(false); onViewChange(AppView.HELP); }} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded font-medium">ช่วยเหลือ</a>
             </div>

             <div className="mt-auto border-t border-gray-100 pt-6">
                {!user ? (
                   <button onClick={() => { setIsMobileMenuOpen(false); onLoginClick(); }} className="w-full bg-truva-dark text-white py-3 rounded font-bold shadow-md">เข้าสู่ระบบ / สมัครสมาชิก</button>
                ) : (
                   <button onClick={() => { setIsMobileMenuOpen(false); onViewChange(AppView.DASHBOARD); }} className="w-full bg-gray-100 text-truva-dark py-3 rounded font-bold shadow-sm flex items-center justify-center">
                      <IconUserCircle /> <span className="ml-2">บัญชีของฉัน</span>
                   </button>
                )}
             </div>
          </div>
        </div>
      )}
    </>
  );
};

const BannerSlider = ({ onViewChange }: { onViewChange: (v: AppView) => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-900 group">
      {SLIDES.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 ${slide.theme === 'dark' ? 'bg-black/60' : 'bg-white/80 md:bg-gradient-to-r md:from-white md:via-white/90 md:to-transparent'}`}></div>
          </div>

          {/* Content */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
             <div className="max-w-2xl">
                <h2 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-4 ${slide.theme === 'dark' ? 'text-white' : 'text-truva-dark'}`}>
                  {slide.title}
                </h2>
                <p className={`text-lg md:text-xl mb-8 leading-relaxed ${slide.theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>
                  {slide.subtitle}
                </p>
                <button 
                  onClick={() => slide.action ? onViewChange(slide.action) : (window.location.href = slide.buttonLink || '#')} 
                  className={`inline-block px-8 py-4 rounded font-bold text-lg transition-transform transform hover:-translate-y-1 shadow-lg
                    ${slide.theme === 'dark' 
                      ? 'bg-truva-orange text-white hover:bg-orange-600' 
                      : 'bg-truva-dark text-white hover:bg-gray-800'}`}
                >
                  {slide.buttonText}
                </button>
             </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white hover:bg-truva-orange transition-colors md:opacity-0 group-hover:opacity-100"
      >
        <IconArrowLeft />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white hover:bg-truva-orange transition-colors md:opacity-0 group-hover:opacity-100"
      >
        <IconArrowRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${idx === currentSlide ? 'bg-truva-orange' : 'bg-gray-400/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};

const StatsBar = () => (
  <div className="bg-truva-dark text-white py-4 border-b border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-gray-700">
        <div>
          <div className="text-2xl font-bold text-truva-orange">10M+</div>
          <div className="text-xs text-gray-300">ยอดเงินรางวัลที่จ่ายแล้ว</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-truva-orange">50,000+</div>
          <div className="text-xs text-gray-300">ผู้ใช้งานระบบ</div>
        </div>
         <div>
          <div className="text-2xl font-bold text-truva-orange">100%</div>
          <div className="text-xs text-gray-300">ได้รับเงินจริง</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-truva-orange">24/7</div>
          <div className="text-xs text-gray-300">บริการลูกค้า</div>
        </div>
      </div>
    </div>
  </div>
);

const LiveJackpotTable = ({ onSelectGame }: { onSelectGame: (g: LotteryGame) => void }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('th-TH'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('th-TH'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-12 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <div>
                <h2 className="text-2xl font-bold text-truva-dark">ตารางรางวัลปัจจุบัน</h2>
                <p className="text-gray-500 text-sm flex items-center mt-1">
                   <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                   ข้อมูลอัปเดตแบบ Real-time ตามเวลาประเทศไทย
                </p>
            </div>
            <div className="text-right mt-4 md:mt-0">
                <p className="text-xs text-gray-400 flex items-center justify-end">
                    <IconClock className="w-3 h-3 mr-1" />
                    อัปเดตล่าสุด: {currentTime}
                </p>
            </div>
         </div>

         <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                  <tr>
                     <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ลอตเตอรี่</th>
                     <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">เงินรางวัล (Jackpot)</th>
                     <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">จับรางวัลถัดไป</th>
                     <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">สถานะ</th>
                  </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                  {GAMES.map((game) => (
                      <tr key={game.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                      <img className="h-10 w-10 rounded-full shadow-sm" src={`https://ui-avatars.com/api/?name=${game.name.substring(0,2)}&background=random&color=fff&size=40`} alt="" />
                                  </div>
                                  <div className="ml-4">
                                      <div className="text-sm font-bold text-gray-900">{game.name}</div>
                                      <div className="text-xs text-gray-500 md:hidden">งวด {game.drawDate}</div>
                                  </div>
                              </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-lg font-bold text-truva-orange">{game.jackpot}</div>
                              <div className="text-xs text-gray-400">เงินสด: {Math.floor(game.price * 500000).toLocaleString()}฿ (โดยประมาณ)</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                              <div className="flex items-center text-sm text-gray-600">
                                  <IconCalendar />
                                  <span className="ml-1">{game.drawDate} <span className="text-xs text-gray-400 ml-1">(10:59 น.)</span></span>
                              </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button 
                                onClick={() => onSelectGame(game)}
                                className="text-truva-blue hover:text-white border border-truva-blue hover:bg-truva-blue font-bold rounded px-4 py-1.5 transition-all text-xs uppercase tracking-wide shadow-sm"
                              >
                                  ซื้อตั๋ว
                              </button>
                          </td>
                      </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

const Features = () => (
  <div className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-truva-orange font-semibold tracking-wide uppercase text-sm">Why Choose Us</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-truva-dark sm:text-4xl">
          ทำไมต้อง Truvamate?
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            เรายกระดับมาตรฐานการซื้อล็อตเตอรี่ออนไลน์ ด้วยความปลอดภัยและความโปร่งใสสูงสุด
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center group">
          <div className="flex justify-center transform group-hover:-translate-y-2 transition-transform">
             <div className="bg-orange-50 p-4 rounded-full"><IconSecurity /></div>
          </div>
          <h3 className="text-xl font-bold text-truva-dark mt-6 mb-3">ปลอดภัยสูงสุด (Security)</h3>
          <p className="text-gray-500 leading-relaxed">
            ระบบความปลอดภัยระดับเดียวกับธนาคาร ข้อมูลของคุณถูกเข้ารหัส 100% มั่นใจได้ในทุกธุรกรรมการเงิน
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center group">
          <div className="flex justify-center transform group-hover:-translate-y-2 transition-transform">
            <div className="bg-orange-50 p-4 rounded-full"><IconDocument /></div>
          </div>
          <h3 className="text-xl font-bold text-truva-dark mt-6 mb-3">ตั๋วจริงตรวจสอบได้ (Real Ticket)</h3>
          <p className="text-gray-500 leading-relaxed">
            เราทำการซื้อล็อตเตอรี่ใบจริงและสแกนเข้าระบบให้คุณเห็นเป็นหลักฐาน ยืนยันความเป็นเจ้าของ 100%
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center group">
          <div className="flex justify-center transform group-hover:-translate-y-2 transition-transform">
             <div className="bg-orange-50 p-4 rounded-full"><IconFast /></div>
          </div>
          <h3 className="text-xl font-bold text-truva-dark mt-6 mb-3">รวดเร็ว ทันใจ (Instant)</h3>
          <p className="text-gray-500 leading-relaxed">
            ระบบสั่งซื้อและตรวจรางวัลอัตโนมัติ แจ้งเตือนทันทีผ่าน SMS และ Email เมื่อคุณถูกรางวัล
          </p>
        </div>
      </div>
    </div>
  </div>
);

const GameList = ({ onSelectGame }: { onSelectGame: (g: LotteryGame) => void }) => (
  <div id="games" className="py-24 bg-white relative">
    {/* Corporate Background Pattern */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00234b 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-truva-blue text-xs font-bold tracking-wider uppercase mb-4">
          Official Lottery Tickets
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-truva-dark mb-4">
          เลือกซื้อ<span className="text-truva-orange">ล็อตเตอรี่</span>ระดับโลก
        </h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          โอกาสเป็นเศรษฐีพันล้านอยู่ในมือคุณ เลือกเกมที่คุณชื่นชอบแล้วลุ้นรางวัลใหญ่ได้เลย<br/>
          ด้วยบริการที่โปร่งใสและตรวจสอบได้
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GAMES.map((game) => (
          <div 
            key={game.id} 
            className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-truva-blue/30 transition-all duration-300 flex flex-col relative overflow-hidden"
          >
            {/* Hover Indicator Line */}
            <div className={`absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                 game.id === 'powerball' ? 'bg-red-600' : 
                 game.id === 'mega' ? 'bg-blue-600' : 
                 'bg-green-600'
            }`}></div>

            <div className="p-6 flex-grow">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                        <img 
                            src={`https://ui-avatars.com/api/?name=${game.name.substring(0,2)}&background=random&color=fff&size=48&font-size=0.4`} 
                            alt="logo" 
                            className="w-12 h-12 rounded-lg shadow-sm"
                        />
                        <div className="ml-3">
                            <h3 className="text-lg font-bold text-gray-900 leading-none">{game.name}</h3>
                            <span className="text-xs text-gray-400 mt-1 block">USA Lottery</span>
                        </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        game.id === 'powerball' ? 'bg-red-50 text-red-600' : 
                        game.id === 'mega' ? 'bg-blue-50 text-blue-600' : 
                        'bg-green-50 text-green-600'
                    }`}>
                        Live
                    </div>
                </div>

                <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-100 mb-6 group-hover:bg-white group-hover:border-gray-200 transition-colors">
                    <div className="text-sm text-gray-500 font-medium mb-1">JACKPOT</div>
                    <div className={`text-3xl font-extrabold tracking-tight ${
                        game.id === 'powerball' ? 'text-red-600' : 
                        game.id === 'mega' ? 'text-blue-600' : 
                        'text-green-600'
                    }`}>
                        {game.jackpot}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                        ≈ {Math.floor(game.price * 500000).toLocaleString()} ล้านบาท
                    </div>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span className="flex items-center"><IconCalendar className="w-4 h-4 mr-2 text-gray-400"/> งวดถัดไป</span>
                        <span className="font-medium text-gray-900">{game.drawDate}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span className="flex items-center"><IconClock className="w-4 h-4 mr-2 text-gray-400"/> ปิดรับใน</span>
                        <span className="font-medium text-truva-orange">10 ชม. 25 น.</span>
                    </div>
                </div>
            </div>

            <div className="p-6 pt-0 mt-auto border-t border-gray-100">
                <div className="flex items-center justify-between mb-4 mt-4">
                     <div className="text-xs text-gray-400">ราคาต่อใบ</div>
                     <div className="text-xl font-bold text-gray-900">{game.price} บาท</div>
                </div>
                <button
                    onClick={() => onSelectGame(game)}
                    className="w-full py-3 rounded-lg font-bold text-white bg-truva-dark hover:bg-truva-orange transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
                >
                    <IconTicket /> <span className="ml-2">เลือกซื้อ</span>
                </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500 flex items-center justify-center">
            <IconSecurity />
            <span className="ml-2">รับประกันความปลอดภัย ตั๋วจริงทุกใบ ตรวจสอบได้ 100%</span>
        </p>
      </div>
    </div>
  </div>
);

const Process = () => (
    <div id="process" className="py-24 bg-truva-dark text-white overflow-hidden relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
                <span className="text-truva-orange font-bold tracking-widest uppercase text-sm mb-2 block">How it works</span>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6">เริ่มต้นง่ายๆ ใน <span className="text-truva-orange">3 ขั้นตอน</span></h2>
                <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
                    เข้าถึงล็อตเตอรี่ระดับโลกได้ง่ายๆ ผ่านมือถือของคุณ ด้วยระบบที่ปลอดภัยและเชื่อถือได้
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-700 -z-10"></div>

                {/* Step 1 */}
                <div className="relative group text-center">
                    <div className="w-24 h-24 bg-[#003366] border-4 border-truva-dark rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg relative z-10">
                        <IconTicket />
                        <div className="absolute -right-2 -top-2 bg-truva-orange text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-truva-dark">1</div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">เลือกประเภทหวย</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                        เลือก Powerball, Mega Millions หรือล็อตเตอรี่อื่นๆ ที่คุณต้องการลุ้นรางวัลใหญ่จากทั่วโลก
                    </p>
                </div>

                {/* Step 2 */}
                <div className="relative group text-center">
                    <div className="w-24 h-24 bg-[#003366] border-4 border-truva-dark rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg relative z-10">
                        <IconPencil />
                        <div className="absolute -right-2 -top-2 bg-truva-orange text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-truva-dark">2</div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">เลือกเลขที่ชอบ</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                        ระบุตัวเลขนำโชคของคุณด้วยตัวเอง หรือใช้ระบบ AI อัจฉริยะช่วยวิเคราะห์และสุ่มเลขมงคล
                    </p>
                </div>

                {/* Step 3 */}
                <div className="relative group text-center">
                    <div className="w-24 h-24 bg-[#003366] border-4 border-truva-dark rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg relative z-10">
                         <IconScan />
                         <div className="absolute -right-2 -top-2 bg-truva-orange text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-truva-dark">3</div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">รอรับตั๋วสแกน</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                        เราดำเนินการซื้อตั๋วจริงและสแกนเข้าระบบให้คุณตรวจสอบได้ทันที พร้อมระบบแจ้งเตือนเมื่อถูกรางวัล
                    </p>
                </div>

            </div>
            
            <div className="mt-16 text-center">
                 <button className="bg-truva-orange text-white px-8 py-3 rounded font-bold text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1">
                    สมัครสมาชิกฟรี
                 </button>
            </div>
        </div>
    </div>
);

const UserReviews = () => (
    <div className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <span className="text-truva-orange font-bold tracking-widest uppercase text-sm mb-2 block">TESTIMONIALS</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-truva-dark mb-4">เสียงตอบรับจาก<span className="text-truva-orange">ผู้ใช้งานจริง</span></h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">ความพึงพอใจของลูกค้าคือเครื่องยืนยันความสำเร็จของเรา</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { name: "คุณสมชาย", role: "นักธุรกิจ", quote: "ระบบใช้งานง่ายมากครับ ตอนแรกกังวลว่าจะยุ่งยาก แต่ Truvamate ทำทุกอย่างให้เป็นเรื่องง่าย ได้ตั๋วจริงสแกนส่งมาให้ดูด้วย มั่นใจมากครับ", win: "ถูกรางวัล 50,000฿" },
                    { name: "คุณวิภา", role: "พนักงานบริษัท", quote: "ประทับใจระบบแจ้งเตือนค่ะ วันนั้นยุ่งๆ ไม่ได้ตรวจหวยเอง แต่มี SMS แจ้งว่าถูกรางวัลเล็กๆ น้อยๆ รู้สึกดีที่มีคนช่วยดูให้", win: "ถูกรางวัล 2,500฿" },
                    { name: "คุณนนท์", role: "Freelance", quote: "ฝากซื้อกับที่นี่มาปีกว่าแล้วครับ เคยถูกรางวัลใหญ่ครั้งนึง ทีมงานดูแลเรื่องการขึ้นเงินให้ดีมาก แนะนำเพื่อนๆ มาใช้บริการหลายคนแล้ว", win: "ถูกรางวัล 100,000฿" }
                ].map((review, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all relative group">
                        <div className="absolute top-6 right-6">
                            <IconQuote />
                        </div>
                        <div className="flex items-center mb-6">
                            <img src={`https://ui-avatars.com/api/?name=${review.name}&background=00234b&color=fff`} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h4 className="font-bold text-gray-900">{review.name}</h4>
                                <span className="text-xs text-gray-400">{review.role}</span>
                            </div>
                        </div>
                        <p className="text-gray-600 italic mb-6 leading-relaxed">"{review.quote}"</p>
                        <div className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
                            🎉 {review.win}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const FAQSection = ({ onViewChange }: { onViewChange: (v: AppView) => void }) => (
    <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                 <h2 className="text-3xl font-extrabold text-truva-dark">คำถามที่พบบ่อย (FAQ)</h2>
                 <p className="mt-2 text-gray-500">ไขข้อข้องใจเกี่ยวกับการใช้บริการ Truvamate</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { q: "ซื้อล็อตเตอรี่ออนไลน์ถูกกฎหมายหรือไม่?", a: "Truvamate ให้บริการในรูปแบบ 'รับฝากซื้อ' โดยเราทำหน้าที่เป็นตัวแทนไปซื้อตั๋วจริงที่ถูกกฎหมายในสหรัฐอเมริกา และถือครองแทนท่าน ซึ่งเป็นกระบวนการที่โปร่งใสและตรวจสอบได้" },
                    { q: "ถ้าถูกรางวัลจะได้รับเงินอย่างไร?", a: "สำหรับรางวัลเล็ก ระบบจะโอนเงินเข้า Wallet ของท่านทันที สำหรับรางวัลใหญ่ (Jackpot) ทีมงานจะประสานงานพาไปขึ้นรางวัลด้วยตนเอง หรือดำเนินการแทนตามหนังสือมอบอำนาจ" },
                    { q: "มั่นใจได้อย่างไรว่าจะได้รับเงินจริง?", a: "เรามีการสแกนตั๋วจริงเข้าระบบให้ท่านเห็นก่อนการออกรางวัล ตั๋วใบจริงจะถูกเก็บรักษาในตู้นิรภัยของธนาคาร และเรามีประวัติการจ่ายเงินรางวัลครบถ้วน 100%" },
                    { q: "มีค่าธรรมเนียมเพิ่มเติมหรือไม่?", a: "ราคาที่แสดงหน้าเว็บเป็นราคาสุทธิที่รวมค่าบริการฝากซื้อแล้ว ไม่มีการเรียกเก็บเพิ่ม ยกเว้นกรณีถูกรางวัลใหญ่ อาจมีค่าธรรมเนียมการโอนเงินระหว่างประเทศตามจริง" }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:border-truva-blue/50 transition-colors">
                        <h3 className="flex items-start font-bold text-lg text-gray-900 mb-3">
                            <span className="text-truva-orange mr-3 mt-1"><IconQuestion /></span>
                            {item.q}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed pl-9">
                            {item.a}
                        </p>
                    </div>
                ))}
            </div>
             <div className="mt-10 text-center">
                <button onClick={() => onViewChange(AppView.HELP)} className="text-truva-blue font-medium hover:underline">ดูคำถามทั้งหมด หรือ ติดต่อเรา</button>
            </div>
        </div>
    </div>
);

const CTABanner = ({ onLoginClick }: { onLoginClick: () => void }) => (
    <div className="bg-truva-blue py-16 relative overflow-hidden">
        {/* Simplified corporate background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #00234b 25%, transparent 25%, transparent 50%, #00234b 50%, #00234b 75%, transparent 75%, transparent)', backgroundSize: '20px 20px' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">พร้อมเป็นเศรษฐีคนต่อไปหรือยัง?</h2>
            <p className="text-blue-100 text-lg mb-8">อย่าปล่อยให้โอกาสหลุดลอยไป สมัครสมาชิกวันนี้พร้อมรับสิทธิพิเศษมากมาย</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={onLoginClick} className="bg-white text-truva-blue font-bold px-8 py-3 rounded shadow-lg hover:bg-gray-100 transition-colors transform hover:-translate-y-1">
                    เปิดบัญชีผู้ใช้
                </button>
                 <button onClick={() => window.scrollTo(0, document.getElementById('process')?.offsetTop || 0)} className="bg-transparent border-2 border-white/30 text-white font-bold px-8 py-3 rounded hover:bg-white/10 transition-colors">
                    ดูวิธีการเล่น
                </button>
            </div>
        </div>
    </div>
);

const BlogSection = ({ onViewChange }: { onViewChange: (v: AppView) => void }) => (
  <div id="blog" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-truva-dark">บทความและข่าวสาร</h2>
            <p className="mt-2 text-gray-500">อัปเดตข้อมูลวงการล็อตเตอรี่ เทคนิค และเรื่องราวผู้โชคดี</p>
          </div>
          <button onClick={() => onViewChange(AppView.HOME)} className="hidden md:flex items-center text-truva-blue font-medium hover:text-truva-dark transition-colors">
            ดูบทความทั้งหมด <IconArrowNarrowRight />
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
              <div className="h-48 overflow-hidden relative group">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-truva-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-xs text-gray-400 mb-4 space-x-4">
                   <span className="flex items-center"><IconCalendar /> {post.date}</span>
                   <span className="flex items-center"><IconUser /> {post.author}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-truva-blue cursor-pointer transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                <button className="inline-flex items-center text-truva-blue font-medium text-sm hover:underline mt-auto">
                  อ่านเพิ่มเติม <IconArrowNarrowRight />
                </button>
              </div>
            </div>
          ))}
       </div>
       
       <div className="mt-8 text-center md:hidden">
          <button onClick={() => onViewChange(AppView.HOME)} className="inline-flex items-center text-truva-blue font-medium hover:text-truva-dark transition-colors">
            ดูบทความทั้งหมด <IconArrowNarrowRight />
          </button>
       </div>
    </div>
  </div>
);

const Footer = ({ onViewChange }: { onViewChange: (v: AppView) => void }) => (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1">
                     <div className="flex items-center mb-6">
                        <IconLogo />
                        <span className="font-bold text-2xl text-white">Truvamate</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Truvamate ผู้นำด้านบริการฝากซื้อล็อตเตอรี่ออนไลน์ มุ่งมั่นให้บริการด้วยความซื่อสัตย์ โปร่งใส และรวดเร็ว เพื่อให้คนไทยเข้าถึงโอกาสระดับโลกได้ง่ายขึ้น
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-truva-orange transition-colors">f</a>
                        <a href="#" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-truva-orange transition-colors">t</a>
                        <a href="#" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-truva-orange transition-colors">in</a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6 text-white border-l-4 border-truva-orange pl-3">บริการของเรา</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); onViewChange(AppView.HOME); setTimeout(() => window.location.href='#games', 100); }} className="hover:text-truva-orange transition-colors">Powerball</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); onViewChange(AppView.HOME); setTimeout(() => window.location.href='#games', 100); }} className="hover:text-truva-orange transition-colors">Mega Millions</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); onViewChange(AppView.HOME); setTimeout(() => window.location.href='#games', 100); }} className="hover:text-truva-orange transition-colors">EuroMillions</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); onViewChange(AppView.HOME); setTimeout(() => window.location.href='#games', 100); }} className="hover:text-truva-orange transition-colors">Cash4Life</a></li>
                        <li><button onClick={() => onViewChange(AppView.RESULTS)} className="hover:text-truva-orange transition-colors">ตรวจผลรางวัล</button></li>
                    </ul>
                </div>

                 <div>
                    <h4 className="font-bold text-lg mb-6 text-white border-l-4 border-truva-orange pl-3">ช่วยเหลือ</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><button onClick={() => onViewChange(AppView.HOME)} className="hover:text-truva-orange transition-colors">เกี่ยวกับเรา</button></li>
                        <li><button onClick={() => onViewChange(AppView.HELP)} className="hover:text-truva-orange transition-colors">คำถามที่พบบ่อย (FAQ)</button></li>
                        <li><button onClick={() => onViewChange(AppView.TERMS)} className="hover:text-truva-orange transition-colors">เงื่อนไขการให้บริการ</button></li>
                        <li><button onClick={() => onViewChange(AppView.PRIVACY)} className="hover:text-truva-orange transition-colors">นโยบายความเป็นส่วนตัว</button></li>
                        <li><button onClick={() => onViewChange(AppView.CONTACT)} className="hover:text-truva-orange transition-colors">ร่วมงานกับเรา</button></li>
                    </ul>
                </div>

                 <div>
                    <h4 className="font-bold text-lg mb-6 text-white border-l-4 border-truva-orange pl-3">ติดต่อเรา</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li className="flex items-start">
                             <div className="mt-1 mr-3"><IconPhone /></div>
                             <span>
                                02-123-4567<br/>
                                081-999-9999
                             </span>
                        </li>
                        <li className="flex items-center">
                             <div className="mr-3"><IconMail /></div>
                             support@truvamate.com
                        </li>
                        <li className="flex items-start">
                             <div className="mt-1 mr-3"><IconGlobal /></div>
                             <span>
                                123 อาคารสาทรซิตี้ทาวเวอร์ ชั้น 10<br/>
                                ถนนสาทรใต้ แขวงทุ่งมหาเมฆ<br/>
                                เขตสาทร กรุงเทพฯ 10120
                             </span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Truvamate Company Limited. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <img src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" alt="Visa" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
                </div>
            </div>
        </div>
    </footer>
);

// --- Game Logic Components (Refined Style) ---

interface DraftTicket {
    id: string;
    main: number[];
    special: number | null;
}

const NumberSelector = ({ game, onBack, onAddToCart }: { game: LotteryGame, onBack: () => void, onAddToCart: (t: Ticket[]) => void }) => {
  const [draftTickets, setDraftTickets] = useState<DraftTicket[]>([{ id: 'init-1', main: [], special: null }]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiReason, setAiReason] = useState<string | null>(null);

  const activeTicket = draftTickets[activeIndex];

  const updateActiveTicket = (updates: Partial<DraftTicket>) => {
      setDraftTickets(prev => prev.map((t, i) => i === activeIndex ? { ...t, ...updates } : t));
  };

  const toggleMain = (num: number) => {
    const currentMain = activeTicket.main;
    if (currentMain.includes(num)) {
      updateActiveTicket({ main: currentMain.filter(n => n !== num) });
    } else {
      if (currentMain.length < game.maxMainNumbers) {
        updateActiveTicket({ main: [...currentMain, num] });
      }
    }
  };

  const setSpecial = (num: number) => {
      updateActiveTicket({ special: num });
  };

  const handleAI = async () => {
    setLoadingAI(true);
    setAiReason(null);
    const result = await generateLuckyNumbers(game.name, game.maxMainNumbers, game.mainNumberLimit, game.specialNumberLimit);
    updateActiveTicket({ main: result.main, special: result.special });
    setAiReason(result.reason);
    setLoadingAI(false);
  };

  const handleQuickPick = () => {
    const main = [];
    while (main.length < game.maxMainNumbers) {
      const n = Math.floor(Math.random() * game.mainNumberLimit) + 1;
      if (!main.includes(n)) main.push(n);
    }
    const special = Math.floor(Math.random() * game.specialNumberLimit) + 1;
    updateActiveTicket({ main: main.sort((a,b) => a-b), special: special });
    setAiReason(null);
  };

  const handleClear = () => {
    updateActiveTicket({ main: [], special: null });
    setAiReason(null);
  };

  const addNewTicket = () => {
      setDraftTickets([...draftTickets, { id: Math.random().toString(36).substr(2, 9), main: [], special: null }]);
      setActiveIndex(draftTickets.length); // Switch to new ticket
  };

  const removeTicket = (index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      if (draftTickets.length === 1) {
          handleClear();
          return;
      }
      const newTickets = draftTickets.filter((_, i) => i !== index);
      setDraftTickets(newTickets);
      if (activeIndex >= index && activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
      }
  };

  const isComplete = (t: DraftTicket) => t.main.length === game.maxMainNumbers && t.special !== null;
  const completedCount = draftTickets.filter(isComplete).length;
  const totalAmount = completedCount * game.price;

  const handleConfirm = () => {
    const validTickets: Ticket[] = draftTickets.filter(isComplete).map(t => ({
        id: Math.random().toString(36).substr(2, 9),
        gameId: game.id,
        mainNumbers: t.main.sort((a, b) => a - b),
        specialNumber: t.special!,
        price: game.price
    }));
    
    if (validTickets.length > 0) {
        onAddToCart(validTickets);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="bg-truva-dark text-white py-12">
           <div className="max-w-4xl mx-auto px-4">
                <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center font-medium mb-4 transition-colors">
                  ← เลือกเกมอื่น
                </button>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold">{game.name}</h1>
                        <p className="text-gray-400 mt-2">งวดวันที่ {game.drawDate} • Jackpot: <span className="text-truva-orange">{game.jackpot}</span></p>
                    </div>
                </div>
           </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        {/* Ticket Tabs */}
        <div className="flex overflow-x-auto space-x-2 border-b border-gray-200 pb-0 mb-6 custom-scrollbar">
            {draftTickets.map((ticket, index) => {
                const complete = isComplete(ticket);
                const active = index === activeIndex;
                return (
                    <div 
                        key={ticket.id}
                        onClick={() => setActiveIndex(index)}
                        className={`
                            relative group min-w-[130px] px-4 py-3 rounded-t-lg border-t border-l border-r cursor-pointer transition-all flex justify-between items-center
                            ${active 
                                ? 'bg-white border-gray-200 text-truva-blue -mb-px pb-4 z-10 font-bold shadow-sm' 
                                : 'bg-gray-100 border-transparent text-gray-500 hover:bg-gray-200'}
                        `}
                    >
                        <div className="flex items-center">
                            {complete ? <IconCheck /> : <span className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs mr-2">{index + 1}</span>}
                            <span className="ml-2 text-sm">Ticket {index + 1}</span>
                        </div>
                        <button onClick={(e) => removeTicket(index, e)} className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-200 ml-2">
                            <IconX />
                        </button>
                    </div>
                );
            })}
            <button 
                onClick={addNewTicket}
                className="flex items-center px-4 py-2 text-sm font-medium text-truva-blue hover:text-truva-dark hover:bg-blue-50 rounded-t-lg transition-colors whitespace-nowrap"
            >
                <IconPlus /> <span className="ml-1">เพิ่มใบใหม่</span>
            </button>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100 rounded-tl-none">
           {/* Visual Ticket Header */}
           <div className="bg-gray-50 border-b border-gray-200 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
               <div className="flex space-x-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                   <button 
                      onClick={handleQuickPick}
                      className="bg-white border border-gray-300 text-gray-700 hover:text-truva-blue hover:border-truva-blue px-4 py-2 rounded-md shadow-sm font-medium text-sm flex items-center transition-all whitespace-nowrap"
                   >
                      <IconLightning /> <span className="ml-2">Quick Pick</span>
                   </button>
                    <button 
                      onClick={handleAI}
                      disabled={loadingAI}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-sm font-medium text-sm flex items-center transition-all whitespace-nowrap"
                   >
                      {loadingAI ? 'กำลังวิเคราะห์...' : <><IconBot /><span className="ml-2">AI Pick</span></>}
                   </button>
                   <button 
                      onClick={handleClear}
                      className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                      title="ล้างข้อมูล"
                   >
                      <IconTrash />
                   </button>
               </div>
               <div className="flex items-center space-x-2 flex-wrap justify-center">
                   {activeTicket.main.map(n => <span key={n} className="w-8 h-8 rounded-full bg-truva-blue text-white font-bold flex items-center justify-center text-sm shadow-sm mb-1">{n}</span>)}
                   {Array.from({length: game.maxMainNumbers - activeTicket.main.length}).map((_, i) => <span key={i} className="w-8 h-8 rounded-full bg-gray-200 animate-pulse mb-1"></span>)}
                   <span className="text-gray-300 mx-1">|</span>
                   {activeTicket.special ? <span className="w-8 h-8 rounded-full bg-red-500 text-white font-bold flex items-center justify-center text-sm shadow-sm mb-1">{activeTicket.special}</span> : <span className="w-8 h-8 rounded-full bg-red-100 animate-pulse mb-1"></span>}
               </div>
           </div>

          <div className="p-4 md:p-8">
            {aiReason && (
                <div className="mb-8 bg-purple-50 border-l-4 border-purple-500 text-purple-800 px-4 py-3 rounded-r text-sm flex items-start animate-fade-in">
                    <IconStar />
                    <span className="ml-2 font-medium">{aiReason}</span>
                </div>
            )}

            <div className="mb-10">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                  <span className="font-bold text-gray-800 text-lg">1. เลือก {game.maxMainNumbers} เลขทั่วไป</span>
                  <span className="text-sm font-bold px-2 py-1 rounded bg-gray-100 text-gray-500">
                      {activeTicket.main.length}/{game.maxMainNumbers}
                  </span>
              </div>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3">
                {Array.from({ length: game.mainNumberLimit }, (_, i) => i + 1).map(num => (
                  <button
                    key={num}
                    onClick={() => toggleMain(num)}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 mx-auto
                      ${activeTicket.main.includes(num) 
                        ? 'bg-truva-blue text-white shadow-lg transform scale-110 ring-2 ring-blue-200' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-truva-blue hover:text-truva-blue'}
                    `}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
               <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                  <span className="font-bold text-gray-800 text-lg">2. เลือก 1 เลขพิเศษ (Powerball)</span>
                  <span className="text-sm font-bold px-2 py-1 rounded bg-gray-100 text-gray-500">
                      {activeTicket.special ? 1 : 0}/1
                  </span>
              </div>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3">
                {Array.from({ length: game.specialNumberLimit }, (_, i) => i + 1).map(num => (
                  <button
                    key={num}
                    onClick={() => setSpecial(num)}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 mx-auto
                      ${activeTicket.special === num
                        ? 'bg-red-500 text-white shadow-lg transform scale-110 ring-2 ring-red-200' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-500'}
                    `}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Summary */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] p-4 z-40">
         <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="flex items-center space-x-4">
                 <div className="text-right">
                     <p className="text-gray-500 text-xs">ตั๋วที่สมบูรณ์</p>
                     <p className="font-bold text-gray-900">{completedCount} ใบ</p>
                 </div>
                 <div className="h-8 w-px bg-gray-200"></div>
                 <div>
                     <p className="text-gray-500 text-xs">ยอดรวม</p>
                     <p className="text-2xl font-bold text-truva-dark">{totalAmount.toLocaleString()} <span className="text-sm font-normal text-gray-500">บาท</span></p>
                 </div>
             </div>
             <button
                onClick={handleConfirm}
                disabled={completedCount === 0}
                className={`
                  w-full sm:w-auto px-8 py-3 rounded shadow-md font-bold text-white transition-all flex items-center justify-center
                  ${completedCount > 0
                    ? 'bg-truva-orange hover:bg-truva-orangeHover transform hover:-translate-y-0.5' 
                    : 'bg-gray-300 cursor-not-allowed'}
                `}
              >
                เพิ่ม {completedCount} ใบลงตะกร้า <IconArrowRight />
              </button>
         </div>
      </div>
    </div>
  );
};

const Cart = ({ tickets, onRemove, onCheckout, onBack }: { tickets: Ticket[], onRemove: (id: string) => void, onCheckout: () => void, onBack: () => void }) => {
  const subtotal = tickets.reduce((sum, t) => sum + t.price, 0);
  const serviceFee = 0; // Free for promotion
  const total = subtotal + serviceFee;
  const [promoCode, setPromoCode] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center mb-8 text-gray-500 text-sm">
           <span className="cursor-pointer hover:text-truva-blue" onClick={onBack}>หน้าแรก</span>
           <span className="mx-2">/</span>
           <span className="text-gray-900 font-medium">ตะกร้าสินค้า</span>
        </div>

        <h1 className="text-3xl font-bold text-truva-dark mb-8 flex items-center">
            <IconCart /> <span className="ml-3">ตะกร้าสินค้าของคุณ</span>
        </h1>

        {tickets.length === 0 ? (
          <div className="bg-white rounded shadow p-16 text-center border border-gray-200">
            <div className="text-gray-200 mb-6 flex justify-center scale-150"><IconCart /></div>
            <p className="text-gray-500 text-lg mb-8">ยังไม่มีรายการในตะกร้า</p>
            <button onClick={onBack} className="bg-truva-blue text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">เลือกซื้อล็อตเตอรี่</button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-4">
               {tickets.map((ticket, index) => {
                  const game = GAMES.find(g => g.id === ticket.gameId);
                  return (
                    <div key={ticket.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:border-truva-blue/30 transition-colors">
                        <div className="flex items-start">
                             <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-xl mr-4 ${game?.id === 'powerball' ? 'bg-red-600' : game?.id === 'mega' ? 'bg-blue-600' : 'bg-green-600'}`}>
                                {game?.name.charAt(0)}
                             </div>
                             <div>
                                <h3 className="font-bold text-gray-900 text-lg">{game?.name}</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {ticket.mainNumbers.map(n => <span key={n} className="bg-gray-100 text-gray-700 font-mono text-sm px-2 py-0.5 rounded border border-gray-200">{n}</span>)}
                                    <span className="bg-red-50 text-red-600 font-bold font-mono text-sm px-2 py-0.5 rounded border border-red-100">{ticket.specialNumber}</span>
                                </div>
                             </div>
                        </div>
                        <div className="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0">
                            <span className="font-bold text-gray-900 text-lg mr-6">{ticket.price} ฿</span>
                            <button onClick={() => onRemove(ticket.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded hover:bg-red-50">
                                <IconTrash />
                            </button>
                        </div>
                    </div>
                  );
               })}
               <button onClick={onBack} className="text-truva-blue font-medium hover:underline flex items-center mt-4">
                  ← เลือกซื้อล็อตเตอรี่เพิ่ม
               </button>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-24">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">สรุปคำสั่งซื้อ</h3>
                    
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-gray-600">
                            <span>ยอดรวม ({tickets.length} รายการ)</span>
                            <span>{subtotal.toLocaleString()} ฿</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>ค่าธรรมเนียมบริการ</span>
                            <span className="text-green-600 font-medium">ฟรี</span>
                        </div>
                         <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                            <span className="font-bold text-gray-900">ยอดชำระสุทธิ</span>
                            <span className="font-bold text-2xl text-truva-orange">{total.toLocaleString()} ฿</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-medium text-gray-500 mb-2">รหัสส่วนลด</label>
                        <div className="flex">
                            <input 
                                type="text" 
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="flex-grow bg-gray-50 text-gray-900 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:border-truva-blue"
                                placeholder="กรอกโค้ดส่วนลด"
                            />
                            <button className="bg-gray-800 text-white px-4 py-2 rounded-r text-sm font-medium hover:bg-gray-700">ใช้</button>
                        </div>
                    </div>

                    <button 
                        onClick={onCheckout} 
                        className="w-full bg-truva-orange hover:bg-orange-600 text-white font-bold py-3.5 rounded-lg shadow-md transition-all flex justify-center items-center"
                    >
                        ดำเนินการชำระเงิน <IconArrowRight />
                    </button>

                     <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center">
                        <IconLock /> <span className="ml-1">SSL Secured Payment</span>
                    </p>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- NEW Checkout Page Component ---
const CheckoutPage = ({ tickets, onConfirmPayment, onBack }: { tickets: Ticket[], onConfirmPayment: () => void, onBack: () => void }) => {
    const total = tickets.reduce((sum, t) => sum + t.price, 0);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr' | 'wallet'>('card');
    const [form, setForm] = useState({ name: '', email: '', phone: '' });

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4">
                 <div className="flex items-center mb-8 text-gray-500 text-sm">
                    <span className="cursor-pointer hover:text-truva-blue" onClick={onBack}>ตะกร้าสินค้า</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">ชำระเงิน</span>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     {/* Left Column: Details & Payment */}
                     <div className="lg:col-span-2 space-y-6">
                         {/* 1. Contact Info */}
                         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-truva-dark mb-4 flex items-center">
                                 <span className="w-8 h-8 rounded-full bg-truva-dark text-white flex items-center justify-center mr-3 text-sm">1</span>
                                 ข้อมูลผู้ซื้อ
                             </h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div className="col-span-2">
                                     <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
                                     <input type="text" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-truva-blue focus:border-truva-blue outline-none" placeholder="ระบุชื่อจริง" />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                                     <input type="email" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-truva-blue focus:border-truva-blue outline-none" placeholder="example@email.com" />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                                     <input type="tel" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-truva-blue focus:border-truva-blue outline-none" placeholder="08x-xxx-xxxx" />
                                 </div>
                             </div>
                         </div>

                         {/* 2. Payment Method */}
                         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-truva-dark mb-4 flex items-center">
                                 <span className="w-8 h-8 rounded-full bg-truva-dark text-white flex items-center justify-center mr-3 text-sm">2</span>
                                 เลือกช่องทางการชำระเงิน
                             </h3>
                             
                             <div className="flex space-x-4 mb-6 border-b border-gray-100 pb-2">
                                 <button 
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex-1 py-3 text-center rounded-lg border-2 font-medium transition-all flex flex-col items-center justify-center ${paymentMethod === 'card' ? 'border-truva-blue bg-blue-50 text-truva-blue' : 'border-transparent hover:bg-gray-50 text-gray-500'}`}
                                 >
                                     <IconCreditCard />
                                     <span className="mt-1 text-sm">Credit Card</span>
                                 </button>
                                 <button 
                                    onClick={() => setPaymentMethod('qr')}
                                    className={`flex-1 py-3 text-center rounded-lg border-2 font-medium transition-all flex flex-col items-center justify-center ${paymentMethod === 'qr' ? 'border-truva-blue bg-blue-50 text-truva-blue' : 'border-transparent hover:bg-gray-50 text-gray-500'}`}
                                 >
                                     <IconQRCode />
                                     <span className="mt-1 text-sm">QR PromptPay</span>
                                 </button>
                                 <button 
                                    onClick={() => setPaymentMethod('wallet')}
                                    className={`flex-1 py-3 text-center rounded-lg border-2 font-medium transition-all flex flex-col items-center justify-center ${paymentMethod === 'wallet' ? 'border-truva-blue bg-blue-50 text-truva-blue' : 'border-transparent hover:bg-gray-50 text-gray-500'}`}
                                 >
                                     <IconWallet />
                                     <span className="mt-1 text-sm">TrueMoney</span>
                                 </button>
                             </div>

                             <div className="mt-4">
                                 {paymentMethod === 'card' && (
                                     <div className="space-y-4 animate-fade-in">
                                         <div>
                                             <label className="block text-sm font-medium text-gray-700 mb-1">หมายเลขบัตร</label>
                                             <div className="relative">
                                                 <input type="text" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 pl-10 focus:border-truva-blue outline-none" placeholder="0000 0000 0000 0000" />
                                                 <div className="absolute left-3 top-2.5 text-gray-400"><IconCreditCard /></div>
                                             </div>
                                         </div>
                                         <div className="grid grid-cols-2 gap-4">
                                             <div>
                                                 <label className="block text-sm font-medium text-gray-700 mb-1">วันหมดอายุ (MM/YY)</label>
                                                 <input type="text" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:border-truva-blue outline-none" placeholder="MM/YY" />
                                             </div>
                                             <div>
                                                 <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                                 <input type="text" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:border-truva-blue outline-none" placeholder="123" />
                                             </div>
                                         </div>
                                         <div>
                                             <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อบนบัตร</label>
                                             <input type="text" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:border-truva-blue outline-none" placeholder="NAME SURNAME" />
                                         </div>
                                     </div>
                                 )}

                                 {paymentMethod === 'qr' && (
                                     <div className="text-center py-6 animate-fade-in">
                                         <div className="bg-white p-4 inline-block border border-gray-200 rounded-lg shadow-sm">
                                             <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" className="w-48 h-48 mx-auto opacity-80" />
                                         </div>
                                         <p className="mt-4 text-sm text-gray-500">สแกน QR Code เพื่อชำระเงินผ่านแอปธนาคาร</p>
                                         <p className="text-xs text-gray-400 mt-1">ยอดชำระ: {total.toLocaleString()} บาท</p>
                                     </div>
                                 )}

                                 {paymentMethod === 'wallet' && (
                                     <div className="space-y-4 animate-fade-in">
                                         <div>
                                             <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์ TrueMoney Wallet</label>
                                             <input type="tel" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:border-truva-blue outline-none" placeholder="08x-xxx-xxxx" />
                                         </div>
                                         <p className="text-xs text-gray-500">ระบบจะส่ง OTP ไปยังเบอร์โทรศัพท์ของท่านเพื่อยืนยันการชำระเงิน</p>
                                     </div>
                                 )}
                             </div>
                         </div>
                     </div>

                     {/* Right Column: Order Summary (Sticky) */}
                     <div className="lg:col-span-1">
                         <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-24">
                             <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">รายการสั่งซื้อ</h3>
                             <ul className="space-y-3 mb-6 max-h-60 overflow-y-auto custom-scrollbar">
                                 {tickets.map((t, idx) => (
                                     <li key={idx} className="flex justify-between text-sm">
                                         <span className="text-gray-600 truncate w-2/3">{GAMES.find(g => g.id === t.gameId)?.name} (x1)</span>
                                         <span className="font-medium text-gray-900">{t.price} ฿</span>
                                     </li>
                                 ))}
                             </ul>
                             
                             <div className="border-t border-gray-100 pt-4 mb-6">
                                 <div className="flex justify-between items-center mb-2">
                                     <span className="text-gray-600">ยอดรวม</span>
                                     <span className="font-bold">{total.toLocaleString()} ฿</span>
                                 </div>
                                 <div className="flex justify-between items-center text-xl font-bold text-truva-orange">
                                     <span>ยอดชำระสุทธิ</span>
                                     <span>{total.toLocaleString()} ฿</span>
                                 </div>
                             </div>

                             <button 
                                onClick={onConfirmPayment}
                                className="w-full bg-truva-dark hover:bg-gray-800 text-white font-bold py-3.5 rounded-lg shadow-lg transition-all"
                             >
                                 ยืนยันการชำระเงิน
                             </button>

                             <div className="mt-4 flex justify-center space-x-2 opacity-50">
                                 <IconCreditCard />
                                 <IconQRCode />
                                 <IconWallet />
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    );
};

const ResultsPage = ({ onViewChange }: { onViewChange: (v: AppView) => void }) => {
  const [filterGame, setFilterGame] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [minJackpot, setMinJackpot] = useState(0);
  const [onlyWinners, setOnlyWinners] = useState(false);

  // Helper to parse jackpot value for comparison
  const getJackpotValue = (jackpotStr: string) => {
    const cleanStr = jackpotStr.replace(/[$,]/g, '');
    if (cleanStr.includes('Million')) {
        return parseFloat(cleanStr) * 1_000_000;
    }
    // Handle specific cases or generic numbers
    return parseFloat(cleanStr) || 0;
  }

  const resetFilters = () => {
    setFilterGame('all');
    setFilterDate('');
    setMinJackpot(0);
    setOnlyWinners(false);
  };

  const hasActiveFilters = filterGame !== 'all' || filterDate !== '' || minJackpot > 0 || onlyWinners;

  const filteredResults = PAST_RESULTS.filter(result => {
    const gameMatch = filterGame === 'all' || result.gameId === filterGame;
    const dateMatch = !filterDate || result.date === filterDate;
    
    const jackpotValue = getJackpotValue(result.jackpot);
    const jackpotMatch = minJackpot === 0 || jackpotValue >= minJackpot;
    
    const winnersMatch = !onlyWinners || result.winners > 0;

    return gameMatch && dateMatch && jackpotMatch && winnersMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-truva-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <IconTrophy />
           </div>
           <h1 className="text-4xl font-extrabold mb-4">ผลรางวัลล็อตเตอรี่</h1>
           <p className="text-gray-400 max-w-2xl mx-auto text-lg">
             ตรวจสอบผลรางวัล Powerball, Mega Millions และอื่นๆ อัปเดตล่าสุดรวดเร็วทันใจ
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-100">
           <div className="flex flex-col gap-6">
              {/* Row 1: Game & Date */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4 md:border-b-0 md:pb-0">
                  <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
                    <button 
                        onClick={() => setFilterGame('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterGame === 'all' ? 'bg-truva-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        ทั้งหมด
                    </button>
                    <button 
                        onClick={() => setFilterGame('powerball')}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterGame === 'powerball' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Powerball
                    </button>
                    <button 
                        onClick={() => setFilterGame('mega')}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterGame === 'mega' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Mega Millions
                    </button>
                    <button 
                        onClick={() => setFilterGame('cash4life')}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterGame === 'cash4life' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Cash4Life
                    </button>
                  </div>

                  <div className="flex items-center bg-gray-50 rounded px-3 py-2 border border-gray-200">
                    <IconFilter />
                    <input 
                        type="date" 
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 text-sm text-gray-600 outline-none"
                        placeholder="เลือกวันที่"
                    />
                    {filterDate && (
                        <button onClick={() => setFilterDate('')} className="ml-2 text-gray-400 hover:text-red-500 text-xs">
                            ล้างค่า
                        </button>
                    )}
                  </div>
              </div>

              {/* Row 2: Advanced Filters (Jackpot & Winners & Clear) */}
              <div className="flex flex-wrap items-center gap-6 md:pl-2">
                 <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500">Jackpot ขั้นต่ำ ($):</span>
                    <input
                        type="number"
                        value={minJackpot || ''}
                        onChange={(e) => setMinJackpot(Number(e.target.value))}
                        placeholder="ระบุจำนวนเงิน"
                        className="bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-truva-blue text-sm w-40"
                    />
                 </div>

                 <label className="inline-flex items-center cursor-pointer select-none">
                    <input 
                        type="checkbox" 
                        checked={onlyWinners} 
                        onChange={(e) => setOnlyWinners(e.target.checked)} 
                        className="w-5 h-5 text-truva-blue rounded border-gray-300 focus:ring-truva-blue cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-600 font-medium">แสดงเฉพาะงวดที่มีผู้ถูกรางวัล</span>
                 </label>

                 <div className="flex-grow"></div>

                 {hasActiveFilters && (
                    <button 
                        onClick={resetFilters}
                        className="text-sm text-red-500 hover:text-red-700 font-medium hover:underline flex items-center"
                    >
                        <span className="mr-1">✕</span> ล้างตัวกรองทั้งหมด
                    </button>
                 )}
              </div>
           </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <div key={result.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between">
                 <div className="flex items-center w-full md:w-1/3 mb-4 md:mb-0">
                    <img 
                       src={`https://ui-avatars.com/api/?name=${result.gameName.substring(0,2)}&background=random&color=fff&size=48`} 
                       alt={result.gameName} 
                       className="w-12 h-12 rounded-full shadow-sm mr-4"
                    />
                    <div>
                       <h3 className="font-bold text-lg text-gray-900">{result.gameName}</h3>
                       <div className="flex items-center text-sm text-gray-500">
                          <IconCalendar /> {result.displayDate}
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center justify-center w-full md:w-1/3 mb-4 md:mb-0 space-x-2">
                    {result.numbers.map((num, idx) => (
                       <span key={idx} className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center shadow-inner">
                          {num}
                       </span>
                    ))}
                    <span className="w-10 h-10 rounded-full bg-red-500 text-white font-bold flex items-center justify-center shadow-lg transform scale-110">
                       {result.special}
                    </span>
                 </div>

                 <div className="w-full md:w-1/3 text-center md:text-right">
                    <p className="text-sm text-gray-500">Jackpot</p>
                    <p className="text-xl font-bold text-truva-orange">{result.jackpot}</p>
                    {result.winners > 0 ? (
                        <p className="text-xs text-green-600 mt-1 font-medium bg-green-50 inline-block px-2 py-1 rounded-full border border-green-100">
                           🎉 {result.winners} Winners
                        </p>
                    ) : (
                        <p className="text-xs text-gray-400 mt-1">No Winners</p>
                    )}
                 </div>
              </div>
            ))
          ) : (
             <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                <div className="text-gray-300 mb-4 flex justify-center scale-150"><IconSearch /></div>
                <p className="text-gray-500">ไม่พบข้อมูลผลรางวัลที่ค้นหา</p>
                <button onClick={resetFilters} className="mt-4 text-truva-blue hover:underline">
                   ล้างตัวกรองทั้งหมด
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Success = ({ onReset }: { onReset: () => void }) => {
  const handleNavigation = () => {
    if (window.confirm("Are you sure you want to leave this page?")) {
      onReset();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">ชำระเงินสำเร็จ!</h2>
        <p className="text-gray-600 max-w-md mb-8">
            ขอบคุณที่ใช้บริการ Truvamate<br/>
            เจ้าหน้าที่กำลังดำเนินการซื้อตั๋วให้คุณ<br/>
            คุณจะได้รับภาพสแกนตั๋วทางอีเมลภายใน 2 ชั่วโมง
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
             <button 
                onClick={handleNavigation}
                className="bg-truva-orange text-white px-8 py-3 rounded font-medium hover:bg-orange-600 transition-colors shadow-md flex items-center justify-center"
            >
               <IconTrophy /> <span className="ml-2">Play Again</span>
            </button>
            <button 
                onClick={handleNavigation}
                className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
                กลับสู่หน้าหลัก
            </button>
        </div>
    </div>
  );
};

// --- NEW FEATURES: Auth, Dashboard, Widgets ---

const AuthModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: (user: any) => void }) => {
    const [mode, setMode] = useState<'login' | 'register'>('login');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        onLogin({ name: 'Demo User', email: 'user@demo.com' });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in">
                <div className="flex border-b border-gray-100">
                    <button 
                        className={`flex-1 py-4 font-bold text-sm ${mode === 'login' ? 'text-truva-blue border-b-2 border-truva-blue bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
                        onClick={() => setMode('login')}
                    >
                        เข้าสู่ระบบ
                    </button>
                    <button 
                        className={`flex-1 py-4 font-bold text-sm ${mode === 'register' ? 'text-truva-blue border-b-2 border-truva-blue bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
                        onClick={() => setMode('register')}
                    >
                        สมัครสมาชิก
                    </button>
                </div>
                
                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center text-truva-dark">
                             <IconLogo />
                             <span className="font-bold text-2xl">Truvamate</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'register' && (
                             <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">ชื่อ-นามสกุล</label>
                                <input type="text" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2.5 focus:border-truva-blue outline-none text-sm" placeholder="Your Name" required />
                             </div>
                        )}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">อีเมล / เบอร์โทรศัพท์</label>
                            <input type="text" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2.5 focus:border-truva-blue outline-none text-sm" placeholder="user@example.com" required />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">รหัสผ่าน</label>
                            <input type="password" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2.5 focus:border-truva-blue outline-none text-sm" placeholder="••••••••" required />
                        </div>
                        
                        {mode === 'login' && (
                            <div className="text-right">
                                <a href="#" className="text-xs text-truva-blue hover:underline">ลืมรหัสผ่าน?</a>
                            </div>
                        )}

                        <button type="submit" className="w-full bg-truva-dark text-white py-3 rounded font-bold hover:bg-gray-800 transition-colors shadow-md mt-2">
                            {mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิกฟรี'}
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-400">หรือเข้าสู่ระบบด้วย</p>
                        <div className="flex justify-center space-x-4 mt-3">
                            <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity">f</button>
                            <button className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity">G</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserDashboard = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
    const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'wallet'>('profile');
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-truva-dark mb-8">บัญชีของฉัน</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24">
                            <div className="p-6 text-center border-b border-gray-100">
                                <div className="w-20 h-20 bg-truva-dark text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                                    {user.name.charAt(0)}
                                </div>
                                <h3 className="font-bold text-gray-900">{user.name}</h3>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                            <nav className="p-2 space-y-1">
                                <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-truva-blue' : 'text-gray-600 hover:bg-gray-50'}`}>
                                    <IconUserCircle /> <span className="ml-3">ข้อมูลส่วนตัว</span>
                                </button>
                                <button onClick={() => setActiveTab('history')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded transition-colors ${activeTab === 'history' ? 'bg-blue-50 text-truva-blue' : 'text-gray-600 hover:bg-gray-50'}`}>
                                    <IconHistory /> <span className="ml-3">ประวัติการสั่งซื้อ</span>
                                </button>
                                <button onClick={() => setActiveTab('wallet')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded transition-colors ${activeTab === 'wallet' ? 'bg-blue-50 text-truva-blue' : 'text-gray-600 hover:bg-gray-50'}`}>
                                    <IconWallet /> <span className="ml-3">กระเป๋าเงิน (Wallet)</span>
                                </button>
                                <button onClick={onLogout} className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded text-left transition-colors">
                                    <IconLogout /> <span className="ml-3">ออกจากระบบ</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3 space-y-6">
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 animate-fade-in">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><IconUserCircle /> <span className="ml-2">แก้ไขข้อมูลส่วนตัว</span></h2>
                                <form className="space-y-6 max-w-lg">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
                                        <input type="text" defaultValue={user.name} className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-truva-blue focus:border-truva-blue outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                                        <input type="email" defaultValue={user.email} className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-truva-blue focus:border-truva-blue outline-none" disabled />
                                        <p className="text-xs text-gray-400 mt-1">อีเมลไม่สามารถเปลี่ยนแปลงได้</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                                        <input type="tel" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-truva-blue focus:border-truva-blue outline-none" placeholder="เพิ่มเบอร์โทรศัพท์" />
                                    </div>
                                    <div className="pt-4">
                                        <button type="button" className="bg-truva-dark text-white px-6 py-2.5 rounded hover:bg-gray-800 font-medium text-sm transition-colors">บันทึกการเปลี่ยนแปลง</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><IconHistory /> <span className="ml-2">ประวัติการสั่งซื้อล่าสุด</span></h2>
                                    {/* Mock History Data */}
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">วันที่</th>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">รายการ</th>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ราคา</th>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">สถานะ</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20 ก.ย. 2023</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">Powerball (x2)</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">300.00 ฿</td>
                                                    <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">เสร็จสมบูรณ์</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 ก.ย. 2023</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">Mega Millions (x1)</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">150.00 ฿</td>
                                                    <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">รอตรวจรางวัล</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'wallet' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div className="bg-gradient-to-br from-truva-dark to-blue-900 rounded-lg p-6 text-white shadow-lg relative overflow-hidden">
                                         <div className="absolute top-0 right-0 p-4 opacity-10"><IconWallet /></div>
                                         <p className="text-blue-200 text-sm mb-1">ยอดเงินคงเหลือ</p>
                                         <h2 className="text-3xl font-bold mb-6">1,200.00 ฿</h2>
                                         <div className="flex space-x-3">
                                             <button onClick={() => setShowDepositModal(true)} className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 rounded text-sm font-medium backdrop-blur-sm transition-colors flex items-center justify-center">
                                                 <IconPlus /> <span className="ml-1">เติมเงิน</span>
                                             </button>
                                             <button onClick={() => setShowWithdrawModal(true)} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded text-sm font-medium backdrop-blur-sm transition-colors flex items-center justify-center">
                                                 <IconBank /> <span className="ml-1">ถอนเงิน</span>
                                             </button>
                                         </div>
                                     </div>
                                     
                                     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col justify-center">
                                         <h3 className="font-bold text-gray-900 mb-2">บัญชีธนาคารที่ผูกไว้</h3>
                                         <div className="flex items-center mb-4 text-sm text-gray-600">
                                            <IconBank />
                                            <span className="ml-2">KBank •••• 1234</span>
                                         </div>
                                         <button className="text-truva-blue text-sm font-medium hover:underline flex items-center">
                                             <IconEdit /> แก้ไขบัญชี
                                         </button>
                                     </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                     <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                                        <IconHistory /> <span className="ml-2">รายการเดินบัญชีล่าสุด</span>
                                     </h3>
                                     <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">วันที่/เวลา</th>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">รายการ</th>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">สถานะ</th>
                                                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">จำนวนเงิน</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {MOCK_TRANSACTIONS.map((tx) => (
                                                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            <div className="flex items-center">
                                                                <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                                                    tx.type === 'deposit' ? 'bg-green-100 text-green-600' :
                                                                    tx.type === 'withdraw' ? 'bg-orange-100 text-orange-600' :
                                                                    tx.type === 'win' ? 'bg-yellow-100 text-yellow-600' :
                                                                    'bg-blue-100 text-blue-600'
                                                                }`}>
                                                                    {tx.type === 'deposit' && <IconArrowDown className="transform rotate-180" />}
                                                                    {tx.type === 'withdraw' && <IconArrowUp className="transform rotate-180" />}
                                                                    {tx.type === 'win' && <IconTrophy />}
                                                                    {tx.type === 'purchase' && <IconTicket />}
                                                                </span>
                                                                <div>
                                                                    <div className="font-medium">{tx.description}</div>
                                                                    <div className="text-xs text-gray-400">Ref: {tx.id}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                tx.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                            }`}>
                                                                {tx.status === 'completed' ? 'สำเร็จ' : tx.status === 'pending' ? 'รอดำเนินการ' : 'ยกเลิก'}
                                                            </span>
                                                        </td>
                                                        <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-bold ${
                                                            tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} ฿
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                     </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Wallet Modals */}
            {showDepositModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDepositModal(false)}></div>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative z-10 p-6 animate-fade-in-up">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">เติมเงินเข้ากระเป๋า</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนเงินที่ต้องการเติม</label>
                                <input type="number" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:border-truva-blue outline-none" placeholder="0.00" />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <button className="border border-gray-200 rounded py-2 text-sm hover:border-truva-blue hover:text-truva-blue text-gray-600">100</button>
                                <button className="border border-gray-200 rounded py-2 text-sm hover:border-truva-blue hover:text-truva-blue text-gray-600">500</button>
                                <button className="border border-gray-200 rounded py-2 text-sm hover:border-truva-blue hover:text-truva-blue text-gray-600">1,000</button>
                            </div>
                            <button className="w-full bg-truva-orange text-white py-3 rounded font-bold hover:bg-orange-600 mt-4">ยืนยันการเติมเงิน</button>
                            <button onClick={() => setShowDepositModal(false)} className="w-full text-gray-500 text-sm hover:text-gray-700">ยกเลิก</button>
                        </div>
                    </div>
                </div>
            )}

            {showWithdrawModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowWithdrawModal(false)}></div>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative z-10 p-6 animate-fade-in-up">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">ถอนเงิน</h3>
                        <div className="space-y-4">
                            <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-sm border border-yellow-100">
                                ยอดเงินที่ถอนได้: 1,200.00 ฿
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนเงิน</label>
                                <input type="number" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:border-truva-blue outline-none" placeholder="0.00" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">เลขบัญชีธนาคาร</label>
                                <input type="text" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:border-truva-blue outline-none" placeholder="xxx-x-xxxxx-x" />
                            </div>
                            <button className="w-full bg-truva-dark text-white py-3 rounded font-bold hover:bg-gray-800 mt-4">แจ้งถอนเงิน</button>
                            <button onClick={() => setShowWithdrawModal(false)} className="w-full text-gray-500 text-sm hover:text-gray-700">ยกเลิก</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ContactPage = () => (
    <div className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                 <h1 className="text-4xl font-extrabold text-truva-dark mb-4">ติดต่อเรา</h1>
                 <p className="text-gray-500 max-w-2xl mx-auto text-lg">ทีมงานพร้อมให้ความช่วยเหลือตลอด 24 ชั่วโมง</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                 <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                     <h3 className="text-xl font-bold text-gray-900 mb-6">ส่งข้อความถึงเรา</h3>
                     <form className="space-y-6">
                         <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">หัวข้อติดต่อ</label>
                             <select className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-truva-blue outline-none">
                                 <option>สอบถามข้อมูลทั่วไป</option>
                                 <option>แจ้งปัญหาการใช้งาน</option>
                                 <option>แจ้งปัญหาการชำระเงิน</option>
                                 <option>อื่นๆ</option>
                             </select>
                         </div>
                         <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
                             <input type="text" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-truva-blue outline-none" placeholder="ระบุชื่อจริง" />
                         </div>
                         <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                             <input type="email" className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-truva-blue outline-none" placeholder="your@email.com" />
                         </div>
                         <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">ข้อความ</label>
                             <textarea rows={4} className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-truva-blue outline-none" placeholder="รายละเอียด..."></textarea>
                         </div>
                         <button className="w-full bg-truva-orange text-white py-3 rounded font-bold hover:bg-orange-600 transition-colors shadow-md">ส่งข้อความ</button>
                     </form>
                 </div>

                 <div className="space-y-8">
                      <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4">ข้อมูลการติดต่อ</h3>
                          <ul className="space-y-4 text-gray-600">
                                <li className="flex items-start">
                                    <div className="mt-1 mr-4 text-truva-orange"><IconGlobal /></div>
                                    <div>
                                        <span className="font-bold text-gray-900 block">สำนักงานใหญ่</span>
                                        123 อาคารสาทรซิตี้ทาวเวอร์ ชั้น 10<br/>
                                        ถนนสาทรใต้ แขวงทุ่งมหาเมฆ<br/>
                                        เขตสาทร กรุงเทพฯ 10120
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="mt-1 mr-4 text-truva-orange"><IconPhone /></div>
                                    <div>
                                        <span className="font-bold text-gray-900 block">เบอร์โทรศัพท์</span>
                                        02-123-4567, 081-999-9999<br/>
                                        (ทุกวัน ตลอด 24 ชม.)
                                    </div>
                                </li>
                                 <li className="flex items-start">
                                    <div className="mt-1 mr-4 text-truva-orange"><IconMail /></div>
                                    <div>
                                        <span className="font-bold text-gray-900 block">อีเมล</span>
                                        support@truvamate.com
                                    </div>
                                </li>
                          </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                           <h4 className="font-bold text-truva-blue mb-2 flex items-center"><IconChat /> <span className="ml-2">Live Chat Support</span></h4>
                           <p className="text-sm text-gray-600 mb-4">พูดคุยกับเจ้าหน้าที่ผ่านระบบแชทสดเพื่อความรวดเร็วในการแก้ปัญหา</p>
                           <button className="text-sm font-bold text-white bg-truva-blue px-4 py-2 rounded hover:bg-blue-700">เริ่มแชทเลย</button>
                      </div>
                 </div>
            </div>
        </div>
    </div>
);

const StaticPage = ({ title, content }: { title: string, content: React.ReactNode }) => (
    <div className="min-h-screen bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-truva-dark mb-8 border-b border-gray-200 pb-4">{title}</h1>
            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-4">
                {content}
            </div>
        </div>
    </div>
);

const FloatingWidget = () => (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button className="w-14 h-14 bg-[#00C300] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform" title="Contact Line">
             <span className="font-bold text-xl">L</span>
        </button>
        <button className="w-14 h-14 bg-truva-blue rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform" title="Live Chat">
            <IconChat />
        </button>
    </div>
);

const CookieConsent = () => {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;
    
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-[60] flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up">
            <div className="flex items-start md:items-center text-sm text-gray-600 max-w-4xl">
                <div className="mr-3 mt-1 md:mt-0"><IconCookie /></div>
                <p>เว็บไซต์นี้ใช้คุกกี้เพื่อวัตถุประสงค์ในการปรับปรุงประสบการณ์ของผู้ใช้ให้ดียิ่งขึ้น ท่านสามารถศึกษารายละเอียดเพิ่มเติมได้ใน <a href="#" className="text-truva-blue underline">นโยบายความเป็นส่วนตัว</a></p>
            </div>
            <div className="flex gap-3 whitespace-nowrap">
                <button onClick={() => setVisible(false)} className="text-gray-500 hover:text-gray-700 text-sm font-medium px-4 py-2">ตั้งค่า</button>
                <button onClick={() => setVisible(false)} className="bg-truva-dark text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-800">ยอมรับทั้งหมด</button>
            </div>
        </div>
    );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [selectedGame, setSelectedGame] = useState<LotteryGame | null>(null);
  const [cart, setCart] = useState<Ticket[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleSelectGame = (game: LotteryGame) => {
    setSelectedGame(game);
    setView(AppView.SELECT_NUMBERS);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (tickets: Ticket[]) => {
    setCart([...cart, ...tickets]);
    setView(AppView.CART);
    window.scrollTo(0, 0);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(t => t.id !== id));
  };

  const handleProceedToCheckout = () => {
      if (!user) {
          setShowAuthModal(true);
      } else {
          setView(AppView.CHECKOUT);
          window.scrollTo(0, 0);
      }
  }

  const handleConfirmPayment = () => {
    setTimeout(() => {
        setCart([]);
        setView(AppView.SUCCESS);
        window.scrollTo(0, 0);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={(u) => { setUser(u); if (view === AppView.CART) setView(AppView.CHECKOUT); }} />
      <FloatingWidget />
      <CookieConsent />

      {view !== AppView.SUCCESS && (
          <>
            <TopBar onLoginClick={() => setShowAuthModal(true)} user={user} onViewChange={setView} />
            <Navbar cartCount={cart.length} onViewChange={setView} onLoginClick={() => setShowAuthModal(true)} user={user} />
          </>
      )}
      
      <main className="flex-grow">
        {view === AppView.HOME && (
          <>
            <BannerSlider onViewChange={setView} />
            <StatsBar />
            <LiveJackpotTable onSelectGame={handleSelectGame} />
            <Features />
            <GameList onSelectGame={handleSelectGame} />
            <Process />
            <UserReviews />
            <FAQSection onViewChange={setView} />
            <CTABanner onLoginClick={() => setShowAuthModal(true)} />
            <BlogSection onViewChange={setView} />
          </>
        )}

        {view === AppView.RESULTS && (
           <ResultsPage onViewChange={setView} />
        )}

        {view === AppView.SELECT_NUMBERS && selectedGame && (
          <NumberSelector 
            game={selectedGame} 
            onBack={() => setView(AppView.HOME)}
            onAddToCart={handleAddToCart}
          />
        )}

        {view === AppView.CART && (
          <Cart 
            tickets={cart} 
            onRemove={handleRemoveFromCart}
            onCheckout={handleProceedToCheckout}
            onBack={() => setView(AppView.HOME)}
          />
        )}

        {view === AppView.CHECKOUT && (
            <CheckoutPage 
                tickets={cart}
                onConfirmPayment={handleConfirmPayment}
                onBack={() => setView(AppView.CART)}
            />
        )}

        {view === AppView.SUCCESS && (
            <Success onReset={() => setView(AppView.HOME)} />
        )}

        {view === AppView.DASHBOARD && user && (
            <UserDashboard user={user} onLogout={() => { setUser(null); setView(AppView.HOME); }} />
        )}

        {view === AppView.CONTACT && <ContactPage />}
        
        {view === AppView.TERMS && (
             <StaticPage title="เงื่อนไขการให้บริการ" content={
                 <>
                    <p>ยินดีต้อนรับสู่ Truvamate โปรดอ่านเงื่อนไขการให้บริการเหล่านี้อย่างละเอียดก่อนใช้บริการของเรา</p>
                    <h3 className="text-lg font-bold text-gray-800 mt-4">1. การยอมรับข้อตกลง</h3>
                    <p>การเข้าถึงหรือใช้งานเว็บไซต์นี้แสดงว่าท่านยอมรับที่จะปฏิบัติตามและผูกพันตามข้อกำหนดและเงื่อนไขเหล่านี้</p>
                    <h3 className="text-lg font-bold text-gray-800 mt-4">2. บริการของเรา</h3>
                    <p>Truvamate ให้บริการเป็นตัวแทนในการสั่งซื้อล็อตเตอรี่ถูกกฎหมายจากต่างประเทศ เราไม่ใช่ผู้จัดการพนันและไม่มีส่วนได้ส่วนเสียกับผลรางวัล</p>
                    <h3 className="text-lg font-bold text-gray-800 mt-4">3. การชำระเงินและการคืนเงิน</h3>
                    <p>การชำระเงินทั้งหมดถือเป็นที่สิ้นสุด เมื่อมีการซื้อตั๋วแล้วจะไม่สามารถยกเลิกหรือขอคืนเงินได้ ยกเว้นในกรณีที่ระบบเกิดข้อผิดพลาดและไม่ได้ทำการซื้อตั๋วจริง</p>
                 </>
             } />
        )}

        {view === AppView.PRIVACY && (
             <StaticPage title="นโยบายความเป็นส่วนตัว" content={
                 <>
                    <p>Truvamate ให้ความสำคัญกับความเป็นส่วนตัวของท่าน นโยบายนี้อธิบายถึงวิธีการที่เราเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของท่าน</p>
                    <h3 className="text-lg font-bold text-gray-800 mt-4">1. ข้อมูลที่เราเก็บรวบรวม</h3>
                    <p>เราเก็บรวบรวมข้อมูลที่ท่านให้โดยตรง เช่น ชื่อ อีเมล เบอร์โทรศัพท์ และข้อมูลการชำระเงิน</p>
                    <h3 className="text-lg font-bold text-gray-800 mt-4">2. การใช้ข้อมูล</h3>
                    <p>เราใช้ข้อมูลของท่านเพื่อให้บริการ ดำเนินการตามคำสั่งซื้อ และแจ้งผลรางวัลแก่ท่าน</p>
                    <h3 className="text-lg font-bold text-gray-800 mt-4">3. ความปลอดภัยของข้อมูล</h3>
                    <p>เราใช้มาตรการความปลอดภัยมาตรฐานสากลเพื่อปกป้องข้อมูลของท่านจากการเข้าถึงโดยไม่ได้รับอนุญาต</p>
                 </>
             } />
        )}

        {view === AppView.HELP && (
            <StaticPage title="ศูนย์ช่วยเหลือ" content={
                <>
                    <p className="text-lg">หากคุณต้องการความช่วยเหลือ ทีมงาน Truvamate พร้อมให้บริการคุณตลอด 24 ชั่วโมง</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="border p-6 rounded-lg bg-gray-50">
                            <h3 className="font-bold text-xl mb-2 flex items-center"><IconQuestion /> <span className="ml-2">คำถามที่พบบ่อย</span></h3>
                            <p className="mb-4 text-sm">ค้นหาคำตอบสำหรับคำถามยอดฮิตเกี่ยวกับการใช้งาน การฝากเงิน และการรับรางวัล</p>
                            <button onClick={() => setView(AppView.HOME)} className="text-truva-blue font-bold hover:underline">ไปที่ FAQ</button>
                        </div>
                        <div className="border p-6 rounded-lg bg-gray-50">
                            <h3 className="font-bold text-xl mb-2 flex items-center"><IconMail /> <span className="ml-2">ติดต่อทีมสนับสนุน</span></h3>
                            <p className="mb-4 text-sm">ส่งข้อความหาเราโดยตรง หากคุณไม่พบคำตอบที่ต้องการ</p>
                            <button onClick={() => setView(AppView.CONTACT)} className="text-truva-blue font-bold hover:underline">ติดต่อเรา</button>
                        </div>
                    </div>
                </>
            } />
        )}

      </main>

      {view !== AppView.SUCCESS && view !== AppView.SELECT_NUMBERS && <Footer onViewChange={setView} />}
      {view === AppView.SELECT_NUMBERS && <div className="hidden md:block"><Footer onViewChange={setView} /></div>}
    </div>
  );
};

export default App;
