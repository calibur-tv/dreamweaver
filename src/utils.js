import { DISPLAY, FLEX_COL, WIDTH_AUTO } from './enums'

let uid = 0

export const createElement = (tagName, attrs, children) => {
  return {
    _uid: uid++,
    tagName,
    attrs: attrs || {
      class: [DISPLAY, FLEX_COL, 'flex-shrink-0', WIDTH_AUTO],
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
  options.context.parent = tree
  for (let i = 0; i < children.length; i++) {
    options.context.index = i
    DFSearch(children[i], callback, options)
    if (options.isBreak) {
      break
    }
  }
}