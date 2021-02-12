export const input = `
const/* selectionStart *//* selectionEnd */ foo = () => 'hello'
const bar = () => 2
`

export const expected = `
const foo = () => {
  return 'hello'
}
const bar = () => 2
`
