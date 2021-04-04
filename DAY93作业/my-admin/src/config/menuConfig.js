import Home from '../views/admin/Home';
import Category from '../views/admin/Product/Category';
import CateList from '../views/admin/Product/CateList';
import CateUpdate from '../views/admin/Product/Cateupdate';
import Role from '../views/admin/Role';
import User from '../views/admin/User';
import Bar from '../views/admin/Charts/Bar';
import Line from '../views/admin/Charts/Line';
import Pie from '../views/admin/Charts/Pie';
import Order from '../views/admin/Order';

const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
    component:Home,
    roles: ['root', 'admin', 'worker']
  },
  {
    title: '分类管理',
    key: '/products',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '发布分类',
        key: '/category',
        icon: 'bars',
        roles: ['root', 'admin', 'worker'],
        component:Category,
      },
      {
        title: '分类列表',
        key: '/catelist',
        icon: 'tool',
        roles: ['root', 'admin', 'worker'],
        component:CateList,
      },
      {
        title: '编辑分类',
        key: '/cateupdate',
        icon: 'tool',
        roles: ['root', 'admin', 'worker'],
        component:CateUpdate,
      },
    ]
  },

  {
    title: '用户管理',
    key: '/user',
    icon: 'user',
    roles: ['root'],
    component:User,
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'safety',
    roles: ['root'],
    component:Role,
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'bar-chart',
        roles: ['root', 'admin'],
        component:Bar,
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'line-chart',
        roles: ['root', 'admin'],
        component:Line,
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'pie-chart',
        roles: ['root', 'admin'],
        component:Pie,
      },
    ]
  },

  {
    title: '订单管理',
    key: '/order',
    icon: 'windows',
    roles: ['root', 'admin'],
    component:Order,
  },
]

export default menuList