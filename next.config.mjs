/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com',
            },
        ],
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
    httpAgentOptions: {
        keepAlive: true,
    },
    experimental: {
        optimizePackageImports: ['lucide-react']
    }
};

export default nextConfig;