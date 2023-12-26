/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => {
    // This could be anything, using the latest git hash
    return 'Next_Build_ID';
  },
  distDir: 'dist/.next',
};

module.exports = nextConfig;
