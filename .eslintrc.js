module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        'plugin:prettier/recommended'  // Enables eslint-plugin-prettier and eslint-config-prettier
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'prettier/prettier': ['error', { singleQuote: true, semi: false }],
        // override/add rules' settings here
    }
}
