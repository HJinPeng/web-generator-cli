const prefix = process.env.VUE_APP_NAME + '__'

export function getStorageItem(name) {
  return localStorage.getItem(prefix + name)
}

export function setStorageItem(name, value) {
  localStorage.setItem(prefix + name, value)
}

export function removeStorageItem(name) {
  localStorage.removeItem(prefix + name)
}

export function clearStorage() {
  const length = localStorage.length
  const keys = []
  for (let i = 0; i < length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith(prefix)) {
      keys.push(key)
    }
  }
  keys.forEach((key) => {
    localStorage.removeItem(key)
  })
}
