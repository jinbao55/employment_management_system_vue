/**
* 左边菜单
*/
<template>
  <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path"
           unique-opened class="el-menu-vertical-demo" background-color="#00152a" text-color="#fff"
           active-text-color="#ffd04b">
    <div class="logobox" style="height: 60px; line-height: 60px; text-align: center">
      <img class="logoimg" src="../assets/img/liang.png" alt="">
      <b style="color: white; font-size: 18px">访企拓岗和就业系统</b>
    </div>
    <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{ menu.menuname }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
          <i class="iconfont" :class="chmenu.icon"></i>
          <span>{{ chmenu.menuname }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import {menu} from '../api/userMG'

export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: false,
      allmenu: []
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 获取图形验证码
    let res = {
      success: true,
      data: [
        {
          menuid: 1,
          icon: 'li-icon-xiangmuguanli',
          menuname: '首页',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 2,
              icon: 'icon-cat-skuQuery',
              menuname: '商品管理',
              hasThird: 'N',
              url: 'goods/Goods',
              menus: null
            }
          ]
        },
        {
          menuid: 33,
          icon: 'li-icon-dingdanguanli',
          menuname: '就业管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 34,
              icon: 'icon-order-manage',
              menuname: '交易订单',
              hasThird: 'N',
              url: 'pay/Order',
              menus: null
            },
            {
              menuid: 35,
              icon: 'icon-provider-manage',
              menuname: '就业统计',
              hasThird: 'N',
              url: 'charts/statistics',
              menus: null
            }
          ]
        },
        {
          menuid: 128,
          icon: 'li-icon-shangchengxitongtubiaozitihuayuanwenjian91',
          menuname: '访企拓岗',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 175,
              icon: 'icon-provider-manage',
              menuname: '合作企业',
              hasThird: 'N',
              url: 'post/Information',
              menus: null
            },
            {
              menuid: 175,
              icon: 'icon-provider-manage',
              menuname: '企业招聘',
              hasThird: 'N',
              url: 'post/Recruit',
              menus: null
            },
            {
              menuid: 175,
              icon: 'icon-provider-manage',
              menuname: '校园招聘会',
              hasThird: 'N',
              url: 'machine/MachineConfig',
              menus: null
            }
          ]
        },
        {
          menuid: 128,
          icon: 'li-icon-shangchengxitongtubiaozitihuayuanwenjian91',
          menuname: '用户管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 72,
              icon: 'icon-cus-manage',
              menuname: '用户管理',
              hasThird: 'N',
              url: 'system/user',
              menus: null
            },
            {
              menuid: 73,
              icon: 'icon-news-manage',
              menuname: '角色管理',
              hasThird: 'N',
              url: 'system/Role',
              menus: null
            },
          ]
        },
        {
          menuid: 71,
          icon: 'li-icon-xitongguanli',
          menuname: '组织架构管理',
          hasThird: null,
          url: null,
          menus: [

            {
              menuid: 174,
              icon: 'icon-cms-manage',
              menuname: '菜单管理',
              hasThird: 'N',
              url: 'system/Module',
              menus: null
            },

            {
              menuid: 74,
              icon: 'icon-cs-manage',
              menuname: '公司管理',
              hasThird: 'N',
              url: 'system/Dept',
              menus: null
            },
            {
              menuid: 75,
              icon: 'icon-promotion-manage',
              menuname: '系统环境变量',
              hasThird: 'N',
              url: 'system/Variable',
              menus: null
            },
            {
              menuid: 76,
              icon: 'icon-cms-manage',
              menuname: '权限管理',
              hasThird: 'N',
              url: 'system/Permission',
              menus: null
            }
          ]
        }
      ],
      msg: 'success'
    }
    this.allmenu = res.data

    // menu(localStorage.getItem('logintoken'))
    //   .then(res => {
    //     console.log(JSON.stringify(res))
    //     if (res.success) {
    //       this.allmenu = res.data
    //     } else {
    //       this.$message.error(res.msg)
    //       return false
    //     }
    //   })
    //   .catch(err => {
    //     this.$message.error('菜单加载失败，请稍后再试！')
    //   })
    // 监听
    this.$root.Bus.$on('toggle', value => {
      this.collapsed = !value
    })
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}

.el-menu-item-group__title {
  padding: 0px;
}

.el-menu-bg {
  background-color: #1f2d3d !important;
}

.el-menu {
  border: none;
}

.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}

.logoimg {
  height: 40px;
}
</style>
