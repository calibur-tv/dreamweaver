<template>
  <el-input
    v-model="width"
    :disabled="width === 'auto'"
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
        label="自适应"
        value=""
      />
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
import { WIDTH_AUTO } from '@/enums'

export default {
  name: 'ChangeWidthInput',
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
        if (this.node.attrs.class.includes(WIDTH_AUTO)) {
          return 'auto'
        }

        const { width } = this.node.attrs.style
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
        if (this.node.attrs.class.includes(WIDTH_AUTO)) {
          return ''
        }

        return this.node.attrs.style.width.replace(/\d/g, '')
      },
      set(val) {
        if (!val) {
          return this.$store.commit('UPDATE_WIDTH', val)
        }

        const width = this.width === 'auto' ? 0 : this.width

        return this.$store.commit('UPDATE_WIDTH', `${width}${val}`)
      }
    }
  }
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
