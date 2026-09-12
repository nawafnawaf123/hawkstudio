/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    remotePatterns: [],
  },
  async headers() {
    // Versioned names let both video elements and later visits reuse the bytes.
    return ["webm", "mp4", "poster.webp"].map((extension) => ({
      source: `/media/hawk-hero-v1${extension === "poster.webp" ? "-" : "."}${extension}`,
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }));
  },
};

export default nextConfig;
