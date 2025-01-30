/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      //   "avatars.githubusercontent.com",
      //   "platform-lookaside.fbsbx.com",
      //   "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },
};

// export default nextConfig;
module.exports = nextConfig;

// module.exports = {
//   experimental: {
//     appDir: true,
//   },
//   images: {
//     domains: ["res.cloudinary.com"],
//   },
// };
