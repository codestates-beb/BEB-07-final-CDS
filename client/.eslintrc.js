module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    rules :{
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "no-unused-vars": ["warn"],
    },
    extends: [
        "airbnb",
        "prettier",
        "plugin:prettier/recommended",
    ],
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaVersion: 2018,
        allowImportExportEverywhere: true,
    }
}