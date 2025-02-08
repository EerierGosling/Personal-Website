/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/cubesat-presentation",
        destination: "https://docs.google.com/presentation/d/1-KQB6vig9reWJ8C5WMaW6gTXZRoUWKWcors94sDVdIQ",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;