<template>
  <el-select
    v-model="layout"
    placeholder="布局方式"
    class="update-layout-select"
  >
    <el-option
      label="竖向布局"
      value="flex-col"
    />
    <el-option
      label="横向布局"
      value="flex-row"
    />
  </el-select>
</template>

<script>
import { LAYOUT_NAMES } from '@/enums'

export default {
  name: 'UpdateLayoutSelect',
  computed: {
    layout: {
      get() {
        return this.$store.state.node.attrs.class.find(_ => LAYOUT_NAMES.includes(_))
      },
      set(val) {
        return this.$store.commit('UPDATE_LAYOUT', val)
      }
    },
  }
}
</script>

<style lang="scss">
</style>
