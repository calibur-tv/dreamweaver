import { DISPLAY, FLEX_COL, FLEX_NOT_SCALE, RECT_SIZE_AUTO, POS_REL } from './enums'

let uid = 0

export const createElement = (name, data, children) => {
  return {
    _uid: uid++,
    name,
    data: data || {
      class: [DISPLAY, FLEX_COL, RECT_SIZE_AUTO, FLEX_NOT_SCALE, POS_REL],
      style: {}
    },
    children: children || []
  }
}

export const DFSearch = (tree, callback, opts = {}) => {
  const defOpts = {
    _merged: true,
    isBreak: false,
    getChildren: node => node.children,
    context: {
      index: -1,
      parent: null,
      break: () => { options.isBreak = true }
    }
  }
  const options = opts._merged ? opts : {
    ...defOpts,
    ...opts
  }

  callback(tree, options.context)
  if (options.isBreak) {
    return
  }

  const children = options.getChildren(tree)
  if (!children.length) {
    return
  }

  for (let i = 0; i < children.length; i++) {
    options.context.index = i
    options.context.parent = tree
    DFSearch(children[i], callback, options)
    if (options.isBreak) {
      break
    }
  }
}
