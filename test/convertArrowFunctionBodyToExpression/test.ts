export const input = `
props => {
  return <div />;
}
props => {
  return (
    <div>
      Foo
    </div>
  )
}
props => {
  return {foo: 'bar'}
}
`

export const expected = `
props => <div />
props => <div>Foo</div>
props => ({
  foo: 'bar'
})
`
