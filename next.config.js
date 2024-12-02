/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'dwqfczbxwbnukmycitqc.supabase.co', // Tu dominio de Supabase
    ],
  },
  async headers() {
    return [
      {
        // Permitir webhook de Telegram
        source: '/api/telegram/webhook',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 