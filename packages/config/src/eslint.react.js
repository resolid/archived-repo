import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintTypescript from "./eslint.typescript.js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...eslintTypescript,
  {
    files: ["**/*.{jsx,tsx}"],
    ...react.configs.recommended,
    ...react.configs["jsx-runtime"],
    rules: {
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {},
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-hooks/exhaustive-deps": [
        "warn",
        {
          additionalHooks: "(useIsomorphicEffect)",
        },
      ],
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    ...jsxA11y.configs.recommended,
  },
];
