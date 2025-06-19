const withBundleAnalyzer = require("@next/bundle-analyzer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    esmExternals: 'loose',
  },  images: {
    domains: [
      "repositoryweb.com",
      "www.repositoryweb.com",
      "repository-main.vercel.app",
      "github.com",
      "avatars.githubusercontent.com",
      "ui-avatars.com"
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },  webpack: (config, { dev, isServer }) => {
    // Handle missing Node.js modules for Supabase
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        bufferutil: false,
        'utf-8-validate': false,
      };
    }

    // Ignore optional dependencies that cause build issues
    config.externals = config.externals || [];
    config.externals.push({
      'bufferutil': 'bufferutil',
      'utf-8-validate': 'utf-8-validate',
    });

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
