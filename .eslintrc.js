var OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    "consistent-return": ERROR,
    "semi": [ ERROR, "always" ],
    "no-unused-expressions": ERROR,
    "no-useless-call": ERROR,
    "no-useless-concat": ERROR,
  },
};
