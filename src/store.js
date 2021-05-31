import Vue from 'vue'
import Vuex from 'vuex'
import { DFSearch, createElement } from './utils'
import { LAYOUT_NAMES, WIDTH_AUTO } from './enums'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => {
    const newTree = createElement()
    return {
      tree: newTree,
      node: newTree,
      parent: null,
      preview: false
    }
  },
  mutations: {
    UPDATE_TREE(state, data) {
      state.tree = Vue.set(data)
    },
    TOGGLE_PREVIEW(state, data) {
      state.preview = data
    },
    UPDATE_NODE(state, uid) {
      DFSearch(state.tree, (node, context) => {
        if (node._uid === +uid) {
          state.node = node
          state.parent = context.parent
          context.break()
        }
      })
    },
    ADD_ELEMENT(state) {
      state.node.children.push(createElement('draggable-layout'))
    },
    DEL_ELEMENT(state) {
      const { tree, node } = state
      DFSearch(tree, (item, context) => {
        if (item._uid === node._uid) {
          if (context.parent) {
            context.parent.children.splice(context.index, 1)
            state.node = context.parent
          }
          context.break()
        }
      })
    },
    SET_LAYOUT(state, data) {
      const index = state.node.attrs.class.findIndex(_ => LAYOUT_NAMES.includes(_))
      state.node.attrs.class.splice(index, 1)
      state.node.attrs.class.push(data)
    },
    UPDATE_WIDTH(state, data) {
      if (data) {
        Vue.set(state.node.attrs.style, 'width', data)
        const index = state.node.attrs.class.indexOf(WIDTH_AUTO)
        if (index > -1) {
          state.node.attrs.class.splice(index, 1)
        }
      } else {
        delete state.node.attrs.style.width
        if (state.node.attrs.class.includes(WIDTH_AUTO)) {
          return
        }
        state.node.attrs.class.push(WIDTH_AUTO)
      }
    }
  },
  actions: {}
})
