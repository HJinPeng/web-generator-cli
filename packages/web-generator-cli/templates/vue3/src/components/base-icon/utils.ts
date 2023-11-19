import { type Component, ref, watch } from 'vue'

// svg集合
let modules: Record<string, unknown>
export function useSvg(icon: string) {
  if (!modules) {
    modules = import.meta.glob('@/assets/svg/**/*.svg', { eager: true })
  }
  const svg = ref<Component>()
  watch(
    () => icon,
    () => {
      const fileName = '/' + icon + '.svg'
      for (const path in modules) {
        const value = modules[path]
        if (path.endsWith(fileName)) {
          svg.value = value as Component
          return
        }
      }
      throw new Error('not found svg file:' + fileName)
    },
    {
      immediate: true
    }
  )

  return {
    svg
  }
}
