import {
  Button,
  Input,
  Select,
  Checkbox,
  Radio,
  Table,
  Form,
  InputNumber,
  Modal
} from 'ant-design-vue'
import type { Plugin } from 'vue'

const components = [Button, Input, Select, Checkbox, Radio, Table, Form, InputNumber, Modal]

const registerAntdv: Plugin = {
  install(app) {
    components.forEach((comp) => {
      app.use(comp)
    })
  }
}
export default registerAntdv
