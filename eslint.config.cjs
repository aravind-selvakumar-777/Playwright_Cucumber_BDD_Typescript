const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  {
    // Only lint .ts files
    files: ['**/*.ts'],

    // Ignore output and dependency folders
    ignores: ['dist/', 'node_modules/', 'reports/'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'], 
        sourceType: 'module',
      },
      globals: {
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
        console: 'readonly',
      },
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      // TypeScript best-practice rules
      ...tsPlugin.configs.recommended.rules,

      // Enforce Prettier formatting
      'prettier/prettier': 'error',

      // Custom adjustments
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': 'off', // optional, turn on if you want stricter typing
    },
  },
];
