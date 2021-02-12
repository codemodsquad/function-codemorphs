import j, { ASTPath, Node, Options, ArrowFunctionExpression } from 'jscodeshift'
import pathsInRange from 'jscodeshift-paths-in-range'
import { Collection } from 'jscodeshift/src/Collection'

type Filter = (
  path: ASTPath<Node>,
  index: number,
  paths: Array<ASTPath<Node>>
) => boolean

export default function selectedArrowFunctions(
  root: Collection<unknown>,
  options: Options
): Collection<ArrowFunctionExpression> {
  let filter: Filter
  if (options.selectionStart) {
    const selectionStart = parseInt(options.selectionStart)
    const selectionEnd = options.selectionEnd
      ? parseInt(options.selectionEnd)
      : selectionStart
    filter = pathsInRange(selectionStart, selectionEnd)
  } else {
    filter = (): boolean => true
  }

  const paths = [
    ...root
      .find(j.ArrowFunctionExpression)
      .filter(filter)
      .paths(),
  ]

  root
    .find(j.VariableDeclarator)
    .filter(filter)
    .forEach((path: ASTPath<j.VariableDeclarator>) => {
      const init = path.get('init')
      if (init.node && init.node.type === 'ArrowFunctionExpression')
        paths.push(init)
    })

  return j(paths)
}
