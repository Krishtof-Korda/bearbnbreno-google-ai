import React, { useState } from 'react';
import { Sparkles, MapPin, Calendar, Compass, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateItinerary } from '../services/geminiService';
import { ItineraryResponse } from '../types';

const AdventurePlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [days, setDays] = useState(3);
  const [activity, setActivity] = useState('Snowboarding & Hot Springs');
  const [season, setSeason] = useState('Winter');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateItinerary(days, activity, season);
      setItinerary(result);
    } catch (error) {
      console.error("Failed to generate itinerary:", error);
      alert("Something went wrong. The mountain spirits are quiet right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-planner" className="py-32 px-6 bg-brand-darker relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3 h-3" />
            Concierge AI
          </div>
          <h2 className="font-serif text-5xl md:text-7xl mb-8 text-white">Your Personal Navigator</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Allow our intelligence engine to craft your custom High Sierra voyage. Designed for "The Beast," tailored for you.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-10 md:p-14 rounded-[3rem] shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">Expedition Duration</label>
              <div className="flex items-center gap-4 bg-brand-darker/50 border border-white/10 rounded-2xl px-5 py-4 hover:border-brand-gold/40 transition-colors">
                <Calendar className="w-5 h-5 text-brand-gold" />
                <select 
                  value={days} 
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="bg-transparent text-white w-full outline-none text-base font-medium appearance-none"
                >
                  {[2, 3, 5, 7, 10].map(d => <option key={d} value={d} className="bg-brand-darker">{d} Days</option>)}
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">Expedition Focus</label>
              <div className="flex items-center gap-4 bg-brand-darker/50 border border-white/10 rounded-2xl px-5 py-4 hover:border-brand-gold/40 transition-colors">
                <Compass className="w-5 h-5 text-brand-gold" />
                <input 
                  type="text" 
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  placeholder="Alpine Lakes, Skiing..."
                  className="bg-transparent text-white w-full outline-none text-base font-medium placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">Seasonal Context</label>
              <div className="flex items-center gap-4 bg-brand-darker/50 border border-white/10 rounded-2xl px-5 py-4 hover:border-brand-gold/40 transition-colors">
                <MapPin className="w-5 h-5 text-brand-gold" />
                <select 
                  value={season} 
                  onChange={(e) => setSeason(e.target.value)}
                  className="bg-transparent text-white w-full outline-none text-base font-medium appearance-none"
                >
                  {['Winter', 'Spring', 'Summer', 'Autumn'].map(s => <option key={s} value={s} className="bg-brand-darker">{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="btn-3d-luxury w-full py-6 rounded-2xl font-black text-white text-lg tracking-widest flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
            {loading ? 'CALCULATING VOYAGE...' : 'CRAFT MY ITINERARY'}
          </button>

          {itinerary && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-16 space-y-12 overflow-hidden"
            >
              <div className="border-t border-white/10 pt-12">
                <h3 className="font-serif text-4xl md:text-5xl mb-10 text-brand-gold">{itinerary.title}</h3>
                <div className="space-y-10">
                  {itinerary.days.map((day) => (
                    <div key={day.day} className="flex gap-8 group">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-2xl border-2 border-brand-gold/50 flex items-center justify-center font-serif text-2xl text-brand-gold bg-brand-gold/5 shrink-0 shadow-lg shadow-brand-gold/10">
                          {day.day}
                        </div>
                        <div className="w-px h-full bg-gradient-to-b from-brand-gold/30 to-transparent mt-4"></div>
                      </div>
                      <div className="pb-10">
                        <h4 className="font-bold text-2xl mb-4 text-white">{day.activity}</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {day.highlights.map((h, i) => (
                            <li key={i} className="text-gray-400 flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 mt-2 shrink-0"></span>
                              <span className="text-lg font-light leading-relaxed">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-brand-gold/5 border border-brand-gold/20 p-10 rounded-[2rem]"
              >
                <h4 className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] mb-6">Concierge Pro-Tips</h4>
                <ul className="space-y-4">
                  {itinerary.tips.map((tip, i) => (
                    <li key={i} className="text-lg text-gray-300 flex items-start gap-4 italic font-light">
                      <span className="text-brand-gold">•</span> {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AdventurePlanner;