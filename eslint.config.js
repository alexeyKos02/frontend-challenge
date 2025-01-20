import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

// Экспорт Flat ESLint Config
/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { files: ['*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  // Добавление Prettier конфигурации
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      ...prettierConfig.rules, // Отключение правил, конфликтующих с Prettier
      'prettier/prettier': 'error', // Включение проверки Prettier как ESLint правила
    },
  },
];
