import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Check, Snowflake, Coffee, Instagram, 
  ArrowRight, ArrowDown, Map, Shield, Zap, Star, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdventurePlanner from './components/AdventurePlanner';
import { generateHeroImage } from './services/imageService';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);
  const [isGeneratingHero, setIsGeneratingHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const initHero = async () => {
      try {
        const url = await generateHeroImage();
        if (url) setHeroImageUrl(url);
      } catch (err) {
        console.error("Hero generation failed", err);
      } finally {
        setIsGeneratingHero(false);
      }
    };
    initHero();
  }, []);

  const navLinks = [
    { label: 'The Experience', href: '#experience' },
    { label: 'The Van', href: '#van' },
    { label: 'The Suite', href: '#stay' },
    { label: 'Trip Planner', href: '#ai-planner' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
  };

  const stagger = {
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-gold selection:text-brand-darker">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 py-4 px-6 lg:px-12 border-b ${
        isScrolled ? 'bg-brand-darker/95 backdrop-blur-xl border-white/10 py-3 shadow-2xl' : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.a 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            href="#" 
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 text-brand-green transition-transform group-hover:scale-110 duration-500 drop-shadow-[0_0_12px_rgba(46,139,87,0.4)]">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="50" cy="50" r="48" stroke="currentColor" stroke-width="2"/>
                <path d="M50 20L85 80H15L50 20Z" fill="currentColor"/>
                <path d="M50 25L55 45L45 55L52 70L48 80" stroke="#020617" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold tracking-wider leading-none text-white">BearBnB</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-brand-gold font-bold">Premier Reno</span>
            </div>
          </motion.a>

          <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-gray-400">
            {navLinks.map((link, idx) => (
              <motion.a 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={link.href} 
                href={link.href} 
                className="hover:text-brand-gold transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <a 
              href="https://www.outdoorsy.com/rv-rental/reno_nv/2012_mercedes-benz_sprinter_434747-listing" 
              target="_blank" 
              className="btn-3d-luxury px-8 py-3 rounded-full font-bold text-white text-sm"
            >
              Reserve Now
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-brand-darker flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-8 right-8 text-white" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-10 h-10" />
            </button>
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif text-white hover:text-brand-gold">{link.label}</a>
            ))}
            <a href="https://www.outdoorsy.com/rv-rental/reno_nv/2012_mercedes-benz_sprinter_434747-listing" className="btn-3d-luxury px-12 py-5 rounded-full font-bold text-xl text-white">Book Now</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-brand-darker">
          {heroImageUrl ? (
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={heroImageUrl} 
              alt="Luxury Sprinter Fireside in Sierra Mountains" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col gap-6 text-gray-500">
               <motion.div 
                 animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="relative"
               >
                 <div className="absolute inset-0 bg-brand-gold/10 blur-2xl rounded-full"></div>
                 <Sparkles className="w-16 h-16 text-brand-gold/40 relative z-10" />
               </motion.div>
               <motion.span 
                 animate={{ opacity: [0.3, 0.6, 0.3] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="text-[10px] tracking-[0.4em] font-black uppercase"
               >
                 Visualizing Your Adventure...
               </motion.span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-darker/20 via-brand-darker/60 to-brand-darker"></div>
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block text-brand-gold uppercase tracking-[0.4em] text-xs mb-8 font-black bg-white/5 px-6 py-2 rounded-full border border-brand-gold/20 backdrop-blur-md"
          >
            The Ultimate High Sierra Basecamp
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold leading-[1.05] mb-8 text-white drop-shadow-2xl"
          >
            Luxury Roaming.<br/>
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-brand-sage via-brand-green to-brand-gold">Absolute Freedom.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-2xl mx-auto text-gray-300 text-lg md:text-2xl mb-14 font-light leading-relaxed"
          >
            Premium Mercedes-Benz Sprinter rentals and bespoke private suites, perfectly positioned for your Tahoe & Yosemite escapes.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <a href="https://www.outdoorsy.com/rv-rental/reno_nv/2012_mercedes-benz_sprinter_434747-listing" target="_blank" className="btn-3d-luxury w-full sm:w-auto px-14 py-6 rounded-full font-bold text-lg text-white">
              Check Availability
            </a>
            <a href="#van" className="w-full sm:w-auto px-14 py-6 border border-white/20 rounded-full font-bold text-lg hover:bg-white/5 backdrop-blur-sm transition-all text-white hover:border-brand-gold/50">
              Explore The Beast
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </header>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 md:px-12 bg-brand-darker relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-green/5 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeInUp} className="relative group">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl"></div>
             <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1627252204940-d99f92e850b9?q=80&w=2970&auto=format&fit=crop" 
                  alt="Cozy Van Interior" 
                  className="w-full h-[650px] object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-0 inset-x-0 p-12">
                  <p className="font-serif italic text-3xl text-brand-gold">"The ultimate basecamp for the modern explorer."</p>
                </div>
             </div>
          </motion.div>
          
          <motion.div {...fadeInUp} className="space-y-10">
            <div className="w-24 h-1.5 bg-brand-gold rounded-full"></div>
            <h2 className="font-serif text-5xl md:text-7xl text-white leading-[1.05]">
              Hibernate in Style.<br/>
              <span className="text-brand-sage italic">Roam with Purpose.</span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed">
              Experience the High Sierra without compromise. We combine the agility of a Mercedes adventure rig with the hospitality of a boutique hotel.
            </p>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { icon: Map, title: "Curated Trails", desc: "Expert navigation for High Sierra's hidden gems." },
                { icon: Shield, title: "Luxury Gear", desc: "Premium linens and professional-grade culinary tools." },
                { icon: Zap, title: "Off-Grid Power", desc: "300W Solar and high-capacity lithium storage." },
                { icon: Star, title: "Elite Service", desc: "Seamless airport concierge and gear staging." }
              ].map((item, idx) => (
                <motion.div variants={fadeInUp} key={idx} className="space-y-3 group">
                  <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-darker transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em]">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Van Specs */}
      <section id="van" className="py-32 px-6 bg-brand-dark border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 inline-block">The Vehicle</span>
            <h2 className="font-serif text-5xl md:text-8xl mb-6">"The Beast"</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">A 2012 Mercedes-Benz Sprinter 170" Extended. A masterpiece of engineering and comfort.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 rounded-[2.5rem] overflow-hidden relative group shadow-2xl border border-white/5"
            >
              <img 
                src="https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=2787&auto=format&fit=crop" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                alt="Van exterior"
              />
              <div className="absolute inset-0 bg-brand-darker/20"></div>
              <div className="absolute top-10 right-10 flex gap-4">
                 <div className="glass-card px-4 py-2 rounded-full text-xs font-bold text-white flex items-center gap-2">
                   <Snowflake className="w-4 h-4 text-cyan-400" /> Winter Spec
                 </div>
                 <div className="glass-card px-4 py-2 rounded-full text-xs font-bold text-white flex items-center gap-2">
                   <Zap className="w-4 h-4 text-yellow-400" /> Solar Powered
                 </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={stagger}
              className="space-y-8 flex flex-col justify-between"
            >
              {[
                { title: "Living Quarters", points: ["Queen Memory Foam", "Swivel Pilot Seating", "Custom Ambient Lighting"] },
                { title: "Gourmet Galley", points: ["Induction Range", "70L Vitrifrigo Fridge", "Deep Slate Sink"] },
                { title: "Extreme Climate", points: ["Espar S2 Diesel Heater", "Full Arctic Insulation", "MaxxAir Deluxe"] }
              ].map((cat, i) => (
                <motion.div 
                  variants={fadeInUp} 
                  key={i} 
                  className="glass-card p-10 rounded-[2rem] hover:border-brand-gold/30 transition-colors"
                >
                  <h3 className="font-serif text-2xl text-brand-gold mb-6">{cat.title}</h3>
                  <ul className="space-y-4">
                    {cat.points.map((p, j) => (
                      <li key={j} className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-brand-green"></div> {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Planner Section */}
      <AdventurePlanner />

      {/* The Suite (Apartment) */}
      <section id="stay" className="py-40 px-6 relative overflow-hidden bg-brand-darker">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-brand-green/10 blur-[150px] rounded-full"
        ></motion.div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeInUp}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-[11px] font-black uppercase tracking-[0.3em] mb-8 border border-brand-gold/20">Optional Luxury Base</span>
            <h2 className="font-serif text-5xl md:text-7xl mb-10 text-white">The "Bear Den" Suite</h2>
            <p className="text-gray-400 text-xl md:text-2xl leading-relaxed mb-16 font-light">
              Transition seamlessly. Our modern private suite in Reno's historic Old Southwest serves as your pre-departure staging ground or post-adventure sanctuary.
            </p>
            <button className="btn-3d-luxury px-12 py-5 rounded-full font-bold text-lg text-white">
              Inquire About The Den
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-32 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 text-brand-green">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="50" cy="50" r="48" stroke="currentColor" stroke-width="2"/>
                    <path d="M50 20L85 80H15L50 20Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-white tracking-tight">BearBnB Reno</span>
              </div>
              <p className="text-gray-500 max-w-md text-lg leading-relaxed">
                Elevated adventure rentals. Locally owned, precision-crafted, and deeply connected to the High Sierra spirit.
              </p>
              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:text-brand-gold hover:border-brand-gold/50 transition-all">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.3em]">Navigation</h4>
              <ul className="space-y-5 text-gray-500 text-sm font-medium">
                {navLinks.map(link => (
                  <li key={link.href}><a href={link.href} className="hover:text-brand-gold transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.3em]">Legal</h4>
              <ul className="space-y-5 text-gray-500 text-sm font-medium">
                <li><a href="#" className="hover:text-brand-gold transition-colors">Terms of Adventure</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Rental Policies</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Privacy Concierge</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-600 font-bold uppercase tracking-widest">
            <p>© 2024 BearBnB Reno Luxury Rentals.</p>
            <p className="flex items-center gap-2">Built for the High Sierra <Star className="w-3 h-3 text-brand-gold" /></p>
          </div>
        </div>
      </footer>

      {/* Persistent CTA (Mobile) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-md z-40 md:hidden"
      >
        <a 
          href="https://www.outdoorsy.com/rv-rental/reno_nv/2012_mercedes-benz_sprinter_434747-listing"
          target="_blank"
          className="btn-3d-luxury flex items-center justify-between p-5 rounded-2xl shadow-2xl text-white font-bold"
        >
          <span className="text-lg">Reserve Your Beast</span>
          <ArrowRight className="w-6 h-6" />
        </a>
      </motion.div>
    </div>
  );
};

export default App;