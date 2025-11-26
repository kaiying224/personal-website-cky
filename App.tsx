
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';
import Home from './components/Home';
import Works from './components/Works';
import About from './components/About';
import { PageView, Project, ContactInfo } from './types';
import { PROJECTS as INITIAL_PROJECTS, INITIAL_CONTACT_INFO } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(INITIAL_CONTACT_INFO);
  
  // Default background image for home
  const [homeBgImage, setHomeBgImage] = useState<string>('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');

  // Determine particle intensity and variant
  const particleIntensity = currentPage === 'about' ? 0.3 : 1.0;
  const particleVariant = currentPage === 'works' ? 'works' : 'default';

  const handleAddProject = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-neon-blue selection:text-black overflow-hidden">
      
      {/* Persistent Background Layer with Blur Transition */}
      {/* Hidden completely on Home Page (Pure Black) */}
      {/* Only blur on 'about' page */}
      <div 
        className={`fixed inset-0 z-0 transition-all duration-1000 ease-in-out ${
          currentPage === 'home' ? 'opacity-0' : 'opacity-100'
        } ${
          currentPage === 'about' ? 'blur-[30px] opacity-50' : 'blur-0'
        }`}
      >
        <ParticleBackground intensity={particleIntensity} variant={particleVariant} />
      </div>
      
      {/* Global Navigation */}
      <Navigation currentPage={currentPage} setPage={setCurrentPage} />

      {/* Main Content Area */}
      <main className="relative z-10 w-full h-full">
        <AnimatePresence mode='wait'>
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full"
            >
              <Home 
                setPage={setCurrentPage} 
                projects={projects}
                bgImage={homeBgImage}
                setBgImage={setHomeBgImage}
                contactInfo={contactInfo}
                setContactInfo={setContactInfo}
              />
            </motion.div>
          )}

          {currentPage === 'works' && (
            <motion.div
              key="works"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
            >
              <Works 
                projects={projects} 
                onAdd={handleAddProject} 
                onUpdate={handleUpdateProject} 
              />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
            >
              <About />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
