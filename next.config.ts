import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'awardsfinecars.com' },
      { protocol: 'https', hostname: 'scontent.ftas1-1.fna.fbcdn.net' },
      { protocol: 'https', hostname: 'www.palisadeforum.com' },
      { protocol: 'https', hostname: 'www.bentleylongisland.com' },
      { protocol: 'https', hostname: 'rpmweb.ca' },
      { protocol: 'https', hostname: 'd2s8i866417m9.cloudfront.net' },
      { protocol: 'https', hostname: 'www.williamloughran.co.uk' },
      { protocol: 'https', hostname: 'avantaauto.ru' },
      { protocol: 'https', hostname: 'static.overfuel.com' },
      { protocol: 'https', hostname: 'mw-core.transforms.svdcdn.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'platinumet.co.uk' },




    ],
  },
};

export default nextConfig;