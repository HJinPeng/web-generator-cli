import {
  Button,
  Select,
  Input,
  Icon,
  Modal,
  Table,
  FormModel,
  Radio,
  Checkbox,
  message,
  notification
} from 'ant-design-vue'

const components = [Button, Select, Input, Icon, Modal, Table, FormModel, Radio, Checkbox]

const antdv = {
  install: (Vue) => {
    components.forEach((component) => {
      Vue.use(component)
    })
    Vue.prototype.$message = message
    Vue.prototype.$info = Modal.info
    Vue.prototype.$success = Modal.success
    Vue.prototype.$error = Modal.error
    Vue.prototype.$warning = Modal.warning
    Vue.prototype.$confirm = Modal.confirm
    Vue.prototype.$notification = notification
  }
}

export default antdv
