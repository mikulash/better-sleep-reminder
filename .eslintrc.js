module.exports = {
  root: true,
  extends: [
    // 'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    '@react-native-community',
  ],
  rules: {
    'no-unused-vars': [
      'error',
      {vars: 'all', args: 'after-used', ignoreRestSiblings: false},
    ],
  },
};
