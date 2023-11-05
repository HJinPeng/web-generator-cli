<template>
  <component
    :is="comp"
    v-model="dtValue"
    :options="options"
    v-bind="$attrs"
    v-on="$listeners"
    @change="onChange"
  />
</template>
<script>
import { mapActions } from 'vuex'
export default {
  inheritAttrs: false,
  props: {
    value: [String, Number, Array],
    type: {
      type: String,
      default: 'select' // 'select' | 'radio' | 'checkbox'
    },
    dictCode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      options: [],
      dtValue: this._initVal()
    }
  },
  computed: {
    comp() {
      const componentType = {
        select: 'a-select',
        radio: 'a-radio-group',
        checkbox: 'a-checkbox-group'
      }
      return componentType[this.type]
    }
  },
  watch: {
    value(val, oldVal) {
      if (val === oldVal) {
        return
      }
      this.dtValue = this._initVal()
    }
  },
  mounted() {
    this.getDict(this.dictCode).then((options) => {
      this.options = options.map((item) => ({ value: item.dictItemCode, label: item.dictItemName }))
    })
  },
  methods: {
    ...mapActions(['getDict']),
    _initVal() {
      if ((this.type === 'select' && this.$attrs.mode === 'multiple') || this.type === 'checkbox') {
        return [...(this.value || [])]
      }
      if (typeof this.value === 'number') {
        return this.value.toString()
      }
      return this.value
    },
    onChange(param) {
      let value
      if (this.type === 'radio') {
        value = param.target.value
      } else {
        value = param
      }
      this.dtValue = value
      this.$emit('input', this.dtValue)
      this.$emit('change', this.dtValue)
    }
  }
}
</script>
