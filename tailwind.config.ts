import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#111827',
          2: '#1f2d3d',
          3: '#2d3f52',
        },
        lime: '#a3e635',
      },
    },
  },
  plugins: [],
}

export default config
