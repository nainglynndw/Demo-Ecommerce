module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',

    // React specific rules
    'react/jsx-uses-react': 'off', // Not needed in React 17+
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/prop-types': 'off', // Using TypeScript instead
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-spacing': ['error', 'never'],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-key': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-unescaped-entities': 'error',
    'react/self-closing-comp': 'error',

    // React Hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // General code quality rules
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'warn',
    'no-duplicate-imports': 'error',
    'no-unused-expressions': 'error',
    'no-useless-return': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'warn',
    'no-extra-boolean-cast': 'error',
    'no-extra-semi': 'error',

    // Code style rules
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    indent: 'off', // Can cause issues with complex JSX
    'max-len': ['warn', { code: 120, ignoreUrls: true, ignoreStrings: true }],

    // React Native specific rules
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'off', // Too strict, text outside Text components

    // Security rules
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',

    // Performance rules
    'no-loop-func': 'error',
    'no-inner-declarations': 'error',

    // Best practices
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    'dot-notation': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'warn',
    'no-magic-numbers': [
      'warn',
      {
        ignore: [-1, 0, 1, 2, 100, 1000],
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: false,
      },
    ],
  },
};
