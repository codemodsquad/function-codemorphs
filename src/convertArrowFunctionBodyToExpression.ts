import {
  ASTPath,
  Node,
  FileInfo,
  API,
  Options,
  ArrowFunctionExpression,
} from 'jscodeshift'
import pathsInRange from 'jscodeshift-paths-in-range'

type Filter = (
  path: ASTPath<Node>,
  index: number,
  paths: Array<ASTPath<Node>>
) => boolean

module.exports = function convertArrowFunctionBodyToExpression(
  fileInfo: FileInfo,
  api: API,
  options: Options
): string | null | undefined | void {
  const j = api.jscodeshift

  const root = j(fileInfo.source)

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

  root
    .find(j.ArrowFunctionExpression)
    .filter(filter)
    .forEach(({ node }: ASTPath<ArrowFunctionExpression>): void => {
      const { body } = node
      if (body.type !== 'BlockStatement') return
      if (body.body.length > 1)
        throw new Error('body must only have one statement')
      if (body.body[0].type !== 'ReturnStatement')
        throw new Error('body must have only a return statement')
      /* eslint-disable @typescript-eslint/no-explicit-any */
      node.body = body.body[0].argument as any
      /* eslint-enable @typescript-eslint/no-explicit-any */
    })

  return root.toSource()
}
