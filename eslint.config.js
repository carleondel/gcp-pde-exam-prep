import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    // Build output and the generated question banks. The banks are data,
    // not hand-written source: gcp-pca/questions.js alone is ~14k lines of
    // serialized JSON, and linting it says nothing useful while making
    // every run slow.
    ignores: [
      "dist/**",
      "node_modules/**",
      "src/certs/*/questions.js",
      "src/certs/*/case-studies.js",
    ],
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Breaking the rules of hooks produces bugs that surface as
      // corrupted state rather than as errors, so this one fails the build.
      "react-hooks/rules-of-hooks": "error",

      // A warning on purpose. App.jsx has ~60 hand-written dependency
      // arrays; some omissions are deliberate. Turning this to error now
      // would mean either a large risky sweep or a wall of disable
      // comments. It stays visible so the count can come down over time.
      "react-hooks/exhaustive-deps": "warn",

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  {
    files: ["**/*.test.{js,jsx}"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];
