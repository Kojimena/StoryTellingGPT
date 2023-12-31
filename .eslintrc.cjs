module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
},
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    semi: ["error", "never"],
    "quotes": ["error", "double"],
    "react/function-component-definition":"off"
  },
}
