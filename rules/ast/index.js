'use strict';

const {
	isLiteral,
	isStringLiteral,
	isNumberLiteral,
	isBigIntLiteral,
	isNullLiteral,
	isRegexLiteral,
} = require('./literal.js');

module.exports = {
	isLiteral,
	isStringLiteral,
	isNumberLiteral,
	isBigIntLiteral,
	isNullLiteral,
	isRegexLiteral,

	isArrowFunctionBody: require('./is-arrow-function-body.js'),
	isEmptyNode: require('./is-empty-node.js'),
	isStaticRequire: require('./is-static-require.js'),
	isUndefined: require('./is-undefined.js'),
	isNewExpression: require('./call-or-new-expression.js').isNewExpression,
	isCallExpression: require('./call-or-new-expression.js').isCallExpression,
	isMemberExpression: require('./is-member-expression.js'),
	isMethodCall: require('./is-method-call.js'),
};
