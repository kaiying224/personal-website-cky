import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkCategory, Project } from '../types';
import { ArrowUpRight, Play, Battery, Plus, Edit2, Upload, X, Save, Trash2 } from 'lucide-react';
import ProjectDetail from './ProjectDetail';

const categories: WorkCategory[] = ['Architecture', 'Illustration', 'Computational'];

interface WorksProps {
  projects: Project[];
  onAdd: (project: Project) => void;
  onUpdate: (project: Project) => void;
}

const Works: React.FC<WorksProps> = ({ projects, onAdd, onUpdate }) => {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('Architecture');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project>>({});
  
  const filteredProjects = projects.filter(p => p.category === activeCategory);

  const handleEditClick = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setEditingProject({
        ...project,
        gallery: project.gallery || [] // Ensure gallery is initialized
    });
    setIsEditorOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject({
      category: activeCategory,
      tags: [],
      techStack: [],
      gallery: []
    });
    setIsEditorOpen(true);
  };

  const handleSave = () => {
    if (!editingProject.title || !editingProject.category || !editingProject.image) {
      alert("Please fill in at least Title, Category and Image.");
      return;
    }

    const newProject: Project = {
      id: editingProject.id || `new-${Date.now()}`,
      title: editingProject.title!,
      category: editingProject.category as WorkCategory,
      description: editingProject.description || '',
      image: editingProject.image!,
      tags: editingProject.tags || [],
      date: editingProject.date || new Date().getFullYear().toString(),
      projectInfo: editingProject.projectInfo,
      outcomes: editingProject.outcomes,
      techStack: editingProject.techStack,
      video: editingProject.video,
      gallery: editingProject.gallery || []
    };

    if (editingProject.id) {
      onUpdate(newProject);
    } else {
      onAdd(newProject);
    }
    setIsEditorOpen(false);
    setEditingProject({});
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isGallery: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (isGallery) {
            setEditingProject(prev => ({
                ...prev,
                gallery: [...(prev.gallery || []), result]
            }));
        } else {
            setEditingProject(prev => ({ ...prev, image: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryImage = (index: number) => {
      setEditingProject(prev => ({
          ...prev,
          gallery: prev.gallery?.filter((_, i) => i !== index)
      }));
  }

  const renderEditorModal = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
    >
      <div className="bg-neutral-900 border border-neutral-800 w-full max-w-4xl rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold font-display">{editingProject.id ? 'Edit Project' : 'New Project'}</h2>
          <button onClick={() => setIsEditorOpen(false)} className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
            <X />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Media */}
              <div className="space-y-4">
                  <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Cover Image</label>
                  <div className="w-full aspect-video bg-neutral-800 rounded-lg overflow-hidden relative group border border-neutral-700 border-dashed hover:border-neon-blue transition-colors">
                    {editingProject.image ? (
                    <img src={editingProject.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                    <div className="flex flex-col items-center justify-center h-full text-neutral-500">
                        <Upload size={32} className="mb-2" />
                        <span>Click to upload cover image</span>
                    </div>
                    )}
                    <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                  </div>

                  {/* Gallery Upload Section */}
                  <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider mt-6">Project Gallery</label>
                  <div className="grid grid-cols-3 gap-2">
                      {editingProject.gallery?.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-md overflow-hidden group">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                              <button 
                                onClick={() => removeGalleryImage(idx)}
                                className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                  <X size={12} />
                              </button>
                          </div>
                      ))}
                      
                      {/* Add Gallery Button */}
                      <div className="aspect-square bg-neutral-800 rounded-md border border-neutral-700 border-dashed flex items-center justify-center relative hover:border-neon-blue hover:text-neon-blue transition-colors cursor-pointer text-neutral-500">
                          <Plus size={24} />
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, true)}
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                            title="Add Image"
                          />
                      </div>
                  </div>
              </div>

              {/* Right Column: Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Title</label>
                    <input 
                        type="text" 
                        value={editingProject.title || ''}
                        onChange={e => setEditingProject(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 text-white focus:border-neon-blue outline-none transition-colors"
                        placeholder="Project Title"
                    />
                    </div>
                    <div>
                    <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Category</label>
                    <select 
                        value={editingProject.category || activeCategory}
                        onChange={e => setEditingProject(prev => ({ ...prev, category: e.target.value as WorkCategory }))}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 text-white focus:border-neon-blue outline-none appearance-none"
                    >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Short Description</label>
                    <textarea 
                    value={editingProject.description || ''}
                    onChange={e => setEditingProject(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 text-white focus:border-neon-blue outline-none h-20 resize-none"
                    placeholder="Short description..."
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Tags</label>
                        <input 
                        type="text" 
                        value={editingProject.tags?.join(', ') || ''}
                        onChange={e => setEditingProject(prev => ({ ...prev, tags: e.target.value.split(',').map(s => s.trim()) }))}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 text-white focus:border-neon-blue outline-none"
                        placeholder="React, 3D, Motion..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Year</label>
                        <input 
                        type="text" 
                        value={editingProject.date || ''}
                        onChange={e => setEditingProject(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 text-white focus:border-neon-blue outline-none"
                        placeholder="2024"
                        />
                    </div>
                </div>

                {/* Extended Details */}
                <div>
                    <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Project Info / Detailed Text</label>
                    <textarea 
                    value={editingProject.projectInfo || ''}
                    onChange={e => setEditingProject(prev => ({ ...prev, projectInfo: e.target.value }))}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 text-white focus:border-neon-blue outline-none h-32 resize-none"
                    placeholder="Detailed explanation of the project..."
                    />
                </div>
              </div>
          </div>
          
          <button 
            onClick={handleSave}
            className="w-full py-4 bg-neon-blue text-black font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 rounded"
          >
            <Save size={18} />
            Save Project
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    if (activeCategory === 'Architecture') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative"
            >
              <div className="aspect-[4/5] overflow-hidden bg-neutral-900 relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                
                {/* Edit Button */}
                <button 
                  onClick={(e) => handleEditClick(e, project)}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neon-blue hover:text-black rounded-full z-20"
                >
                  <Edit2 size={16} />
                </button>

                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-2xl font-display font-bold text-white mb-1">{project.title}</h3>
                            <div className="flex gap-2">
                                {project.tags.slice(0, 2).map(t => (
                                    <span key={t} className="text-xs text-neon-blue bg-neon-blue/10 px-2 py-1">{t}</span>
                                ))}
                            </div>
                        </div>
                        <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );
    }

    if (activeCategory === 'Illustration') {
      return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="break-inside-avoid relative group cursor-pointer"
            >
              <div className="w-full rounded-lg overflow-hidden bg-neutral-800 relative">
                {project.video ? (
                    <div className="relative aspect-square">
                        <video 
                            src={project.video} 
                            autoPlay muted loop playsInline 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Play className="text-white/50 w-12 h-12" />
                        </div>
                    </div>
                ) : (
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                )}
                
                 {/* Edit Button */}
                 <button 
                  onClick={(e) => handleEditClick(e, project)}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neon-blue hover:text-black rounded-full z-20"
                >
                  <Edit2 size={16} />
                </button>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );
    }

    if (activeCategory === 'Computational') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer bg-neutral-900 border border-neutral-800 hover:border-neon-purple transition-colors h-80 overflow-hidden"
              >
                 {/* Edit Button */}
                 <button 
                  onClick={(e) => handleEditClick(e, project)}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neon-blue hover:text-black rounded-full z-30"
                >
                  <Edit2 size={16} />
                </button>

                {/* Default State: Small image + Text */}
                <div className="absolute inset-0 flex flex-col justify-center items-center p-8 group-hover:opacity-0 transition-opacity duration-300 z-10">
                    <Battery className="w-12 h-12 text-neon-purple mb-4 animate-pulse" />
                    <h3 className="text-3xl font-display font-bold mb-2">{project.title}</h3>
                    <p className="text-neutral-400 text-center max-w-xs">{project.description}</p>
                </div>

                {/* Hover State: Full Image/Video Reveal */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-neon-purple/20 mix-blend-overlay" />
                </div>
              </motion.div>
            ))}
          </div>
        );
      }
  };

  return (
    <div className="relative pt-32 px-6 md:px-12 lg:px-24 pb-20 z-10 min-h-screen">
      
      {/* Category Filter */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex bg-neutral-900/50 backdrop-blur-md rounded-full p-1 border border-neutral-800">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode='wait'>
            <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                {renderContent()}
            </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Add Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleAddNew}
        className="fixed bottom-10 right-10 w-16 h-16 bg-neon-blue rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,243,255,0.5)] z-40 hover:bg-white transition-colors"
      >
        <Plus size={32} />
      </motion.button>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
            <ProjectDetail 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
              onUpdate={onUpdate}
            />
        )}
      </AnimatePresence>

      {/* Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && renderEditorModal()}
      </AnimatePresence>
    </div>
  );
};

export default Works;