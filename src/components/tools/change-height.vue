<template>
  <el-input
    v-model="height"
    :disabled="height === 'auto'"
    placeholder="请输入内容"
    class="change-height-input"
  >
    <template slot="prepend">
      设置高度
    </template>
    <el-select
      slot="append"
      v-model="tail"
      placeholder="单位"
    >
      <el-option
        label="自适应"
        value=""
      />
      <el-option
        label="px"
        value="px"
      />
      <el-option
        label="vh"
        value="vh"
      />
    </el-select>
  </el-input>
</template>

<script>
export default {
  name: 'ChangeHeightInput',
  data() {
    return {
      selected: ''
    }
  },
  computed: {
    node() {
      return this.$store.state.node
    },
    height: {
      get() {
        const { height } = this.node.attrs.style
        if (!height) {
          return 'auto'
        }

        if (height === this.tail) {
          return 0
        }

        return parseInt(height)
      },
      set(val) {
        return this.$store.commit('UPDATE_HEIGHT', val ? `${val}${this.tail}` : `0${this.tail}`)
      }
    },
    tail: {
      get() {
        const { height } = this.node.attrs.style
        if (height) {
          return height.replace(/\d/g, '')
        }

        return ''
      },
      set(val) {
        if (!val) {
          return this.$store.commit('UPDATE_HEIGHT', val)
        }

        const height = this.height === 'auto' ? 0 : this.height

        return this.$store.commit('UPDATE_HEIGHT', `${height}${val}`)
      }
    }
  }
}
</script>

<style lang="scss">
.change-height-input {
  .el-select .el-input {
    width: 120px;
  }

  .el-input-group__append {
    background-color: #fff;
  }
}
</style>
