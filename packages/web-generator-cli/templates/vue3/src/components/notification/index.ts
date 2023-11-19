import { notification } from 'ant-design-vue'
const [notificationApi, notificationContextHolder] = notification.useNotification()
export { notificationApi, notificationContextHolder }
