<template>
  <el-button @click="addElement">
    添加节点
  </el-button>
</template>

<script>
export default {
  name: 'CreateNodeBtn',
  methods: {
    addElement() {
      this.$store.commit('CREATE_NODE')
    }
  }
}
</script>

<style lang="scss">
</style>
