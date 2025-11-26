import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="relative pt-32 px-6 md:px-12 lg:px-24 pb-20 z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Image Section */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative z-10">
                    <img 
                        src="https://picsum.photos/800/1000?grayscale" 
                        alt="Portrait" 
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -left-10 w-full h-full border border-neutral-800 rounded-2xl z-0" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-neon-blue/20 blur-3xl rounded-full z-0" />
            </motion.div>

            {/* Text Section */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h2 className="text-xs font-bold text-neon-blue tracking-widest uppercase mb-4">About Me</h2>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                    Bridging the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">Logic</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Emotion</span>.
                </h1>
                
                <div className="space-y-6 text-neutral-400 font-light text-lg leading-relaxed">
                    <p>
                        I am a multidisciplinary designer specializing in the intersection of physical architecture and digital computation. My work challenges the static nature of built environments by introducing responsive, algorithmic systems.
                    </p>
                    <p>
                        With a background in both structural engineering and creative coding, I build tools that empower new forms of expression. I believe that the future of intelligence is not imitation, but symbiosis.
                    </p>
                </div>

                <div className="mt-12 flex gap-8">
                    <div>
                        <h4 className="text-white font-bold mb-2">Experience</h4>
                        <ul className="text-neutral-500 text-sm space-y-1">
                            <li>Senior Designer @ Studio X</li>
                            <li>Interaction Lead @ TechFlow</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-2">Education</h4>
                        <ul className="text-neutral-500 text-sm space-y-1">
                            <li>M.Arch, MIT</li>
                            <li>B.S. Comp Sci, Stanford</li>
                        </ul>
                    </div>
                </div>
            </motion.div>

        </div>
    </div>
  );
};

export default About;