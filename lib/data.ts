export const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Diagnósticos', href: '/#diagnosticos' },
  { label: 'Sobre Nosotros', href: '/#sobre-nosotros' },
];

export const HERO = {
  eyebrow: 'SISTEMAS DE REPARACIÓN AVANZADOS',
  titleTop: 'INGENIERÍA AUTOMOTRIZ DE',
  titleHighlight: 'ALTO RENDIMIENTO',
  description:
    'Potencia absoluta y precisión milimétrica. Soluciones integrales para vehículos pesados y maquinaria industrial con tecnología de vanguardia.',
  ctas: [
    { label: 'RESERVAR DIAGNÓSTICO', href: '#contact', variant: 'primary' },
    { label: 'VER SERVICIOS', href: '#services', variant: 'outline' },
  ],
  image: '/images/hero-image.png',
};

// Services data
import { FaWrench, FaCarSide, FaTruck, FaOilCan, FaCogs, FaCalendarCheck, FaMicrochip, FaTools, FaBroadcastTower, FaChartLine, FaPhoneAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export const SERVICES = [
  {
    id: 's1',
    title: 'Mecánica General',
    description: 'Reparaciones mecánicas integrales para vehículos de carga pesada y flotas industriales.',
    icon: FaWrench,
  },
  {
    id: 's2',
    title: 'Motor diésel y a gasolina',
    description: 'Reparación y mantenimiento experto para motores de combustión interna de ambos ciclos.',
    icon: FaCogs,
  },
  {
    id: 's3',
    title: 'Sistema de freno, liga y de aire',
    description: 'Servicio completo de sistemas de frenado, incluidos mecanismos hidráulicos y de aire comprimido.',
    icon: FaTruck,
  },
  {
    id: 's4',
    title: 'Reparación de caja sincrónica',
    description: 'Puesta a punto y reparación de cajas sincrónicas.',
    icon: FaCarSide,
  },
  {
    id: 's5',
    title: 'Sistemas hidráulicos',
    description: 'Mantenimiento y reparación de montacargas, maquinaria y equipos hidráulicos industriales.',
    icon: FaOilCan,
  },
  {
    id: 's6',
    title: 'Mantenimiento Preventivo',
    description: 'Inspecciones programadas y mantenimiento preventivo para evitar fallas críticas.',
    icon: FaCalendarCheck,
  },
];

// Recommendations / Testimonials
export const RECOMMENDATIONS = [
  {
    id: 'r1',
    name: 'Marcos Pérez',
    company: 'Transportes Globales C.A.',
    quote: 'La precisión en el diagnóstico nos ahorró semanas de tiempo muerto en nuestra flota. Torque Máximo RR es nuestro socio estratégico.',
    avatar: '/images/user.png',
  },
  {
    id: 'r2',
    name: 'Ana Gómez',
    company: 'Logística Avanzada S.A.',
    quote: 'Excelente servicio de rectificación. Los motores rinden mejor que cuando eran nuevos. Recomendados al 100%.',
    avatar: '/images/user.png',
  },
  {
    id: 'r3',
    name: 'Luis Fernández',
    company: 'Construcción Integral',
    quote: 'El reporte predictivo es una maravilla. Hemos evitado reparaciones costosas gracias a su tecnología de punta.',
    avatar: '/images/user.png',
  },
  {
    id: 'r4',
    name: 'Carolina Ruiz',
    company: 'Maquinaria Pesada Ltda.',
    quote: 'Atención impecable y resultados consistentes. Su diagnóstico remoto nos permitió programar mantenimientos a tiempo.',
    avatar: '/images/user.png',
  },
  {
    id: 'r5',
    name: 'Roberto Díaz',
    company: 'Flotas del Sur',
    quote: 'Profesionales y responsables. La calidad del servicio y la garantía nos dan mucha tranquilidad.',
    avatar: '/images/user.png',
  },
  {
    id: 'r6',
    name: 'María López',
    company: 'Distribución Masiva S.A.',
    quote: 'Recibimos informes claros y propuestas de reparación con costos razonables. Muy recomendados.',
    avatar: '/images/user.png',
  },
];

// Diagnostic section data
export const DIAGNOSTIC = {
  eyebrow: 'DIAGNÓSTICO',
  titleTop: 'DIAGNÓSTICO',
  titleHighlight: 'COMPUTARIZADO',
  description:
    'Detectamos fallas invisibles al ojo humano. Nuestra infraestructura digital de escaneo se conecta directamente con el ECU para un análisis telemétrico en tiempo real.',
  image: '/images/scanner.png',
  cards: [
    {
      id: 'd1',
      title: 'Análisis en Tiempo Real',
      description: 'Telemetría completa del motor bajo carga.',
      icon: FaMicrochip,
    },
    {
      id: 'd2',
      title: 'Remapeo de ECU',
      description: 'Optimización de parámetros operativos.',
      icon: FaTools,
    },
    {
      id: 'd3',
      title: 'Calibración Digital',
      description: 'Sincronización perfecta de actuadores.',
      icon: FaBroadcastTower,
    },
    {
      id: 'd4',
      title: 'Reporte Predictivo',
      description: 'Prevención de fallas futuras.',
      icon: FaChartLine,
    },
  ],
};

// Footer / Contact data
export const FOOTER = {
  phone: '+58 4241727312',
  location: 'Caracas, Venezuela',
  hours: 'Lun - Vie: 08:00 - 18:00',
  contactItems: [
    { id: 'f1', label: '+58 4241612128', icon: FaPhoneAlt, href: 'tel:+584241612128' },
    { id: 'f2', label: 'Caracas, Venezuela', icon: FaMapMarkerAlt, href: 'https://www.google.com/maps/place/Caracas,+Venezuela' },
    { id: 'f3', label: 'Lun - Vie: 08:00 - 18:00', icon: FaClock, href: 'https://www.google.com/search?q=horario+de+atencion+Caracas+Venezuela' },
  ],
};
