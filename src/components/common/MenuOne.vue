<template>
  <div class="menu">
    <el-aside width="200px">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#2578b5"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
      >
        <template v-for="(item, index) in menus" :key="index">
          <el-sub-menu :index="index + ''" v-if="!item.hidden">
            <template #title>
              <el-icon><location /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">item one</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import {
  Document,
  Menu as IconMenu,
  Setting,
  Location,
} from "@element-plus/icons-vue";
export default {
  data() {
    return {
      menus: [],
    };
  },
  created() {
    console.log(this.$router.options.routes);
    this.menus = [...this.$router.options.routes];
  },
};
</script>

<style lang="scss" scoped>
.menu {
  .el-aside {
    height: 100%;
    .el-menu {
      height: 100%;
    }
    .el-submenu .el-menu-item {
      min-width: 0;
    }
  }
}
</style>
