/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_CODE: string
  VITE_APP_NAME: string
  VITE_APP_TIME_OUT: number
  VITE_APP_MD5: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
