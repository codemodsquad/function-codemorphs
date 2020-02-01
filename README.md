# function-codemorphs

[![CircleCI](https://circleci.com/gh/jedwards1211/function-codemorphs.svg?style=svg)](https://circleci.com/gh/jedwards1211/function-codemorphs)
[![Coverage Status](https://codecov.io/gh/jedwards1211/function-codemorphs/branch/master/graph/badge.svg)](https://codecov.io/gh/jedwards1211/function-codemorphs)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/function-codemorphs.svg)](https://badge.fury.io/js/function-codemorphs)

codemods for in-IDE refactoring of functions

These aren't really intended to be used with the `jscodeshift` CLI, but rather for building IDE extensions.

# `convertArrowFunctionBodyToBlockStatement`

Converts an arrow function with an expression body to a block statement.

## Before

```js
const foo = () => 'foo!'
```

## After

```js
const foo = () => {
  return 'foo!'
}
```

## Special Options

### `selectionStart` (`number`, **required**)

The start of the selection in the source code. This is used for determining which function to convert.

### `selectionEnd` (`number`, **required**)

The end of the selection in the source code. This is used for determining which function to convert.

# `convertArrowFunctionBodyToExpression`

Converts the block statement body of an arrow function to an expression, as long as the body only
consists of a return statement.

## Before

```js
const foo = () => {
  return 'foo!'
}
```

## After

```js
const foo = () => 'foo!'
```

## Special Options

### `selectionStart` (`number`, **required**)

The start of the selection in the source code. This is used for determining which function to convert.

### `selectionEnd` (`number`, **required**)

The end of the selection in the source code. This is used for determining which function to convert.
