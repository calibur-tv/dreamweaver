<template>
  <div
    :data-uid="state._uid"
    :class="['draggable-layout', { 'is-selected': state._uid === node._uid }, state.attrs.class]"
    :style="[state.attrs.style, previewStyle]"
    @click.stop.prevent="handleClick"
  >
    <template
      v-for="element in state.children"
      :key="element._uid"
    >
      <component
        :is="element.tagName"
        :state="element"
      />
    </template>
  </div>
</template>

<script>
import interact from 'interactjs'
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
  computed: {
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
  mounted() {
    interact(this.$el).resizable({
      edges: { left: false, right: true, bottom: true, top: false },
      listeners: {
        move: (event) => {
          console.log(event)
          var target = event.target
          var x = (parseFloat(target.getAttribute('data-x')) || 0)
          var y = (parseFloat(target.getAttribute('data-y')) || 0)

          target.style.width = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'

          // translate when resizing from top or left edges
          x += event.deltaRect.left
          y += event.deltaRect.top

          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
        }
      }
    })
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
