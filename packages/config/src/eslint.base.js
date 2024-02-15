import js from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ["node_modules"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-extra-semi": "off",
      "no-mixed-spaces-and-tabs": "off",
    },
  },
];
