interface Service {
  icon: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: 'calendar',
    title: 'Gestión de Reservas',
    description: 'Sistema inteligente para administrar tus reservas de forma eficiente.'
  },
  {
    icon: 'analytics',
    title: 'Análisis de Datos',
    description: 'Insights valiosos sobre el rendimiento de tu negocio.'
  },
  {
    icon: 'notification',
    title: 'Notificaciones',
    description: 'Sistema automatizado de recordatorios y confirmaciones.'
  }
]; 