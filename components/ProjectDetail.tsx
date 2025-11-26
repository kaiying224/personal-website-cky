
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onUpdate?: (updatedProject: Project) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdate) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result as string;
        const updatedProject = {
            ...project,
            gallery: [...(project.gallery || []), newImage]
        };
        onUpdate(updatedProject);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryImage = (index: number) => {
      if(onUpdate) {
        const updatedProject = {
            ...project,
            gallery: project.gallery?.filter((_, i) => i !== index)
        };
        onUpdate(updatedProject);
      }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md"
    >
      <div className="min-h-screen px-4 py-12 md:py-20 flex justify-center items-start">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative w-full max-w-7xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
        >
          
          {/* Header Image */}
          <div className="h-[40vh] md:h-[70vh] w-full relative group">
              {project.video ? (
                   <video 
                      src={project.video} 
                      autoPlay muted loop playsInline 
                      className="w-full h-full object-cover"
                  />
              ) : (
                  <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                  />
              )}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
            
            {/* Close Button - Absolute Top Right of Image */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-neon-blue hover:text-black rounded-full transition-colors text-white border border-white/10 backdrop-blur-md"
            >
                <X size={24} />
            </button>

            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-7xl font-display font-bold text-white mb-4"
                >
                    {project.title}
                </motion.h1>
                <div className="flex flex-wrap gap-3">
                    {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-sm border border-neon-blue/30 text-neon-blue bg-neon-blue/5 rounded-full backdrop-blur-sm">
                        {tag}
                    </span>
                    ))}
                </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-24">
            
            {/* Left Column: Description & Gallery */}
            <div className="lg:col-span-2 space-y-16">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-neon-blue"></span>
                    Project Context
                </h3>
                <p className="text-neutral-300 leading-relaxed font-light text-lg md:text-xl whitespace-pre-wrap">
                  {project.projectInfo || project.description}
                  <br /><br />
                  {project.description}
                </p>
              </div>
              
              {project.outcomes && (
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-neon-purple"></span>
                    Outcomes
                  </h3>
                  <p className="text-neutral-300 leading-relaxed font-light text-lg md:text-xl">
                    {project.outcomes}
                  </p>
                </div>
              )}

              {/* Gallery Section */}
              <div className="pt-8 border-t border-neutral-800">
                  <h3 className="text-3xl font-display font-bold text-white mb-8">Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.gallery && project.gallery.map((img, idx) => (
                          <div key={idx} className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-neutral-800 group relative">
                              <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                              {onUpdate && (
                                <button 
                                    onClick={() => removeGalleryImage(idx)}
                                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                                >
                                    <Trash2 size={16} />
                                </button>
                              )}
                          </div>
                      ))}
                      
                      {/* Add Image Button - Always Last */}
                      {onUpdate && (
                          <div 
                            className="w-full aspect-[4/3] rounded-lg border border-neutral-800 border-dashed bg-neutral-800/20 hover:bg-neutral-800/50 hover:border-neon-blue hover:text-neon-blue transition-all cursor-pointer flex flex-col items-center justify-center text-neutral-500 gap-4 group"
                            onClick={() => fileInputRef.current?.click()}
                          >
                              <div className="p-4 rounded-full bg-neutral-800 group-hover:bg-neon-blue group-hover:text-black transition-colors">
                                <Plus size={32} />
                              </div>
                              <span className="uppercase tracking-widest text-xs font-bold">Add Image</span>
                              <input 
                                  type="file" 
                                  ref={fileInputRef}
                                  className="hidden" 
                                  accept="image/*"
                                  onChange={handleGalleryUpload}
                              />
                          </div>
                      )}
                  </div>
              </div>
            </div>

            {/* Right Column: Meta Info */}
            <div className="space-y-10">
                <div className="sticky top-24 space-y-10">
                    <div className="bg-neutral-800/30 p-8 rounded-2xl border border-neutral-800 backdrop-blur-sm">
                        <div className="mb-8">
                            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Year</h4>
                            <span className="text-2xl font-mono text-white">{project.date}</span>
                        </div>
                        
                        {project.techStack && (
                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map(tech => (
                                    <span key={tech} className="px-3 py-2 bg-neutral-900 text-neutral-300 text-sm rounded border border-neutral-700">
                                        {tech}
                                    </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={onClose} 
                        className="w-full py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest text-sm font-bold"
                    >
                        Back to All Works
                    </button>
                </div>
            </div>

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
