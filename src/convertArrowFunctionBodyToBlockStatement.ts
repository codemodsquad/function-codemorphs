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

module.exports = function convertArrowFunctionBodyToBlockStatement(
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
      if (body.type === 'BlockStatement') return
      node.body = j.blockStatement([j.returnStatement(body)])
    })

  return root.toSource()
}
