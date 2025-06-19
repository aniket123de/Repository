const withBundleAnalyzer = require("@next/bundle-analyzer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },  images: {
    domains: [
      "repositoryweb.com",
      "repository-main.vercel.app",
      "github.com",
      "avatars.githubusercontent.com",
      "ui-avatars.com"
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      // Fix for HMR CSS issues
      config.optimization.splitChunks = false;
    }
    return config;
  },
  rewrites: async () => [
    {
      source: "/:path*",
      destination: `/:path*`,
    },
    {
      source: "/docs",
      destination: process.env.NEXT_PUBLIC_DOCS_URL ? `${process.env.NEXT_PUBLIC_DOCS_URL}/docs` : '/docs',
    },
    {
      source: "/docs/:path*",
      destination: process.env.NEXT_PUBLIC_DOCS_URL ? `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/:path*` : '/docs/:path*',
    },
  ],
};

module.exports = (_phase, { defaultConfig: _ }) => {
  const plugins = [
    withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" }),
  ];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
};
