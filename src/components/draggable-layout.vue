<template>
  <draggable
    v-bind="dragOptions"
    :list="state.children"
    :class="['draggable-layout', { 'is-selected': state._uid === node._uid }, state.attrs.class]"
    :style="[state.attrs.style, styleSet]"
    @start="drag = true"
    @end="drag = false"
    @click.stop.native="handleClick"
  >
    <transition-group
      type="transition"
      tag="div"
      class="draggable-wrap"
      :name="!drag ? 'flip-list' : null"
    >
      <template v-for="element in state.children">
        <component
          :is="element.tagName"
          :key="element._uid"
          :state="element"
        />
      </template>
    </transition-group>
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
  data() {
    return {
      drag: false
    }
  },
  computed: {
    dragOptions() {
      return {
        tag: 'div',
        animation: 200,
        group: "layout",
        disabled: false,
        ghostClass: "ghost",
        'data-uid': this.state._uid
      }
    },
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
      this.$store.commit('SELECT_NODE', evt.currentTarget.dataset.uid)
    }
  }
};
</script>

<style lang="scss">
.draggable-layout {
  padding: 10px;
  outline: 1px dashed;
  min-height: 100px;

  .draggable-wrap {
    width: 100%;
    height: 100%;
    display: inherit;
    flex-direction: inherit;
    flex-shrink: inherit;
    flex-basis: inherit;
    flex-grow: inherit;
  }

  &.is-selected {
    outline: 1px solid red;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .list-group {
    min-height: 20px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item > div {
    cursor: pointer;
  }
}
</style>
