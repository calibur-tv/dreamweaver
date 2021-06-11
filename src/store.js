import { createStore } from 'vuex'
import { DFSearch, createElement } from './utils'
import { LAYOUT_NAMES, RECT_SIZE_AUTO, FLEX_COL, FLEX_ROW, FLEX_MAIN_AXIS, POS_NAMES, POS_REL } from './enums'

export default createStore({
  state: () => {
    const newTree = createElement('div')
    return {
      tree: newTree,
      node: newTree,
      parent: null
    }
  },
  mutations: {
    UPDATE_TREE(state, data) {
      state.tree = data
      DFSearch(state.tree, (node, context) => {
        if (node._uid === state.node._uid) {
          state.parent = context.parent
          context.break()
        }
      })
    },
    SELECT_NODE(state, uid) {
      DFSearch(state.tree, (node, context) => {
        if (node._uid === +uid) {
          state.node = node
          state.parent = context.parent
          context.break()
        }
      })
    },
    CREATE_NODE(state, data) {
      state.node.children.push(createElement(data))
    },
    DELETE_NODE(state) {
      if (!state.parent) {
        return
      }

      const length = state.parent.children.length
      state.parent.children.forEach((item, index) => {
        if (item._uid === state.node._uid) {
          // 删除选中节点
          state.parent.children.splice(index, 1)
          if (index) {
            // 如果选中的节点不是第0个，那就把指针指向上一个
            state.node === state.parent.children[index - 1]
          } else {
            if (length > 1) {
              // 如果子节点的数量大于 1，且选择的是第0个
              state.node === state.parent.children[0]
            } else {
              // 把节点放到父级
              DFSearch(state.tree, (node, context) => {
                if (node._uid === state.parent._uid) {
                  state.node = node
                  state.parent = context.parent
                  context.break()
                }
              })
            }
          }
        }
      })
    },
    UPDATE_LAYOUT(state, data) {
      const index = state.node.data.class.findIndex(_ => LAYOUT_NAMES.includes(_))
      state.node.data.class.splice(index, 1)
      state.node.data.class.push(data)

      if (!LAYOUT_NAMES.includes(data)) {
        return
      }

      const mainAxis = data === FLEX_COL ? 'height' : 'width'
      const crossAxis = data === FLEX_COL ? 'width' : 'height'
      state.node.children.forEach(child => {
        let mainAxisValue
        for (const [key, val] of Object.entries(child.data.style)) {
          if (key === FLEX_MAIN_AXIS) {
            mainAxisValue = val
          }
        }
        if (mainAxisValue) {
          child.data.style[crossAxis] = mainAxisValue
          child.data.style[FLEX_MAIN_AXIS] = child.data.style[mainAxis]
        }

        const singleSize = [child.data.style.width, child.data.style.height].filter(_ => _).length === 1
        const autoIndex = child.data.class.indexOf(RECT_SIZE_AUTO)
        /**
         * 如果该元素只设定了宽或高
         * 那么在切换布局时，要选择删除 flex-auto 或加上 flex-auto
         */
        if (singleSize) {
          if (child.data.style[mainAxis] && autoIndex > -1) {
            child.data.class.splice(autoIndex, 1)
          }

          if (child.data.style[crossAxis] && autoIndex === -1) {
            child.data.class.push(RECT_SIZE_AUTO)
          }
        }
      })
    },
    UPDATE_SIZE(state, { attr, size }) {
      const isColumn = state.parent ? state.parent.data.class.includes(FLEX_COL) : true
      const isRow = state.parent ? state.parent.data.class.includes(FLEX_ROW) : false
      if (size) {
        state.node.data.style[attr] = size
        if (
          (isColumn && attr === 'height') ||
          (isRow && attr === 'width')
        ) {
          state.node.data.style[FLEX_MAIN_AXIS] = size
        }
      } else {
        state.node.data.style[attr] = undefined
        if (
          (isColumn && attr === 'height') ||
          (isRow && attr === 'width')
        ) {
          state.node.data.style[FLEX_MAIN_AXIS] = undefined
        }
      }

      const index = state.node.data.class.indexOf(RECT_SIZE_AUTO)
      if (
        index > -1 &&
        (
          (state.node.data.style.width && state.node.data.style.height) ||
          (state.node.data.style.height && isColumn) ||
          (state.node.data.style.width && isRow)
        )
      ) {
        state.node.data.class.splice(index, 1)
        return
      }

      if (
        index === -1 &&
        ((isColumn && !state.node.data.style.height) || (isRow && !state.node.data.style.width))
      ) {
        state.node.data.class.push(RECT_SIZE_AUTO)
      }
    },
    UPDATE_MARGIN(state, { order, value }) {
      let margin = state.node.data.style.margin
      if (margin) {
        margin = margin.split(' ')
      } else {
        margin = ['0px', '0px', '0px', '0px']
      }
      margin[order] = value
      state.node.data.style.margin = margin.join(' ')
    },
    UPDATE_POSITION(state, value) {
      const oldIndex = state.node.data.class.findIndex(_ => POS_NAMES.includes(_))
      if (oldIndex > -1) {
        state.node.data.class.splice(oldIndex, 1)
      }

      state.node.data.class.push(value)

      if (value === POS_REL) {
        state.node.data.style.transform = undefined
        state.node.data.style.left = undefined
        state.node.data.style.top = undefined
      } else {
        state.node.data.style.left = '0px'
        state.node.data.style.top = '0px'
      }

      if (!state.parent) {
        return
      }

      state.parent.children.forEach((item, index) => {
        if (item._uid === state.node._uid) {
          state.parent.children.splice(index, 1)
        }
      })
      state.parent.children.push(state.node)
    },
    UPDATE_RECT(state, { attr, order, value }) {
      if (order === -1) {
        state.node.data.style[attr] = value
        return
      }
      let transform = state.node.data.style.transform
      if (transform) {
        transform = transform
          .replace('translate(', '')
          .replace(')', '')
          .split(',')
      } else {
        transform = ['0px', '0px']
      }
      transform[order] = value
      state.node.data.style.transform = `translate(${transform.join(',')})`
    }
  },
  actions: {}
})
