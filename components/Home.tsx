
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageView, Project, ContactInfo, ContactItem } from '../types';
import { Phone, MessageCircle, Upload, Image as ImageIcon, Settings, X, Save } from 'lucide-react';

interface HomeProps {
  setPage: (page: PageView) => void;
  projects: Project[];
  bgImage: string;
  setBgImage: (url: string) => void;
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
}

// Custom Icon Components
const XiaoHongShuIcon = () => (
    <svg viewBox="0 0 1024 1024" className="w-5 h-5 fill-current" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m0 918.4c-224.4 0-406.4-182-406.4-406.4S287.6 105.6 512 105.6s406.4 182 406.4 406.4-182 406.4-406.4 406.4z" fillOpacity=".1"/><path d="M228.4 451.2c0-57.6 42.8-103.2 99.6-112.4 8-1.2 14.8-1.6 22-1.6 30 0 58.4 11.2 80 29.6 4.8 4 9.2 8.4 13.6 13.2 21.6 22.8 54.4 78 68.4 116 14-38 46.8-93.2 68.4-116 4.4-4.8 8.8-8.8 13.6-13.2 21.6-18.4 50-29.6 80-29.6 7.2 0 14.4 0.4 22 1.6 56.4 9.2 99.6 54.8 99.6 112.4 0 50.4-33.2 92.4-78.4 107.2-7.2 2.4-14.8 4-22.4 4.8-11.2 1.2-22.4 0-33.2-2-19.6-3.6-43.2-12.8-60-23.2-18-11.2-31.2-24.8-43.6-38.4-2.8-2.8-5.2-6-7.6-8.8-12.8-15.6-26-37.6-34.8-56-1.6-3.6-3.2-7.2-4.8-10.8-1.6 3.6-3.2 7.2-4.8 10.8-8.8 18.4-22 40.4-34.8 56-2.4 2.8-4.8 6-7.6 8.8-12.4 13.6-25.6 27.2-43.6 38.4-16.8 10.4-40.4 19.6-60 23.2-10.8 2-22 3.2-33.2 2-7.6-0.8-15.2-2.4-22.4-4.8-45.6-14.8-78.8-56.8-78.8-107.2z" /></svg>
);

