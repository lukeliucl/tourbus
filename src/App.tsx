/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bus, 
  MapPin, 
  Search, 
  Calendar, 
  Users, 
  ChevronRight, 
  Menu, 
  X, 
  Mountain, 
  Waves, 
  Utensils, 
  Camera,
  ArrowRight,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Info
} from 'lucide-react';

// --- Types ---
interface Route {
  id: string;
  title: string;
  location: string;
  image: string;
  category: string;
  price: string;
  duration: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

// --- Constants ---
const CATEGORIES: Category[] = [
  { id: 'nature', name: '自然景致', icon: <Mountain size={24} />, color: 'bg-emerald-500' },
  { id: 'culture', name: '文化體驗', icon: <Camera size={24} />, color: 'bg-orange-500' },
  { id: 'culinary', name: '美食探索', icon: <Utensils size={24} />, color: 'bg-rose-500' },
  { id: 'coastline', name: '藍波海岸', icon: <Waves size={24} />, color: 'bg-blue-500' },
];

const ROUTES: Route[] = [
  {
    id: '1',
    title: '太魯閣峽谷幽境一日遊',
    location: '花蓮 Hualien',
    image: 'https://images.unsplash.com/photo-1549413204-68fce0d627c2?auto=format&fit=crop&q=80&w=800',
    category: 'nature',
    price: 'NT$ 1,500',
    duration: '10小時'
  },
  {
    id: '2',
    title: '阿里山雲海森林鐵道之旅',
    location: '嘉義 Chiayi',
    image: 'https://images.unsplash.com/photo-1528642463366-83ca6d8dd936?auto=format&fit=crop&q=80&w=800',
    category: 'nature',
    price: 'NT$ 1,800',
    duration: '12小時'
  },
  {
    id: '3',
    title: '日月潭湖畔與原民文化',
    location: '南投 Nantou',
    image: 'https://images.unsplash.com/photo-1571295982548-520e588ad177?auto=format&fit=crop&q=80&w=800',
    category: 'culture',
    price: 'NT$ 1,200',
    duration: '8小時'
  },
  {
    id: '4',
    title: '九份老街與東北角海岸',
    location: '新北 New Taipei',
    image: 'https://images.unsplash.com/photo-1538356111053-748a48e1acb8?auto=format&fit=crop&q=80&w=800',
    category: 'coastline',
    price: 'NT$ 1,000',
    duration: '9小時'
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-md py-3 text-gray-900' : 'bg-transparent py-6 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full ${isScrolled ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-600'}`}>
            <Bus size={24} />
          </div>
          <span className="font-sans font-bold text-xl tracking-tight">
            台灣觀巴 <span className="font-light opacity-80">TAIWAN TOUR BUS</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-sans font-medium text-sm">
          <a href="#" className="hover:opacity-60 transition-opacity">熱門行程</a>
          <a href="#" className="hover:opacity-60 transition-opacity">路線分類</a>
          <a href="#" className="hover:opacity-60 transition-opacity">乘車指南</a>
          <a href="#" className="hover:opacity-60 transition-opacity">關於我們</a>
          <button className={`px-5 py-2 rounded-full transition-all ${
            isScrolled ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-white text-emerald-600 hover:bg-gray-100'
          }`}>
            預約行程
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white text-gray-900 shadow-xl border-t border-gray-100 md:hidden flex flex-col p-6 gap-6 font-sans font-medium"
          >
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>熱門行程</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>路線分類</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>乘車指南</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>關於我們</a>
            <button className="bg-emerald-600 text-white py-3 rounded-xl">預約行程</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Immersive Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover scale-105" // slight scale to prevent edges
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-landscape-of-mountains-with-a-river-in-front-4660-large.mp4" type="video/mp4" />
        </video>
        {/* Dynamic Gradient Overlay for better readability without losing immersion */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-[0.3em] uppercase mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              探索全台精彩日常
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-black text-white mb-6 leading-tight drop-shadow-2xl">
              深度台灣<br/>
              <span className="italic text-emerald-400">感動</span> 在每一站
            </h1>
            
            <p className="text-lg md:text-2xl text-white/90 font-light mb-12 max-w-2xl leading-relaxed drop-shadow-md">
              不必擔心開車勞累，跟著「台灣觀巴」深入私房景點。<br className="hidden md:block"/>
              一人成行，即刻開啟您的優質深度旅程。
            </p>

            {/* Elevated Search Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full max-w-screen-md bg-white/10 backdrop-blur-2xl p-2 rounded-[32px] border border-white/20 shadow-2xl flex flex-col md:flex-row items-stretch gap-2"
            >
              <div className="flex-[1.5] group flex items-center gap-4 px-6 py-4 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                <MapPin className="text-emerald-400" size={24} />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-400/80 mb-0.5">Destination</div>
                  <input 
                    type="text" 
                    placeholder="你想去哪裡？" 
                    className="bg-transparent border-none p-0 text-white placeholder-white/40 focus:ring-0 w-full text-base font-semibold"
                  />
                </div>
              </div>
              
              <div className="flex-1 flex items-center gap-4 px-6 py-4 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 cursor-pointer">
                <Calendar className="text-emerald-400" size={24} />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-400/80 mb-0.5">Travel Date</div>
                  <div className="text-white font-semibold whitespace-nowrap">選擇日期</div>
                </div>
              </div>

              <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-8 py-4 rounded-[24px] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 active:scale-[0.98]">
                <Search size={22} strokeWidth={3} />
                探索行程
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute right-10 bottom-20 hidden xl:flex flex-col gap-4 text-white">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-white/30"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll Down</span>
          <div className="flex flex-col gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CategorySection = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-gray-900 mb-4 italic">
              主題路線分類
            </h2>
            <p className="text-gray-500 max-w-lg">
              根據您的喜好選擇旅遊主題，從山林漫步到都會探險，每一條路線都有獨特的故事。
            </p>
          </div>
          <button className="group flex items-center gap-2 text-emerald-600 font-bold hover:gap-4 transition-all">
            查看所有分類 <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 group cursor-pointer hover:shadow-xl transition-all"
            >
              <div className={`${cat.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                深入台灣的心臟，體驗最地道的{cat.name.replace('體驗', '').replace('景致', '')}之美。
              </p>
              <div className="flex items-center gap-1 text-gray-300 group-hover:text-emerald-500 transition-colors">
                <span className="text-xs font-bold uppercase tracking-widest">Explore</span>
                <ChevronRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RouteCard = ({ route }: { route: Route }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={route.image} 
          alt={route.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-600 shadow-sm">
            {route.location}
          </span>
        </div>
        <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-emerald-600">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Featured Tour</span>
          <div className="h-[1px] flex-1 bg-gray-100"></div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
          {route.title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-emerald-500" />
            <span>每天出發</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-emerald-500" />
            <span>1人成行</span>
          </div>
        </div>
        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block mb-0.5">預訂價起</span>
            <span className="text-lg font-bold text-emerald-600">{route.price}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-400 block mb-0.5">行程時間</span>
            <span className="font-medium text-gray-700">{route.duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-sans font-bold text-gray-900 mb-6 italic">
          人氣精選行程
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          由旅遊專家為您推薦的全台最受歡迎路線，帶您輕鬆遊歷台灣的每一處驚艷美景。
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {ROUTES.map((route, index) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <RouteCard route={route} />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-emerald-600 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
          探索更多精彩行程
        </button>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 bg-emerald-950 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-5xl font-mono font-bold mb-2 text-emerald-400">100+</div>
            <div className="text-sm font-sans font-medium uppercase tracking-[0.2em] opacity-60">精選路線</div>
          </div>
          <div>
            <div className="text-5xl font-mono font-bold mb-2 text-emerald-400">1M+</div>
            <div className="text-sm font-sans font-medium uppercase tracking-[0.2em] opacity-60">滿意旅客</div>
          </div>
          <div>
            <div className="text-5xl font-mono font-bold mb-2 text-emerald-400">24/7</div>
            <div className="text-sm font-sans font-medium uppercase tracking-[0.2em] opacity-60">客戶支援</div>
          </div>
          <div>
            <div className="text-5xl font-mono font-bold mb-2 text-emerald-400">98%</div>
            <div className="text-sm font-sans font-medium uppercase tracking-[0.2em] opacity-60">好評推薦</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-gray-400">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8 text-white">
              <div className="p-2 rounded-full bg-emerald-600">
                <Bus size={20} />
              </div>
              <span className="font-bold text-lg">台灣觀巴</span>
            </div>
            <p className="text-sm leading-relaxed mb-8">
              我們致力於提供最高品質的巴士旅遊服務，讓每一位來到台灣的旅客都能感受到這座島嶼的人情與魅力。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 transition-all text-white">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 transition-all text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 transition-all text-white">
                <Globe size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">快速連結</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">最新優惠行程</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">如何預約行程</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">常見問題解答</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">導遊與車隊</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">旅遊主題</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">花東大山大海之旅</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">中橫峽谷探秘之旅</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">南台灣熱情陽光之旅</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">台北城市風情之旅</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">聯絡我們</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex gap-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>+886 2 2349-1500 (24H)</span>
              </li>
              <li className="flex gap-3">
                <Info size={18} className="text-emerald-500 shrink-0" />
                <span>台北市松山區南京東路四段2號</span>
              </li>
              <li className="flex gap-3">
                <Globe size={18} className="text-emerald-500 shrink-0" />
                <span>service@taiwantourbus.tw</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-gray-600">
          <div>© 2026 TAIWAN TOUR BUS. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-emerald-500">隱私權政策</a>
            <a href="#" className="hover:text-emerald-500">服務條款</a>
            <a href="#" className="hover:text-emerald-500">交通部觀光署</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <CategorySection />
        <FeaturedSection />
        <StatsSection />
        
        {/* Call to Action Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-emerald-600 rounded-[64px] p-8 md:p-24 text-white relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 left-0 w-full h-full">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
                  className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                  alt="Background"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 max-w-2xl"
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-8 italic">準備好開啟<br/>下一個精彩旅程了嗎？</h2>
                <p className="text-lg md:text-xl opacity-90 mb-12">
                  現在預訂即可享有早鳥優惠，帶上您的家人，和我們一起探索台灣最深處的秘密美景。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-emerald-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                     立即預約 <ArrowRight size={20} />
                  </button>
                  <button className="bg-emerald-700/50 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-700/80 transition-all">
                    了解更多優惠
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
