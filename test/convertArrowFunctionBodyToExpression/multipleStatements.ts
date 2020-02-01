export const input = `
props => {
  const bar = 'baz';
  return <div />;
}
`

export const expectedError = 'body must only have one statement'
