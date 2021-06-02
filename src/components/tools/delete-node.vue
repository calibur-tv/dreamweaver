<template>
  <el-button @click="delElement">
    删除节点
  </el-button>
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
