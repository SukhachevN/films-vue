module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/vue3-essential', '@vue/airbnb'],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: 'off',
        'linebreak-style': 0,
        'global-require': 0,
        'eslint linebreak-style': [0, 'error', 'windows'],
        'no-unused-vars': 'warn',
        'comma-dangle': 'off',
        'object-curly-newline': 'off',
        'no-confusing-arrow': 'off',
        'implicit-arrow-linebreak': 'off',
        'function-paren-newline': 'off',
        'operator-linebreak': 'off',
    },
};
