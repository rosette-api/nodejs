import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node
    },
    rules: {
      'no-unused-vars': 'off' // TODO:  Remove during ESM migration
    }
  },
  pluginJs.configs.recommended,
];
