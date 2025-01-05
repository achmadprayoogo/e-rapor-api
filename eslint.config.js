import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    extends: [
      "eslint:recommended",
      "plugin:prettier/recommended",
      eslintConfigPrettier,
    ],
    rules: {
      "prettier/prettier": "error",
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
    },
  },
  pluginJs.configs.recommended,
];