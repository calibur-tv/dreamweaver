<template>
  <el-input
    v-model="width"
    placeholder="请输入内容"
    class="change-width-input"
  >
    <template slot="prepend">
      设置宽度
    </template>
    <el-select
      slot="append"
      v-model="tail"
      placeholder="单位"
    >
      <el-option
        label="px"
        value="px"
      />
      <el-option
        label="%"
        value="%"
      />
      <el-option
        label="vw"
        value="vw"
      />
    </el-select>
  </el-input>
</template>

<script>
export default {
  name: 'ChangeWidthInput',
  components: {},
  props: {},
  data() {
    return {
      selected: ''
    }
  },
  computed: {
    node() {
      return this.$store.state.node
    },
    width: {
      get() {
        const width = this.node.attrs.style.width
        if (width === this.tail) {
          return 0
        }
        return parseInt(width)
      },
      set(val) {
        return this.$store.commit('UPDATE_WIDTH', val ? `${val}${this.tail}` : `0${this.tail}`)
      }
    },
    tail: {
      get() {
        return this.node.attrs.style.width.replace(/\d/g, '')
      },
      set(val) {
        return this.$store.commit('UPDATE_WIDTH', `${this.width}${val}`)
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.change-width-input {
  .el-select .el-input {
    width: 120px;
  }

  .el-input-group__append {
    background-color: #fff;
  }
}
</style>
