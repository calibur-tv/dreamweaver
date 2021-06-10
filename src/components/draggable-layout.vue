<template>
  <draggable
    v-bind="dragOptions"
    :list="state.children"
    :class="['draggable-layout', { 'is-selected': state._uid === node._uid }, state.attrs.class]"
    :style="[state.attrs.style, previewStyle]"
    item-key="_uid"
    @end="handleChange"
    @click.stop.prevent="handleClick"
  >
    <template #item="{ element }">
      <component
        :is="element.tagName"
        :state="element"
      />
    </template>
  </draggable>
</template>

<script>
import randomColor from 'randomcolor'
import Draggable from '../externals/draggable/vuedraggable.js'
import { POS_REL } from '@/enums'

export default {
  name: "DraggableLayout",
  components: {
    Draggable
  },
  props: {
    state: {
      required: true,
      type: Object
    }
  },
  computed: {
    dragOptions() {
      return {
        id: `dl-${this.state._uid}`,
        group: 'layout',
        filter: e => !e.target.classList.contains(POS_REL),
        'data-uid': this.state._uid
      }
    },
    previewStyle() {
      return {
        backgroundColor: randomColor({
          luminosity: 'light',
          alpha: 0.05
        })
      }
    },
    node() {
      return this.$store.state.node
    }
  },
  methods: {
    handleClick(evt) {
      this.$store.commit('SELECT_NODE', evt.currentTarget.dataset.uid)
    },
    handleChange() {
      this.$store.commit('UPDATE_TREE', this.$store.state.tree)
    }
  }
};
</script>

<style lang="scss">
.draggable-layout {
  outline: 1px dashed;
  min-height: 50px;
  min-width: 50px;
  padding: 10px;
  transition: box-shadow .1s;

  &.is-selected {
    box-shadow: inset 1px 1px 4px 4px red;
  }

  .sortable-ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
}
</style>
