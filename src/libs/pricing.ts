import { PricingCardProps } from "@/types/libs/pricing";

export const pricing:PricingCardProps[] = [
    {
        name: 'Bronce',
        optimal: 'Pequeños negocios y emprendedores',
        price: '39.000 COP',
        features: [
            '1 usuario',
            '5GB de almacenamiento',
            'Soporte por email',
            'Acceso básico a la API',
            'Actualizaciones mensuales',
        ],
        color: 'from-amber-700 to-yellow-500',
        CTA: 'Comenzar con Bronce',
    },
    {
        name: 'Plata',
        optimal: 'Negocios en crecimiento y equipos pequeños',
        price: '59.000 COP',
        features: [
            '5 usuarios',
            '20GB de almacenamiento',
            'Soporte prioritario',
            'Acceso completo a la API',
            'Actualizaciones semanales',
        ],
        color: 'from-gray-400 to-gray-200',
        CTA: 'Escalar con Plata',
    },
    {
        name: 'Oro',
        optimal: 'Empresas establecidas y equipos grandes',
        price: '99.000 COP',
        features: [
            'Usuarios ilimitados',
            '100GB de almacenamiento',
            'Soporte 24/7',
            'API personalizada',
            'Actualizaciones en tiempo real',
        ],
        color: 'from-yellow-500 to-yellow-300',
        CTA: 'Dominar con Oro',
    },
];
