
import { Project, ContactInfo } from './types';

// Using picsum and placeholders for visual demo
export const PROJECTS: Project[] = [
  {
    id: 'arch-1',
    title: 'Void Structure',
    category: 'Architecture',
    description: 'A parametric exploration of negative space in urban environments.',
    image: 'https://picsum.photos/800/600?random=1',
    gallery: [
      'https://picsum.photos/800/600?random=101',
      'https://picsum.photos/800/600?random=102',
      'https://picsum.photos/800/600?random=103'
    ],
    tags: ['Parametric', 'Urban', 'Sustainable'],
    date: '2023',
    projectInfo: 'Located in central Tokyo, this project reimagines the void.',
    outcomes: 'Reduced carbon footprint by 40% through passive cooling.',
    techStack: ['Rhino', 'Grasshopper', 'V-Ray']
  },
  {
    id: 'arch-2',
    title: 'Floating Pavilion',
    category: 'Architecture',
    description: 'A temporary structure designed for the Venice Biennale.',
    image: 'https://picsum.photos/800/600?random=2',
    gallery: [
       'https://picsum.photos/800/600?random=201',
       'https://picsum.photos/800/600?random=202'
    ],
    tags: ['Temporary', 'Wood', 'Water'],
    date: '2022',
    projectInfo: 'An experimental modular system.',
    outcomes: 'Winner of the Silver Lion award.',
    techStack: ['Revit', 'Enscape']
  },
  {
    id: 'ill-1',
    title: 'Cyber Dreams',
    category: 'Illustration',
    description: 'Digital painting series exploring AI consciousness.',
    image: 'https://picsum.photos/800/800?random=3',
    gallery: [],
    tags: ['Digital Painting', 'Concept Art'],
    date: '2024'
  },
  {
    id: 'ill-2',
    title: 'Neon Nights',
    category: 'Illustration',
    description: 'Motion graphic loop for a music festival.',
    image: 'https://picsum.photos/800/800?random=4',
    video: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtY2J5bnZ5Y3h6Y2J5bnZ5Y3h6/3o7TKs25Zt363l80zS/giphy.mp4',
    tags: ['Motion', 'After Effects'],
    date: '2023'
  },
  {
    id: 'comp-1',
    title: 'Reactive Surface',
    category: 'Computational',
    description: 'Interactive wall installation reacting to human proximity.',
    image: 'https://picsum.photos/800/600?random=5',
    gallery: ['https://picsum.photos/800/600?random=501'],
    tags: ['Arduino', 'Processing', 'Sensors'],
    date: '2024',
    projectInfo: 'Installed at the MIT Media Lab.',
    outcomes: 'Processed over 10,000 interactions per day.',
    techStack: ['C++', 'TouchDesigner', 'Python']
  },
  {
    id: 'comp-2',
    title: 'Data Organism',
    category: 'Computational',
    description: 'Visualizing stock market data as a living organism.',
    image: 'https://picsum.photos/800/600?random=6',
    tags: ['Data Viz', 'D3.js', 'React'],
    date: '2023',
    projectInfo: 'Commissioned by a fintech startup.',
    outcomes: 'Increased user engagement by 200%.',
    techStack: ['React', 'Three.js', 'WebGL']
  }
];

export const INITIAL_CONTACT_INFO: ContactInfo = {
  xiaohongshu: {
      type: 'text',
      value: 'XHS ID: ChenKaiying_Design'
  },
  wechat: {
      type: 'text',
      value: 'WeChat: CKY_Studio'
  },
  phone: {
      type: 'text',
      value: '+86 138 0000 0000'
  }
};
