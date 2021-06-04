<template>
  <draggable
    v-bind="dragOptions"
    :list="state.children"
    :class="['draggable-layout', { 'is-selected': state._uid === node._uid }, state.attrs.class]"
    :style="[state.attrs.style, previewStyle]"
    tag="transition-group"
    :component-data="{
      tag: 'div',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null
    }"
    item-key="_uid"
    @add="handleAdd"
    @end="handleEnd"
    @move="handleMove"
    @sort="handleSort"
    @start="handleStart"
    @clone="handleClone"
    @filter="handleFilter"
    @change="handleChange"
    @remove="handleRemove"
    @update="handleUpdate"
    @choose="handleChoose"
    @unchoose="handleUnchoose"
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
import draggable from 'vuedraggable'
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
        animation: 200,
        group: 'layout',
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
    },
    handleStart() {
      this.drag = true
    },
    handleEnd() {
      this.drag = false
      console.log('handleEnd')
    },
    handleChoose() {
      console.log('handleChoose')
    },
    handleUnchoose() {
      console.log('handleUnchoose')
    },
    handleAdd() {
      console.log('handleAdd')
    },
    handleUpdate() {
      console.log('handleUpdate')
    },
    handleMove() {
      console.log('handleMove')
    },
    handleSort() {
      console.log('handleSort')
    },
    handleRemove() {
      console.log('handleRemove')
    },
    handleFilter() {
      console.log('handleFilter')
    },
    handleChange() {
      console.log('handleChange')
    },
    handleClone() {
      console.log('handleClone')
    }
  }
};
</script>

<style lang="scss">
.draggable-layout {
  outline: 1px dashed;
  min-height: 50px;
  padding: 10px;

  &.is-selected {
    outline: 1px solid red;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .sortable-ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .list-group {
    min-height: 20px;
  }
}
</style>
