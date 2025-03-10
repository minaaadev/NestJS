const globals = require("globals");
const pluginJs = require("@eslint/js");
const tseslint = require("typescript-eslint");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "prettier/prettier": "error",
    },
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:prettier/recommended",
      "prettier/@typescript-eslint",
    ],
    ...pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
  },
];
