<template>
  <div class="flex flex-row">
    <draggable-layout
      :id="elements._uid"
      :name="elements.name"
      :data="elements.data"
      :children="elements.children"
      class="transform-gpu"
    />
    <draggable-component class="flex-shrink-0" />
  </div>
  <raw-displayer :value="elements" />
  <draggable-controller />
</template>

<script>
import RawDisplayer from './components/raw-displayer'
import DraggableLayout from './components/draggable-layout'
import DraggableComponent from './components/draggable-component'
import DraggableController from './components/draggable-controller'

export default {
  name: 'App',
  components: {
    DraggableLayout,
    DraggableComponent,
    DraggableController,
    RawDisplayer
  },
  computed: {
    elements: {
      get() {
        return this.$store.state.tree
      },
      set(value) {
        this.$store.commit('UPDATE_TREE', value)
      }
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
