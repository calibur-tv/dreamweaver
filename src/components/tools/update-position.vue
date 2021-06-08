<template>
  <el-select
    v-model="position"
    placeholder="定位方式"
    class="update-position-select"
  >
    <el-option
      label="相对定位"
      value="relative"
    />
    <el-option
      label="绝对定位"
      value="absolute"
    />
    <el-option
      label="固定定位"
      value="fixed"
    />
  </el-select>
</template>

<script>
import { POS_NAMES } from '@/enums'

export default {
  name: 'UpdatePositionSelect',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    position: {
      get() {
        return this.$store.state.node.attrs.class.find(_ => POS_NAMES.includes(_))
      },
      set(val) {
        return this.$store.commit('UPDATE_POSITION', val)
      }
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
</style>
