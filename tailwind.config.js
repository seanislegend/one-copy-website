const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true
    },
    plugins: [
        plugin(({addUtilities}) => {
            const newUtilities = {
                '.clip-text': {
                    '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color': 'transparent'
                }
            };

            addUtilities(newUtilities);
        })
    ],
    purge: {
        content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
        enabled: true,
        options: {whitelist: ['animate-spin']}
    },
    theme: {
        extend: {
            animation: {
                fadeInUp: 'fadeInUp .8s ease-in-out'
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans]
            },
            keyframes: {
                fadeInUp: {
                    '0%': {opacity: 0, transform: 'translateY(10px)'},
                    '100%': {opacity: 1, transform: 'translateY(0)'}
                }
            }
        }
    },
    variants: {}
};
