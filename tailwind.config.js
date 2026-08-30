/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm neutral background & ink — per the project color guide.
        cream: {
          DEFAULT: '#F1EBE3', // page background
          soft: '#F7F0E7', // neutral card surfaces (Calendar, Today at a Glance)
        },
        ink: {
          DEFAULT: '#514137', // primary text — replaces pure black everywhere
          muted: '#75675D', // secondary text: descriptions, timestamps
          faint: '#9A8D82', // tertiary: placeholders, disabled, low-priority labels
        },
        // Card families — each has a "bg", a "deep" accent (buttons/checks/
        // borders on that card), and a "text" color for headings on that bg.
        lavender: {
          bg: '#DCC9E1', // soft lavender — Daily Reflection, affirmation 1
          deep: '#B58DC0', // muted purple — buttons/accents on lavender
          text: '#6E4780', // deep purple — headings/text on lavender
        },
        sage: {
          bg: '#AEBB8D', // soft sage green — Day Planner
          light: '#D9DFC5', // pale sage — affirmation 2, secondary sections
          deep: '#34401F', // deep olive — buttons/checkmarks/headings on sage
          text: '#34401F',
        },
        tan: {
          bg: '#E4D2BB', // warm beige — The Pile, Today at a Glance
          deep: '#9A806B', // soft taupe — buttons/borders/muted controls
          text: '#514137', // primary brown — text on beige
        },
        // Single accent used for event indicators and "danger" actions,
        // drawn from the palette rather than an off-palette red.
        accent: {
          DEFAULT: '#B58DC0', // muted purple
        },
      },
      fontFamily: {
        // Warm journal heading — reserved for the main dashboard greeting
        // ("Good morning, Kenzie!") only. Used at ~600 weight.
        greeting: ['"Fraunces"', 'serif'],
        // Personality / illustrated-planner feel: widget titles, view
        // headers, calendar (month, weekdays, numbers), affirmation quotes,
        // and other small handwritten-style headings. 400–500 weight.
        hand: ['"Mali"', 'cursive'],
        // Functional UI text: inputs, task/item text, descriptions, times,
        // buttons, labels — anything that needs to stay very readable.
        body: ['"Nunito"', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.75rem',
      },
      boxShadow: {
        soft: '0 4px 16px rgba(81, 65, 55, 0.10)',
        softer: '0 2px 8px rgba(81, 65, 55, 0.07)',
      },
    },
  },
  plugins: [],
}
