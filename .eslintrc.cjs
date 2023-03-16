module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:prettier/recommended",
	],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
		'project': './tsconfig.json',
	},
	'plugins': [
		'@typescript-eslint', 'import'
	],
	"rules": {
		"import/order": [
			"error",
			{
			  "groups": [
				"builtin",
				"external",
				"internal",
				"parent",
				"sibling",
				"index",
				"object",
				"type"
			  ]
			}
		],
		"@typescript-eslint/no-misused-promises": "off",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/no-unsafe-member-access": 'off',
		"@typescript-eslint/no-namespace": "off",
	}
};
