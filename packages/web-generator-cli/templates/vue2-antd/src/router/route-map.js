// 静态路由映射表
export const staticRouteMap = {
  Login: {
    title: '登录',
    path: '/login',
    componentPath: 'views/login/LoginView.vue',
    layout: 'LayoutSimple'
  },
  Welcome: {
    title: '欢迎页',
    path: '/',
    componentPath: 'views/welcome/WelcomeView.vue',
    layout: 'LayoutSidebarHeader'
  },
  404: {
    title: '未找到资源',
    path: '/404',
    componentPath: 'views/exceptions/NotFound.vue',
    layout: 'LayoutSimple'
  },
  403: {
    title: '没有权限访问该资源',
    path: '/403',
    componentPath: 'views/exceptions/NoPermission.vue',
    layout: 'LayoutSimple'
  }
}

// 动态路由映射表
export const dynamicRouteMap = {
  MenuManagement: {
    title: '菜单管理',
    path: '/menu-management',
    componentPath: 'views/system/menu/MenuManagement.vue',
    layout: 'LayoutSidebarHeader'
  },
  UserManagement: {
    title: '用户管理',
    path: '/user-management',
    componentPath: 'views/system/user/UserManagement.vue',
    layout: 'LayoutSidebarHeader'
  },
  RoleManagement: {
    title: '角色管理',
    path: '/role-management',
    componentPath: 'views/system/role/RoleManagement.vue',
    layout: 'LayoutSidebarHeader'
  },
  DictManagement: {
    title: '字典管理',
    path: '/dict-management',
    componentPath: 'views/system/dict/DictManagement.vue',
    layout: 'LayoutSidebarHeader'
  },

  // TEST: 测试专用
  TestViewStackFirst: {
    title: 'FirstView',
    path: '/test/view-stack/first',
    componentPath: 'views/test/view-stack/FirstView.vue',
    layout: 'LayoutSidebarHeader'
  },
  TestViewStackSecond: {
    title: 'SecondView',
    path: '/test/view-stack/second/:id',
    componentPath: 'views/test/view-stack/SecondView.vue',
    layout: 'LayoutSidebarHeader'
  },
  TestViewStackThird: {
    title: 'Thirdiew',
    path: '/test/view-stack/third',
    componentPath: 'views/test/view-stack/ThirdView.vue',
    layout: 'LayoutSidebarHeader'
  },
  TestViewStackFourth: {
    title: 'Fourthiew',
    path: '/test/view-stack/fourth/:id',
    componentPath: 'views/test/view-stack/FourthView.vue',
    layout: 'LayoutSidebarHeader'
  }
}

// 所有路由映射表
export const allRouteMap = {
  ...staticRouteMap,
  ...dynamicRouteMap
}
