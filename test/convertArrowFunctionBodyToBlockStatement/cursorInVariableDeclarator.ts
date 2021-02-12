export const input = `
const baz = 3, /* selectionStart *//* selectionEnd */foo = () => 'hello'
const bar = () => 2
`

export const expected = `
const baz = 3, foo = () => {
  return 'hello'
}
const bar = () => 2
`
