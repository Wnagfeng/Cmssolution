import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'
import CompanyManagement from '../views/CompanyManagement.vue'
import EmployeeManagement from '../views/EmployeeManagement.vue'
import DepartmentManagement from '../views/DepartmentManagement.vue'
import RoleManagement from '../views/RoleManagement.vue'
import CompanyProfile from '@/views/CompanyProfile.vue'
import Tabel from '@/views/Tabel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/company"
    },
    {
      path: '/companyProfile',
      name: '公司简介',
      component: Layout,
      children: [
        {
          path: '', // Child route with an empty string as path
          name: '公司简介',
          component: CompanyProfile,
          meta: {
            title: '公司简介',
            isSingle: true  // Adding isSingle flag
          }
        },
      ]
    },
    {
      path: '/',
      name: '常见业务',
      component: Layout,
      meta: {
        title: '常见业务',
        icon: "Setting"
      },
      redirect: '/company',
      children: [
        {
          path: 'company',
          name: 'Tree',
          component: CompanyManagement,
          meta: {
            title: 'Tree',
            icon: "Document"
          }
        },
        {
          path: 'employees',
          name: '页面打印',
          component: EmployeeManagement,
          meta: {
            title: '页面打印',
            icon: "Document"
          }
        },
        {
          path: 'departments',
          name: 'Excel导入导出',
          component: DepartmentManagement,
          meta: {
            title: 'Excel导入导出',
            icon: "Document"
          }
        },
        {
          path: 'roles',
          name: '按钮权限控制',
          component: RoleManagement,
          meta: {
            title: '按钮权限控制',
            icon: "Document"
          }
        },
        {
          path: 'tabel',
          name: '动态表格',
          component: Tabel,
          meta: {
            title: '动态表格',
            icon: "Document"
          }
        },

      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
