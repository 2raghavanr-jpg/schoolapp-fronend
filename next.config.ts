import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   reactStrictMode: true,
   devIndicators: false,
 
  compiler: {
    styledComponents: true,
  },
  
};

export default nextConfig;
