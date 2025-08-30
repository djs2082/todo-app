module.exports = {
  root: true,
  extends: [
    'react-app',
    'react-app/jest'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    // project-specific overrides
    'react/react-in-jsx-scope': 'off'
  }
};
