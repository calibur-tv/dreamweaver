<script>
import { h, resolveComponent } from 'vue'
import randomColor from 'randomcolor'
import { POS_REL } from '@/enums'
import Sortable from '../externals/sortable/Sortable'

const tags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "math",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
]

export default {
  name: 'DraggableLayout',
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    children: {
      type: Array,
      required: true
    }
  },
  computed: {
    previewStyle() {
      return {
        backgroundColor: randomColor({
          luminosity: 'light',
          alpha: 0.05
        })
      }
    },
    node() {
      return this.$store.state.node
    }
  },
  mounted() {
    this.$nextTick(() => {
      new Sortable(this.$el, {
        group: 'layout',
        filter: e => !e.target.classList.contains(POS_REL),
      })
    })
  },
  methods: {
    handleClick(evt) {
      evt.stopPropagation()
      this.$store.commit('SELECT_NODE', this.id)
    }
  },
  render() {
    const isHtmlTag = tags.includes(this.name)
    return h(
        isHtmlTag ? this.name : resolveComponent(this.name),
        {
          id: `dl-${this.id}`,
          props: isHtmlTag ? null : this.data.props,
          style: [this.data.style, this.previewStyle],
          class: ['draggable-layout', { 'is-selected': this.id === this.node._uid }, this.data.class],
          onClick: this.handleClick
        },
        this.children.map(item => {
          return h(
              resolveComponent('DraggableLayout'),
              {
                id: item._uid,
                name: item.name,
                data: item.data,
                children: item.children
              }
          )
        })
    )
  }
}
</script>

<style lang="scss">
.draggable-layout {
  outline: 1px dashed;
  min-height: 50px;
  min-width: 50px;
  padding: 10px;
  transition: box-shadow .1s;

  &.is-selected {
    box-shadow: inset 1px 1px 4px 4px red;
  }

  .sortable-ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
}
</style>
