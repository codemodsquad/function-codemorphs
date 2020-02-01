export const input = `
const foo = () => /* selectionStart *//* selectionEnd */'hello'
const bar = () => 2
`

export const expected = `
const foo = () => {
  return 'hello'
}
const bar = () => 2
`
