<template>
  <div>
    <div class="controls w-full flex-shrink-0 relative">
      <div>
        <createNodeBtn />
        <deleteNodeBtn />
        <UpdateLayoutSelect />
        <updatePositionSelect />
      </div>
      <div>
        <UpdateSizeInput attr="width" />
        <UpdateSizeInput attr="height" />
      </div>
      <div>
        <UpdateMergeInput attr="top" />
        <UpdateMergeInput attr="right" />
        <UpdateMergeInput attr="bottom" />
        <UpdateMergeInput attr="left" />
      </div>
      <div>
        <updateRectInput attr="top" />
        <updateRectInput attr="left" />
        <updateRectInput attr="translate-x" />
        <updateRectInput attr="translate-y" />
      </div>
    </div>
    <div
      class="w-full flex-1 relative transform-gpu"
      @click.stop.prevent="handleClick"
    >
      <draggable-layout :state="elements" />
      <raw-displayer
        :value="elements"
        :style="{ backgroundColor: 'transparent' }"
        title="state"
        @click.stop.prevent="testClick"
      />
    </div>
  </div>
</template>

<script>
import rawDisplayer from './components/raw-displayer'
import draggableLayout from './components/draggable-layout'
import createNodeBtn from './components/tools/create-node'
import deleteNodeBtn from './components/tools/delete-node'
import UpdateLayoutSelect from './components/tools/update-layout'
import UpdateSizeInput from './components/tools/update-size'
import UpdateMergeInput from './components/tools/update-margin'
import updatePositionSelect from './components/tools/update-position'
import updateRectInput from './components/tools/update-rect'

export default {
  name: 'App',
  components: {
    createNodeBtn,
    deleteNodeBtn,
    UpdateLayoutSelect,
    UpdateSizeInput,
    draggableLayout,
    UpdateMergeInput,
    updatePositionSelect,
    updateRectInput,
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
    },
    testClick() {
      console.log('testClick')
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

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
