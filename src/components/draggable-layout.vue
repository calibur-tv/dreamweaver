<template>
  <draggable
    tag="div"
    :list="state.children"
    group="layout"
    class="draggable-layout"
    :class="[{ 'is-selected': state._uid === node._uid }, state.attrs.class]"
    :style="[state.attrs.style, styleSet]"
    :data-uid="state._uid"
    @click.stop.native="handleClick"
  >
    <template v-for="element in state.children">
      <component
        :is="element.tagName"
        :key="element._uid"
        :state="element"
      />
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import randomColor from 'randomcolor'

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
    styleSet() {
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
      this.$store.commit('UPDATE_NODE', evt.target.dataset.uid)
    }
  }
};
</script>

<style lang="scss">
.draggable-layout {
  padding: 10px;
  outline: 1px dashed;
  min-height: 100px;

  &.is-selected {
    outline: 1px solid red;
  }
}
</style>
