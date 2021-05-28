import Vue from 'vue'
import Vuex from 'vuex'
import { DFSearch, createElement } from './utils'
import { LAYOUT_NAMES } from './enums'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => {
    const newTree = createElement()
    return {
      tree: newTree,
      node: newTree,
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
      state.node.attrs.style.width = data
    }
  },
  actions: {}
})
