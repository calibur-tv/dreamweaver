<template>
  <el-button
    icon="el-icon-plus"
    circle
    plain
    type="success"
    @click="addElement"
  />
</template>

<script>
export default {
  name: 'CreateNodeBtn',
  methods: {
    addElement() {
      this.$store.commit('CREATE_NODE', 'draggable-layout')
    }
  }
}
</script>

<style lang="scss">
</style>
