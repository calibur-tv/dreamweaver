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
      this.$store.commit('ADD_ELEMENT')
    }
  }
}
</script>

<style lang="scss">
</style>
