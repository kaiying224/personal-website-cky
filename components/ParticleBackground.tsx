
import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  intensity: number;
  variant?: 'default' | 'works';
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ intensity, variant = 'default' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();

    // Interaction State
    const mouse = { x: -500, y: -500, down: false };

    // --- Configuration ---
    
    // Theme 1: Ethereal Night (Blue/Purple/Indigo) - Default
    const coolColors = [
      { r: 20, g: 0, b: 60 },     // Deep Midnight
      { r: 60, g: 10, b: 100 },   // Dark Purple
      { r: 40, g: 50, b: 150 },   // Deep Blue
      { r: 100, g: 0, b: 180 },   // Vivid Violet
      { r: 10, g: 10, b: 50 },    // Dark Navy
    ];

    // Theme: Works Addition (Orange & Blue)
    const worksAdditions = [
        { r: 255, g: 100, b: 0 },   // Orange
        { r: 0, g: 120, b: 255 },   // Electric Blue
        { r: 255, g: 180, b: 50 },  // Golden
    ];

    // Select Palette
    let activePalette = [...coolColors];
    if (variant === 'works') {
        activePalette = [...coolColors, ...worksAdditions, ...worksAdditions]; // Weight additions
    }

    // Theme 2: Bioluminescence (Cyan/Green/Yellow) - Active (On Click)
    const warmColors = [
      { r: 0, g: 255, b: 200 },   // Aqua
      { r: 50, g: 255, b: 100 },  // Neon Green
      { r: 220, g: 255, b: 50 },  // Lemon
      { r: 0, g: 180, b: 255 },   // Sky Blue
    ];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      
      // Current Color
      r: number;
      g: number;
      b: number;
      
      // Target Color (interpolation destination)
      targetR: number;
      targetG: number;
      targetB: number;

      // Base Color
      baseR: number;
      baseG: number;
      baseB: number;
      
      // Active Color
      activeR: number;
      activeG: number;
      activeB: number;

      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        
        // Massive size for diffusion/smoke effect (200px - 500px radius)
        this.size = Math.random() * 300 + 200; 

        // Assign colors
        const base = activePalette[Math.floor(Math.random() * activePalette.length)];
        this.baseR = base.r;
        this.baseG = base.g;
        this.baseB = base.b;

        const active = warmColors[Math.floor(Math.random() * warmColors.length)];
        this.activeR = active.r;
        this.activeG = active.g;
        this.activeB = active.b;

        // Start at base
        this.r = this.baseR;
        this.g = this.baseG;
        this.b = this.baseB;
        this.targetR = this.baseR;
        this.targetG = this.baseG;
        this.targetB = this.baseB;

        this.alpha = Math.random() * 0.15 + 0.05; 
      }

      update() {
        // 1. Move
        this.x += this.vx;
        this.y += this.vy;

        // 2. Boundaries (Wrap around screen)
        if (this.x < -this.size) this.x = width + this.size;
        if (this.x > width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = height + this.size;
        if (this.y > height + this.size) this.y = -this.size;

        // 3. Mouse Interaction: "Flow"
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 500) {
            const force = (500 - dist) / 500;
            const angle = Math.atan2(dy, dx);
            this.vx -= Math.cos(angle) * force * 0.1;
            this.vy -= Math.sin(angle) * force * 0.1;
        }

        // Friction
        this.vx = this.vx * 0.96 + (Math.random() - 0.5) * 0.01;
        this.vy = this.vy * 0.96 + (Math.random() - 0.5) * 0.01;

        // 4. Color Morphing (Click)
        if (mouse.down && dist < 600) {
            this.targetR = this.activeR;
            this.targetG = this.activeG;
            this.targetB = this.activeB;
        } else {
            this.targetR = this.baseR;
            this.targetG = this.baseG;
            this.targetB = this.baseB;
        }

        // Lerp RGB
        this.r += (this.targetR - this.r) * 0.03;
        this.g += (this.targetG - this.g) * 0.03;
        this.b += (this.targetB - this.b) * 0.03;
      }

      draw() {
        if (!ctx) return;
        
        ctx.globalCompositeOperation = 'screen';
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        
        const currentAlpha = this.alpha * intensity;
        const color = `${Math.floor(this.r)}, ${Math.floor(this.g)}, ${Math.floor(this.b)}`;
        
        gradient.addColorStop(0, `rgba(${color}, ${currentAlpha})`);
        gradient.addColorStop(0.4, `rgba(${color}, ${currentAlpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalCompositeOperation = 'source-over';
      }
    }

    const particles: Particle[] = [];
    const particleCount = width < 768 ? 20 : 40;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Event Handlers
    const handleResize = () => setSize();
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseDown = () => mouse.down = true;
    const handleMouseUp = () => mouse.down = false;

    // Mobile Support
    const handleTouchMove = (e: TouchEvent) => {
        if(e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    }
    const handleTouchStart = (e: TouchEvent) => {
        mouse.down = true;
        if(e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    }
    const handleTouchEnd = () => mouse.down = false;

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);


    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, variant]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-black"
    />
  );
};

export default ParticleBackground;
