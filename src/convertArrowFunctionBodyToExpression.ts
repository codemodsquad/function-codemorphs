import {
  ASTPath,
  Node,
  FileInfo,
  API,
  Options,
  ArrowFunctionExpression,
} from 'jscodeshift'
import selectedArrowFunctions from './util/selectedArrowFunctions'

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

  selectedArrowFunctions(root, options).forEach(
    ({ node }: ASTPath<ArrowFunctionExpression>): void => {
      const { body } = node
      if (body.type !== 'BlockStatement') return
      if (body.body.length > 1)
        throw new Error('body must only have one statement')
      if (body.body[0].type !== 'ReturnStatement')
        throw new Error('body must have only a return statement')
      /* eslint-disable @typescript-eslint/no-explicit-any */
      node.body = body.body[0].argument as any
      /* eslint-enable @typescript-eslint/no-explicit-any */
    }
  )

  return root.toSource()
}
