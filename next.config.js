const withBundleAnalyzer = require("@next/bundle-analyzer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["repository-main.vercel.app", "github.com"],
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
