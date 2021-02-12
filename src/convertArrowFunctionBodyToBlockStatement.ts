import {
  ASTPath,
  FileInfo,
  API,
  Options,
  ArrowFunctionExpression,
} from 'jscodeshift'
import selectedArrowFunctions from './util/selectedArrowFunctions'

module.exports = function convertArrowFunctionBodyToBlockStatement(
  fileInfo: FileInfo,
  api: API,
  options: Options
): string | null | undefined | void {
  const j = api.jscodeshift

  const root = j(fileInfo.source)

  selectedArrowFunctions(root, options).forEach(
    ({ node }: ASTPath<ArrowFunctionExpression>): void => {
      const { body } = node
      if (body.type === 'BlockStatement') return
      node.body = j.blockStatement([j.returnStatement(body)])
    }
  )

  return root.toSource()
}
