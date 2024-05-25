/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      backgroundImage: {
        balloons: `url(/src/components/images/high quality/bal.webp)`,
        tower: `url(/src/components/images/high quality/thatimg.webp)`,
        loginn: `url(/src/components/images/high quality/login.webp)`,
        openanimation: `url(/src/components/images/high quality/openanimation.webp)`,
        landing: `url(/src/components/images/high quality/birdsayuru.jpg)`,
        zoonet: `url(/src/components/images/high quality/zoonet.png)`,
      },
    },
  },
  plugins: [],
};
