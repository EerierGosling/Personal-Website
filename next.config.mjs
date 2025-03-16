/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/cubesat-presentation",
        destination: "https://docs.google.com/presentation/d/1-KQB6vig9reWJ8C5WMaW6gTXZRoUWKWcors94sDVdIQ",
        permanent: true,
      },
      {
        source: "/quantum-rsa-presentation",
        destination: "https://docs.google.com/presentation/d/1wKFjC_F4-g37oC_v8BwO6wepv-TqtUJ8_eQu_beWUc4",
        permanent: true,
      },
      {
        source: "/synbio-presentation",
        destination: "https://docs.google.com/presentation/d/1uFHiXj-6oQ-ZH27bfJ4rbpKyVz8MTGwrC0slM-h6TUE",
        permanent: true,
      },
      {
        source: "/cnn-presentation",
        destination: "https://math.mit.edu/research/highschool/primes/materials/2024/December/2-5-Egan.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;