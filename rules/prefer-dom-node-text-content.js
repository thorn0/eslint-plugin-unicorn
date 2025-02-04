'use strict';
const {isMemberExpression} = require('./ast/index.js');

const ERROR = 'error';
const SUGGESTION = 'suggestion';
const messages = {
	[ERROR]: 'Prefer `.textContent` over `.innerText`.',
	[SUGGESTION]: 'Switch to `.textContent`.',
};

const destructuringSelector = [
	'ObjectPattern',
	' > ',
	'Property.properties',
	'[kind="init"]',
	'[computed!=true]',
	' > ',
	'Identifier.key',
	'[name="innerText"]',
].join('');

/** @param {import('eslint').Rule.RuleContext} context */
const create = () => ({
	MemberExpression(memberExpression) {
		if (
			!isMemberExpression(memberExpression, {
				property: 'innerText',
				computed: false,
			})
		) {
			return;
		}

		const node = memberExpression.property;

		return {
			node,
			messageId: ERROR,
			suggest: [
				{
					messageId: SUGGESTION,
					fix: fixer => fixer.replaceText(node, 'textContent'),
				},
			],
		};
	},
	[destructuringSelector](node) {
		return {
			node,
			messageId: ERROR,
			suggest: [
				{
					messageId: SUGGESTION,
					fix: fixer => fixer.replaceText(
						node,
						node.parent.shorthand ? 'textContent: innerText' : 'textContent',
					),
				},
			],
		};
	},
});

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
	create,
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Prefer `.textContent` over `.innerText`.',
		},
		hasSuggestions: true,
		messages,
	},
};
