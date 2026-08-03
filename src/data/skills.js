import {
  SiReact,
  SiTailwindcss,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiFramer,
  SiThreedotjs,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiSqlite,
  SiGit,
  SiGithub,
  SiVite,
  SiFigma,
} from 'react-icons/si'
import { FaCss3Alt } from 'react-icons/fa'
export const skillGroups = [
  {
    title: 'Frontend',
    romanNumeral: 'I',
    skills: [
      { name: 'React', icon: SiReact, description: 'Component-based UI', color: '#61DAFB' },
      { name: 'TypeScript', icon: SiTypescript, description: 'Typed JavaScript at scale', color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, description: 'Dynamic web development', color: '#F7DF1E' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, description: 'Utility-first styling', color: '#06B6D4' },
      { name: 'GSAP', icon: SiGreensock, description: 'High-performance animations', color: '#88CE02' },
      { name: 'Framer Motion', icon: SiFramer, description: 'Declarative React animation', color: '#0055FF' },
      { name: 'Three.js', icon: SiThreedotjs, description: '3D on the web', color: '#ffffff' },
      { name: 'HTML5', icon: SiHtml5, description: 'Semantic markup', color: '#E34F26' },
      { name: 'CSS3', icon: FaCss3Alt, description: 'Modern styling & layouts', color: '#1572B6' },
    ],
  },
  {
    title: 'Backend',
    romanNumeral: 'II',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, description: 'Server-side JavaScript', color: '#339933' },
      { name: 'Express', icon: SiExpress, description: 'Web application framework', color: '#ffffff' },
      { name: 'Prisma', icon: SiPrisma, description: 'Type-safe ORM', color: '#ffffff' },
      { name: 'PostgreSQL', icon: SiPostgresql, description: 'Relational database', color: '#4169E1' },
      { name: 'SQL', icon: SiSqlite, description: 'Database querying', color: '#89b4c4' },

    ],
  },
  {
    title: 'Tools',
    romanNumeral: 'III',
    skills: [
      { name: 'Git', icon: SiGit, description: 'Version control', color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, description: 'Collaboration platform', color: '#ffffff' },
      { name: 'Vite', icon: SiVite, description: 'Modern build tool', color: '#646CFF' },
      { name: 'Figma', icon: SiFigma, description: 'Interface design', color: '#F24E1E' },
    ],
  },
]