const Home: React.FC<HomeProps> = ({ setPage, projects, bgImage, setBgImage, contactInfo, setContactInfo }) => {
  const recentWorks = projects.slice(0, 2);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // State for Contact Popups
  const [hoveredContact, setHoveredContact] = useState<keyof ContactInfo | null>(null);
  
  // State for Edit Contact Modal
  const [isEditContactOpen, setIsEditContactOpen] = useState(false);
  const [editingContacts, setEditingContacts] = useState<ContactInfo>(contactInfo);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isVideo = (url: string) => {
      return url.startsWith('data:video') || url.endsWith('.mp4') || url.endsWith('.webm');
  };

  const handleVideoHover = () => {
      if (videoRef.current) {
          videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
      }
  };

  const handleVideoLeave = () => {
      if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
      }
  };

  const saveContacts = () => {
      setContactInfo(editingContacts);
      setIsEditContactOpen(false);
  };

  const updateContactItem = (key: keyof ContactInfo, field: keyof ContactItem, value: string) => {
      setEditingContacts(prev => ({
          ...prev,
          [key]: {
              ...prev[key],
              [field]: value
          }
      }));
  };

  const handleContactImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: keyof ContactInfo) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              updateContactItem(key, 'value', reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center z-10 overflow-hidden">
      
      {/* Background Frame */}
      <div className="absolute top-28 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 bottom-0 z-0 rounded-t-3xl overflow-hidden border-t border-x border-white/5 bg-neutral-900/50 group">
         {/* Background Media */}
         <motion.div 
            className="absolute inset-0 w-full h-full"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
         >
             {bgImage && (
                 isVideo(bgImage) ? (
                    <video 
                        ref={videoRef}
                        src={bgImage} 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover opacity-50 blur-[2px] group-hover:opacity-100 group-hover:blur-0 transition-all duration-700"
                        onMouseEnter={handleVideoHover}
                        onMouseLeave={handleVideoLeave}
                        style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
                    />
                 ) : (
                    <img 
                        src={bgImage} 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-50 blur-[2px] group-hover:opacity-100 group-hover:blur-0 transition-all duration-700"
                        style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
                    />
                 )
             )}
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 pointer-events-none" />
             
             {/* Hover Light Motion Effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-[2s] ease-in-out pointer-events-none" />
         </motion.div>

         {/* Upload Button */}
         <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-6 right-6 p-3 bg-black/40 hover:bg-neon-blue hover:text-black text-white/50 hover:text-black rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 z-30"
            title="Change Background (Image or Video)"
         >
            <ImageIcon size={20} />
         </button>
         <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*,video/*" 
            onChange={handleFileChange}
         />
      </div>

      {/* Contact Icons - Top Left */}
      <div className="absolute top-24 left-10 md:left-16 lg:left-20 flex flex-col gap-6 z-30">
        
        {/* Render Contact Button Helper */}
        {(['xiaohongshu', 'wechat', 'phone'] as const).map((key) => (
            <div 
                key={key} 
                className="relative flex items-center"
                onMouseEnter={() => setHoveredContact(key)}
                onMouseLeave={() => setHoveredContact(null)}
            >
                <div className="w-10 h-10 rounded-full border border-neutral-700 bg-black/40 flex items-center justify-center hover:bg-white hover:text-black transition-all hover:scale-110 cursor-pointer backdrop-blur-md z-20">
                    {key === 'xiaohongshu' && <XiaoHongShuIcon />}
                    {key === 'wechat' && <MessageCircle size={18} />}
                    {key === 'phone' && <Phone size={18} />}
                </div>

                {/* Popup Content */}
                <AnimatePresence>
                    {hoveredContact === key && (
                        <motion.div
                            initial={{ opacity: 0, x: -10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 12, scale: 1 }}
                            exit={{ opacity: 0, x: -10, scale: 0.9 }}
                            className="absolute left-full top-0 h-full flex items-center ml-4 z-10"
                        >
                            <div className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 p-4 rounded-xl shadow-2xl min-w-[200px] flex flex-col items-center justify-center text-center">
                                {contactInfo[key].type === 'image' ? (
                                    <img src={contactInfo[key].value} alt={key} className="w-32 h-32 object-contain rounded-lg" />
                                ) : (
                                    <span className="text-white text-sm font-medium whitespace-nowrap px-2">{contactInfo[key].value}</span>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        ))}
        
        {/* Edit Contacts Button */}
        <button 
            onClick={() => setIsEditContactOpen(true)}
            className="w-10 h-10 rounded-full border border-neutral-800 bg-black/20 flex items-center justify-center text-neutral-600 hover:text-white hover:bg-neutral-800 transition-all mt-4"
            title="Edit Contact Info"
        >
            <Settings size={14} />
        </button>
      </div>

      {/* Contact Editor Modal */}
      <AnimatePresence>
          {isEditContactOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              >
                  <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl">
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-display font-bold">Edit Contact Info</h3>
                          <button onClick={() => setIsEditContactOpen(false)}><X /></button>
                      </div>

                      <div className="space-y-6">
                          {(['xiaohongshu', 'wechat', 'phone'] as const).map(key => (
                              <div key={key} className="space-y-2 pb-4 border-b border-neutral-800 last:border-0">
                                  <label className="text-xs uppercase text-neutral-500 font-bold">{key}</label>
                                  <div className="flex gap-4 mb-2">
                                      <button 
                                        className={`text-xs px-3 py-1 rounded-full border ${editingContacts[key].type === 'text' ? 'bg-white text-black border-white' : 'border-neutral-700 text-neutral-400'}`}
                                        onClick={() => updateContactItem(key, 'type', 'text')}
                                      >
                                          Text
                                      </button>
                                      <button 
                                        className={`text-xs px-3 py-1 rounded-full border ${editingContacts[key].type === 'image' ? 'bg-white text-black border-white' : 'border-neutral-700 text-neutral-400'}`}
                                        onClick={() => updateContactItem(key, 'type', 'image')}
                                      >
                                          Image / QR
                                      </button>
                                  </div>

                                  {editingContacts[key].type === 'text' ? (
                                      <input 
                                        type="text" 
                                        value={editingContacts[key].value}
                                        onChange={(e) => updateContactItem(key, 'value', e.target.value)}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white focus:border-neon-blue outline-none"
                                        placeholder={`Enter ${key} text...`}
                                      />
                                  ) : (
                                      <div className="flex items-center gap-4">
                                          <div className="w-16 h-16 bg-neutral-800 rounded flex items-center justify-center overflow-hidden border border-neutral-700">
                                              {editingContacts[key].value ? (
                                                  <img src={editingContacts[key].value} className="w-full h-full object-cover" />
                                              ) : (
                                                  <ImageIcon size={20} className="text-neutral-500" />
                                              )}
                                          </div>
                                          <label className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded cursor-pointer text-sm transition-colors">
                                              Upload Image
                                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleContactImageUpload(e, key)} />
                                          </label>
                                      </div>
                                  )}
                              </div>
                          ))}
                      </div>

                      <button 
                        onClick={saveContacts}
                        className="w-full py-3 bg-neon-blue text-black font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 rounded mt-6"
                      >
                        <Save size={18} />
                        Save Changes
                      </button>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>

      {/* Main Center Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center relative z-20 px-4 max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-light mb-8 tracking-tighter mix-blend-overlay text-white opacity-90 drop-shadow-2xl">
          Hello, welcome to explore !
        </h1>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mt-12 items-center justify-center">
            {['Architecture', 'Illustration', 'Computational'].map((item) => (
                <button 
                    key={item}
                    onClick={() => setPage('works')}
                    className="group relative px-8 py-3 overflow-hidden rounded-full bg-black/20 border border-white/20 hover:border-white/60 transition-all duration-500 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(0,243,255,0.2)]"
                >
                    <span className="relative z-10 font-light tracking-widest text-xs md:text-sm uppercase group-hover:text-neon-blue transition-colors duration-300">
                        {item}
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </button>
            ))}
             <button 
                onClick={() => setPage('about')}
                className="group relative px-8 py-3 overflow-hidden rounded-full bg-black/20 border border-white/20 hover:border-white/60 transition-all duration-500 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(189,0,255,0.2)]"
            >
                <span className="relative z-10 font-light tracking-widest text-xs md:text-sm uppercase group-hover:text-neon-purple transition-colors duration-300">
                    About
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
        </div>
      </motion.div>

      {/* Recent Work - Floating Widgets (Both on Right) */}
      <div className="absolute w-full h-full top-0 left-0 pointer-events-none z-20 hidden lg:block">
        {recentWorks.map((work, index) => (
            <motion.div
                key={work.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className={`absolute pointer-events-auto cursor-pointer group right-[5%] xl:right-[8%]`}
                style={{
                    top: index === 0 ? '25%' : '55%',
                }}
            >
                <div className="w-56 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-3 hover:border-neon-blue/50 transition-colors shadow-2xl">
                    <div className="h-32 overflow-hidden mb-3 rounded-md relative">
                        <img src={work.image} alt={work.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-neon-blue/0 group-hover:bg-neon-blue/10 transition-colors" />
                    </div>
                    <div className="px-1">
                        <h4 className="text-sm font-bold text-white mb-1 font-display uppercase tracking-wider">{work.title}</h4>
                        <div className="flex gap-2 mb-2">
                             {work.tags.slice(0,2).map(t => <span key={t} className="text-[10px] text-neutral-400 border border-neutral-700 px-1 rounded">{t}</span>)}
                        </div>
                        <p className="text-[10px] text-neutral-400 leading-tight line-clamp-2">{work.description}</p>
                    </div>
                </div>
            </motion.div>
        ))}
      </div>

      {/* Footer Tagline */}
      <div className="absolute bottom-12 w-full text-center px-6 z-20 pointer-events-none">
          <p className="text-xs md:text-sm text-neutral-500 font-light tracking-widest font-display uppercase drop-shadow-lg">
            Design Enthusiast exploring computational design, art, architecture and interactive systems.
          </p>
      </div>

    </div>
  );
};

export default Home;
