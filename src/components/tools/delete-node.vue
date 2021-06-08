<template>
  <el-button
    icon="el-icon-delete"
    circle
    plain
    type="danger"
    @click="delElement"
  />
</template>

<script>
export default {
  name: 'DeleteNodeBtn',
  methods: {
    delElement() {
      this.$store.commit('DELETE_NODE')
    }
  }
}
</script>

<style lang="scss">
</style>
