module.exports = {
  parser: '@typescript-eslint/parser',
  // plugins: ['simple-import-sort'],
  extends: [
    'plugin:cubyn-typescript/base',
    'plugin:cubyn-typescript/carotte',
    // 'plugin:cubyn-typescript/jest',
    'plugin:cubyn-typescript/knex',
    // 'plugin:cubyn-typescript/objection',
    'plugin:cubyn-typescript/prettier',
  ],
  rules: {
    /**
     * Needed to avoid errors using `getMock()` helper
     */
    'jest/unbound-method': 'off',
    // 'simple-import-sort/imports': [
    //   'error',
    //   {
    //     // The default grouping, but with no blank lines
    //     // https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js#L100
    //     groups: [['^\\u0000', '^@?\\w', '^', '^\\.']],
    //   },
    // ],
    // 'simple-import-sort/exports': 'error',
  },
};
