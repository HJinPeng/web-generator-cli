<script setup lang="ts">
import { computed, onBeforeMount, ref, useAttrs } from 'vue'
import { useDictStore } from '@/stores/dict'

type ModelValue = string | number | Array<string | number> | undefined
type ComponentType = 'select' | 'radio' | 'checkbox'
const props = withDefaults(
  defineProps<{
    value: ModelValue
    type?: ComponentType
    dictCode: string
  }>(),
  {
    type: 'select'
  }
)

const emits = defineEmits<{
  (e: 'update:value', value: ModelValue): void
  (e: 'change', value: ModelValue): void
}>()

const attrs = useAttrs()

const componentNameMap: Record<ComponentType, string> = {
  select: 'a-select',
  radio: 'a-radio-group',
  checkbox: 'a-checkbox-group'
}

const antdComp = computed(() => componentNameMap[props.type])

const options = ref<{ label: string; value: string }[]>([])

const dtValue = computed({
  get() {
    return props.value
  },
  set(value) {
    emits('update:value', value)
    emits('change', value)
  }
})

const dictStore = useDictStore()
onBeforeMount(() => {
  dictStore.getDict(props.dictCode).then((_options) => {
    options.value = _options.map((item) => ({ value: item.dictItemCode, label: item.dictItemName }))
  })
})
</script>

<template>
  <component :is="antdComp" v-model:value="dtValue" :options="options" v-bind="attrs" />
</template>
