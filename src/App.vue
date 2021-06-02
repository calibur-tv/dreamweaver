<template>
  <div>
    <div class="controls w-full flex-shrink-0">
      <createNodeBtn />
      <deleteNodeBtn />
      <UpdateLayoutBtn />
      <UpdateSizeInput attr="width" />
      <UpdateSizeInput attr="height" />
    </div>
    <div
      class="w-full flex-1"
      @click.stop.prevent="handleClick"
    >
      <draggable-layout :state="elements" />
      <raw-displayer
        :value="elements"
        title="state"
      />
    </div>
  </div>
</template>

<script>
import createNodeBtn from './components/tools/create-node'
import deleteNodeBtn from './components/tools/delete-node'
import UpdateLayoutBtn from './components/tools/update-layout'
import UpdateSizeInput from './components/tools/update-size'
import draggableLayout from './components/draggable-layout'
import rawDisplayer from './components/raw-displayer'

export default {
  name: 'App',
  components: {
    createNodeBtn,
    deleteNodeBtn,
    UpdateLayoutBtn,
    UpdateSizeInput,
    draggableLayout,
    rawDisplayer
  },
  data() {
    return {}
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
  },
  methods: {
    handleClick() {
      this.$store.commit('SELECT_NODE', this.elements._uid)
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

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.controls {
  height: 200px;
  background-color: #fefefe;
}
</style>
