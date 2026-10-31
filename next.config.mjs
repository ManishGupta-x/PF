/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
    },
    poweredByHeader: false,
    // Old routes stay reachable after the redesign.
    async redirects() {
        return [
            { source: '/Work', destination: '/#work', permanent: true },
            { source: '/Skills', destination: '/expertise', permanent: true },
            { source: '/SmallProjects', destination: '/#work', permanent: true },
        ];
    },
};

export default nextConfig;
