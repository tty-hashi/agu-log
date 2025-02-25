import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off", // Reactをimportしなくても使えるようにする
      "no-console": "error", // コンソールの使用を禁止
      // "@typescript-eslint/switch-exhaustiveness-check": "error", // switch文のexhaustiveness check
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^[e_]",
          "varsIgnorePattern": "^_",
          "caughtErrors": "none"
        }
      ],
    },
  },
];
