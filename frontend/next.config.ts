/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // This creates a static build
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
