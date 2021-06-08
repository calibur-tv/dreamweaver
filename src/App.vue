<template>
  <draggable-layout
    class="transform-gpu"
    :state="elements"
  />
  <draggable-controller />
  <raw-displayer :value="elements" />
</template>

<script>
import RawDisplayer from './components/raw-displayer'
import DraggableLayout from './components/draggable-layout'
import DraggableController from './components/draggable-controller'

export default {
  name: 'App',
  components: {
    DraggableLayout,
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
