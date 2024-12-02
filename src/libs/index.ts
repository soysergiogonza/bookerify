interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  content: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ana García",
    company: "Salón Belleza Elite",
    role: "Propietaria",
    content: "Bookerify ha revolucionado la forma en que gestiono las citas de mi salón."
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    company: "Clínica Dental Sonrisa",
    role: "Director",
    content: "La automatización de citas ha reducido significativamente las cancelaciones."
  }
];

export const features: Feature[] = [
  {
    title: "Reservas Online",
    description: "Sistema de reservas 24/7 para tus clientes",
    icon: "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM8 16H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V6h2v2zm12 8h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8V6h8v2z",
    gradient: "from-blue-600 to-cyan-500"
  },
  {
    title: "Análisis Inteligente",
    description: "Insights y estadísticas detalladas de tu negocio",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    gradient: "from-purple-600 to-indigo-500"
  },
  {
    title: "Notificaciones",
    description: "Sistema automático de recordatorios y confirmaciones",
    icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    gradient: "from-pink-600 to-rose-500"
  }
];

export * from './services'; 