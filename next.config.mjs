/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ekkjfpnohkeqliyjldni.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/character_image/private/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
