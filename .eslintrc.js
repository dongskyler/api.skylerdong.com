module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true
    },
    "extends": [
        "airbnb-base",
        "prettier"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "rules": {
        "prettier/prettier": "error",
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
    },
    "plugins": [
        "prettier"
    ]
};
