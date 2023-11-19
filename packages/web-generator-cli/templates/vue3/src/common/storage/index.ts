const prefix = import.meta.env.VITE_APP_CODE + '__'

type StorageKey = 'token' | 'dict'

export function getStorageItem(name: StorageKey) {
  return localStorage.getItem(prefix + name)
}

export function setStorageItem(name: StorageKey, value: string) {
  localStorage.setItem(prefix + name, value)
}

export function removeStorageItem(name: StorageKey) {
  localStorage.removeItem(prefix + name)
}

export function clearStorage() {
  const length = localStorage.length
  const keys = []
  for (let i = 0; i < length; i++) {
    const key = localStorage.key(i) || ''
    if (key.startsWith(prefix)) {
      keys.push(key)
    }
  }
  keys.forEach((key) => {
    localStorage.removeItem(key)
  })
}
