import Vue from 'vue'
import Vuex from 'vuex'
import { DFSearch, createElement } from './utils'
import { LAYOUT_NAMES, RECT_SIZE_AUTO, FLEX_COL, FLEX_ROW, FLEX_MAIN_AXIS } from './enums'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => {
    const newTree = createElement()
    return {
      tree: newTree,
      node: newTree,
      parent: null
    }
  },
  mutations: {
    UPDATE_TREE(state, data) {
      state.tree = Vue.set(data)
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
    CREATE_NODE(state) {
      state.node.children.push(createElement('draggable-layout'))
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
      const index = state.node.attrs.class.findIndex(_ => LAYOUT_NAMES.includes(_))
      state.node.attrs.class.splice(index, 1)
      state.node.attrs.class.push(data)

      if (!LAYOUT_NAMES.includes(data)) {
        return
      }

      const mainAxis = data === FLEX_COL ? 'height' : 'width'
      const crossAxis = data === FLEX_COL ? 'width' : 'height'
      state.node.children.forEach(child => {
        let mainAxisValue
        for (const [key, val] of Object.entries(child.attrs.style)) {
          if (key === FLEX_MAIN_AXIS) {
            mainAxisValue = val
          }
        }
        if (mainAxisValue) {
          child.attrs.style[crossAxis] = mainAxisValue
          child.attrs.style[FLEX_MAIN_AXIS] = child.attrs.style[mainAxis]
          // 如果是 fix 定位，那么 flex-basis 无效，还是需要宽高属性
          // child.attrs.style[mainAxis] = ''
        }

        const singleSize = [child.attrs.style.width, child.attrs.style.height].filter(_ => _).length === 1
        const autoIndex = child.attrs.class.indexOf(RECT_SIZE_AUTO)
        /**
         * 如果该元素只设定了宽或高
         * 那么在切换布局时，要选择删除 flex-auto 或加上 flex-auto
         */
        if (singleSize) {
          if (child.attrs.style[mainAxis] && autoIndex > -1) {
            child.attrs.class.splice(autoIndex, 1)
          }

          if (child.attrs.style[crossAxis] && autoIndex === -1) {
            child.attrs.class.push(RECT_SIZE_AUTO)
          }
        }
      })
    },
    UPDATE_SIZE(state, { attr, size }) {
      const isColumn = state.parent.attrs.class.includes(FLEX_COL)
      const isRow = state.parent.attrs.class.includes(FLEX_ROW)
      if (size) {
        Vue.set(state.node.attrs.style, attr, size)
        if (
          (isColumn && attr === 'height') ||
          (isRow && attr === 'width')
        ) {
          Vue.set(state.node.attrs.style, FLEX_MAIN_AXIS, size)
        }
      } else {
        Vue.set(state.node.attrs.style, attr, '')
        if (
          (isColumn && attr === 'height') ||
          (isRow && attr === 'width')
        ) {
          Vue.set(state.node.attrs.style, FLEX_MAIN_AXIS, '')
        }
      }

      const index = state.node.attrs.class.indexOf(RECT_SIZE_AUTO)
      if (index > -1 && state.node.attrs.style.width && state.node.attrs.style.height) {
        state.node.attrs.class.splice(index, 1)
      }

      if (
        index === -1 &&
        ((isColumn && !state.node.attrs.style.height) || (isRow && !state.node.attrs.style.width))
      ) {
        state.node.attrs.class.push(RECT_SIZE_AUTO)
      }
    }
  },
  actions: {}
})
