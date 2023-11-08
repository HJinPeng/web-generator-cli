import http from '@/common/http'

/**
 * 获取所有菜单
 * @author jinpengh
 *
 * @returns {*}
 */
export function getAllMenuApi() {
  /*
  return http({
    url: '/menu/all-menu'
  })
  */
  return Promise.resolve([
    {
      id: 6,
      permissionType: 'menu',
      permissionName: '菜单测试111234',
      menuCode: 'sys',
      permissionCode: null,
      permissionLevel: null,
      icon: null,
      layout: 'LayoutSimple',
      ranking: -1,
      hiddenMenu: '0',
      keepAlive: '1',
      externalLink: '1',
      externalLinkContent: 'asdsddsf',
      status: '1',
      parentId: null,
      deleted: 0,
      createBy: null,
      createByName: null,
      updateBy: 'admin',
      updateByName: '管理员',
      createDateTime: null,
      updateDateTime: '2023-11-02T13:15:35.000Z',
      comment: null,
      children: [
        {
          id: 11,
          permissionType: 'btn',
          permissionName: 'sdf',
          menuCode: null,
          permissionCode: null,
          permissionLevel: null,
          icon: null,
          layout: null,
          ranking: null,
          hiddenMenu: '0',
          keepAlive: '0',
          externalLink: '0',
          externalLinkContent: 'sfsdfdsf',
          status: '1',
          parentId: 6,
          deleted: 0,
          createBy: null,
          createByName: null,
          updateBy: 'admin',
          updateByName: '管理员',
          createDateTime: null,
          updateDateTime: '2023-11-03T00:42:51.000Z',
          comment: null
        }
      ]
    },
    {
      id: 1,
      permissionType: 'menu',
      permissionName: '系统管理',
      menuCode: null,
      permissionCode: null,
      permissionLevel: null,
      icon: 'setting',
      layout: null,
      ranking: 5,
      hiddenMenu: null,
      keepAlive: null,
      externalLink: null,
      externalLinkContent: null,
      status: '1',
      parentId: null,
      deleted: 0,
      createBy: null,
      createByName: null,
      updateBy: 'admin',
      updateByName: '管理员',
      createDateTime: null,
      updateDateTime: '2023-11-03T03:18:41.000Z',
      comment: null,
      children: [
        {
          id: 2,
          permissionType: 'menu',
          permissionName: '菜单管理',
          menuCode: 'MenuManagement',
          permissionCode: null,
          permissionLevel: null,
          icon: 'menu',
          layout: 'LayoutHeaderSidebar',
          ranking: 1,
          hiddenMenu: '0',
          keepAlive: '0',
          externalLink: '0',
          externalLinkContent: null,
          status: '1',
          parentId: 1,
          deleted: 0,
          createBy: null,
          createByName: null,
          updateBy: 'admin',
          updateByName: '管理员',
          createDateTime: null,
          updateDateTime: '2023-11-02T14:00:54.000Z',
          comment: null
        },
        {
          id: 4,
          permissionType: 'menu',
          permissionName: '角色管理',
          menuCode: 'RoleManagement',
          permissionCode: null,
          permissionLevel: null,
          icon: 'crown',
          layout: 'LayoutHeaderSidebar',
          ranking: 5,
          hiddenMenu: '0',
          keepAlive: '0',
          externalLink: '0',
          externalLinkContent: null,
          status: '1',
          parentId: 1,
          deleted: 0,
          createBy: null,
          createByName: null,
          updateBy: 'admin',
          updateByName: '管理员',
          createDateTime: null,
          updateDateTime: '2023-11-02T13:59:35.000Z',
          comment: null
        },
        {
          id: 3,
          permissionType: 'menu',
          permissionName: '用户管理',
          menuCode: 'UserManagement',
          permissionCode: null,
          permissionLevel: null,
          icon: 'user',
          layout: 'LayoutHeaderSidebar',
          ranking: 10,
          hiddenMenu: '0',
          keepAlive: '0',
          externalLink: '0',
          externalLinkContent: null,
          status: '1',
          parentId: 1,
          deleted: 0,
          createBy: null,
          createByName: null,
          updateBy: 'admin',
          updateByName: '管理员',
          createDateTime: null,
          updateDateTime: '2023-11-02T14:01:51.000Z',
          comment: null
        },
        {
          id: 14,
          permissionType: 'menu',
          permissionName: '字典管理',
          menuCode: 'DictManagement',
          permissionCode: null,
          permissionLevel: null,
          icon: 'book',
          layout: 'LayoutHeaderSidebar',
          ranking: 15,
          hiddenMenu: '0',
          keepAlive: '0',
          externalLink: '0',
          externalLinkContent: null,
          status: '1',
          parentId: 1,
          deleted: 0,
          createBy: null,
          createByName: null,
          updateBy: null,
          updateByName: null,
          createDateTime: null,
          updateDateTime: null,
          comment: null
        }
      ]
    },
    {
      id: 15,
      permissionType: 'menu',
      permissionName: '测试专用',
      menuCode: null,
      permissionCode: null,
      permissionLevel: null,
      icon: 'alert',
      layout: null,
      ranking: 10,
      hiddenMenu: '0',
      keepAlive: '0',
      externalLink: '0',
      externalLinkContent: null,
      status: '1',
      parentId: null,
      deleted: 0,
      createBy: null,
      createByName: null,
      updateBy: null,
      updateByName: null,
      createDateTime: null,
      updateDateTime: null,
      comment: null,
      children: [
        {
          id: 16,
          permissionType: 'menu',
          permissionName: '页面栈',
          menuCode: 'TestViewStackFirst',
          permissionCode: null,
          permissionLevel: null,
          icon: 'ordered-list',
          layout: 'LayoutHeaderSidebar',
          ranking: 10,
          hiddenMenu: '0',
          keepAlive: '0',
          externalLink: '0',
          externalLinkContent: null,
          status: '1',
          parentId: 15,
          deleted: 0,
          createBy: null,
          createByName: null,
          updateBy: null,
          updateByName: null,
          createDateTime: null,
          updateDateTime: null,
          comment: null,
          children: [
            {
              id: 17,
              permissionType: 'menu',
              permissionName: 'SecondView',
              menuCode: 'TestViewStackSecond',
              permissionCode: null,
              permissionLevel: null,
              icon: null,
              layout: 'LayoutSidebarHeader',
              ranking: 10,
              hiddenMenu: '1',
              keepAlive: '1',
              externalLink: '0',
              externalLinkContent: null,
              status: '1',
              parentId: 16,
              deleted: 0,
              createBy: null,
              createByName: null,
              updateBy: null,
              updateByName: null,
              createDateTime: null,
              updateDateTime: null,
              comment: null,
              children: [
                {
                  id: 18,
                  permissionType: 'menu',
                  permissionName: 'Thirdiew',
                  menuCode: 'TestViewStackThird',
                  permissionCode: null,
                  permissionLevel: null,
                  icon: null,
                  layout: 'LayoutSidebarHeader',
                  ranking: 10,
                  hiddenMenu: '1',
                  keepAlive: '1',
                  externalLink: '0',
                  externalLinkContent: null,
                  status: '1',
                  parentId: 17,
                  deleted: 0,
                  createBy: null,
                  createByName: null,
                  updateBy: null,
                  updateByName: null,
                  createDateTime: null,
                  updateDateTime: null,
                  comment: null,
                  children: [
                    {
                      id: 19,
                      permissionType: 'menu',
                      permissionName: 'Fourthiew',
                      menuCode: 'TestViewStackFourth',
                      permissionCode: null,
                      permissionLevel: null,
                      icon: null,
                      layout: 'LayoutSidebarHeader',
                      ranking: 10,
                      hiddenMenu: '1',
                      keepAlive: '0',
                      externalLink: '0',
                      externalLinkContent: null,
                      status: '1',
                      parentId: 18,
                      deleted: 0,
                      createBy: null,
                      createByName: null,
                      updateBy: null,
                      updateByName: null,
                      createDateTime: null,
                      updateDateTime: null,
                      comment: null
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ])
}

export function addMenuApi(data) {
  return http({
    url: '/menu/add',
    method: 'post',
    data
  })
}

export function editMenuApi(data) {
  return http({
    url: '/menu/edit',
    method: 'put',
    data
  })
}

export function deleteMenuApi(id) {
  return http({
    url: '/menu/delete/' + id,
    method: 'delete'
  })
}
