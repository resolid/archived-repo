import n from "eslint-plugin-n";
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    plugins: { n },
    rules: {
      ...n.configs["flat/recommended"].rules,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
