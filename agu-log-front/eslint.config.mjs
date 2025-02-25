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
    settings: {
      react: {
        version: "detect" // 自動的に React のバージョンを検出
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // JSX に React の import を強制しない
      // "react/jsx-runtime": "error" // `react/jsx-runtime` を使う
    },
  },
  {
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^[e_]",
          "varsIgnorePattern": "^_",
          "caughtErrors": "none"
        }
      ],
      "@typescript-eslint/switch-exhaustiveness-check": "error", // switch文のexhaustiveness check
    }
  }
];
