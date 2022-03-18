export default {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommanded',
    'plugin:@typescript-eslint/recommanded',
    'airbnb-base',
    'plugin:prettier/recommanded',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'linebreak-style': 0,
    'newIsCap': false,
     'max-len': [2, { code: 140, ignorePattern: '^import .*' }],
  },
};
