module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["airbnb-base", "prettier"],

	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		"consistent-return": "off",
		"no-await-in-loop": "off",
		"no-promise-executor-return": "off",
		"no-param-reassign": "off",
	},
};
