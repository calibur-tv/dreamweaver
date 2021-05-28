<template>
  <el-button @click="setLayout">
    设置布局
  </el-button>
</template>

<script>
import { FLEX_COL, FLEX_ROW } from '@/enums'

export default {
  name: 'ChangeLayoutBtn',
  computed: {
    node() {
      return this.$store.state.node
    }
  },
  methods: {
    setLayout() {
      let result = FLEX_COL
      if (this.node.attrs.class.includes(FLEX_COL)) {
        result = FLEX_ROW
      }
      this.$store.commit('SET_LAYOUT', result)
    }
  }
}
</script>

<style lang="scss">
</style>
