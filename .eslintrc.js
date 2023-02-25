module.exports = {
  env: {
    jest: true
  },
  extends: [
    'semistandard'
  ],
  plugins: ['jest'],
  rules: {
    'max-len': ['warn', 100]
  }
};
