import Home from "../pages/admin/home/home";
import Category from "../pages/admin/product/category";
import CateList from "../pages/admin/product/catelist";
import CateUpdate from "../pages/admin/product/cateupdate";
import Product from "../pages/admin/product/product";
import User from "../pages/admin/user/user";
import Role from "../pages/admin/role/Role";
import Bar from "../pages/admin/charts/bar";
import Pie from "../pages/admin/charts/pie";
import Line from "../pages/admin/charts/line";
const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
    component:Home,
    roles:['root','admin','worker']
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
        component: Category,
        roles: ['root', 'admin', 'worker']
      },
      {
        title: '分类列表',
        key: '/catelist',
        icon: 'tool',
        component: CateList,
        roles: ['root', 'admin', 'worker']
      },
      {
        title:'编辑分类',
        key: '/cateupdate',
        icon: 'tool',
        component: CateUpdate,
        roles: ['root', 'admin', 'worker']
      },
    ]
  },

  {
    title: '用户管理',
    key: '/user',
    icon: 'user',
    component: User,
    roles: ['root']
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'safety',
    component: Role,
    roles: ['root']
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
        component: Bar,
        roles: ['root', 'admin']
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'line-chart',
        component: Line,
        roles: ['root', 'admin']
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'pie-chart',
        component: Pie,
        roles: ['root', 'admin']
      },
    ]
  },

  {
    title: '订单管理',
    key: '/order',
    icon: 'windows',
    component: Product,
    roles: ['root', 'admin']
  },
]

export default menuList