<template>
  <draggable
    v-bind="dragOptions"
    :list="state.children"
    :class="['draggable-layout', { 'is-selected': state._uid === node._uid }, state.attrs.class]"
    :style="[state.attrs.style, previewStyle]"
    item-key="_uid"
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
import draggable from '../externals/draggable/vuedraggable.js'
import { POS_REL } from '@/enums'

export default {
  name: "DraggableLayout",
  components: {
    draggable
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
        group: 'layout',
        filter: e => !e.target.classList.contains(POS_REL),
        'data-uid': this.state._uid
      }
    },
    previewStyle() {
      return {
        backgroundColor: randomColor({
          luminosity: 'light',
          alpha: 0.1
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

  &.is-selected {
    outline: 1px solid red;
  }

  .sortable-ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
}
</style>
