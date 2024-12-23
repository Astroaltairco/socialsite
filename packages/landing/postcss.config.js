module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': false
      },
      stage: 3,
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }
  }
}; 