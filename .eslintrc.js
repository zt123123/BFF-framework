module.exports = {
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: 'eslint:recommended',
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
