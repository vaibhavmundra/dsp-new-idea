const createMDX = require("@next/mdx");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
      "@react-email/tailwind",
    ],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Accept',
            value: 'application/pdf, application/json',
          },
        ],
      },
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      stream: false,
      path: false,
    }
    return config
  },
};

module.exports = nextConfig;

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.mdx?$/,
  options: {
    // Add any additional MDX options here
  },
});

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);
