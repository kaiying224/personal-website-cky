
export type PageView = 'home' | 'works' | 'about';

export type WorkCategory = 'Architecture' | 'Illustration' | 'Computational';

export interface Project {
  id: string;
  title: string;
  category: WorkCategory;
  description: string;
  image: string;
  video?: string; // Optional video preview
  gallery?: string[]; // Array of additional image URLs
  tags: string[];
  date: string;
  projectInfo?: string;
  outcomes?: string;
  techStack?: string[];
}

export interface ParticleConfig {
  color: string;
  count: number;
  connectionDistance: number;
}

export interface ContactItem {
    type: 'text' | 'image';
    value: string; // The text content or the Image Data URL
}

export interface ContactInfo {
    xiaohongshu: ContactItem;
    wechat: ContactItem;
    phone: ContactItem;
}
