<template>
  <div style="display: flex;">
    <div class="home-icon" @click="$router.push('/dashboard')">
      <img src="../assets/imgs/home-icon.png" alt="" />
    </div>
    <div class="headBox fl jcb ai" style="flex:1;">
      <a-button
        class="btn-white"
        style="border: none; width: auto !important; padding: 0 12px !important;box-shadow: 0px 0px 10px -3px #aaa;"
        @click="$router.push('/account')"
        ><img src="../assets/imgs/icon-metamask.png" />{{
          userInfo.name
        }}</a-button
      >
      <span @click="singout"
        ><a style="padding: 10px">Disconnect wallet</a></span
      >
    </div>
  </div>
</template>

<script>
import { logout } from "@/tools/api/login";
export default {
  data() {
    return { userInfo: {} };
  },
  created() {
    this.userInfo = this.$getCache("userInfo");
  },
  methods: {
    singout() {
      let taht = this;
      console.log("singout");
      this.$confirm({
        title: "Are you sure to exit?",
        onOk() {
          logout().then((res) => {
            taht.$message.info("Account has been exited");
            localStorage.clear();
            taht.$router.push("/");
          });
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style lang="less" scoped>
.btn-white:hover{
  box-shadow: 0px 0px 10px -3px #337ac5!important;
}
.home-icon {
  padding: 2px;
  background: #fff;
  margin-right: 15px;
  border-radius: 50%;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px -3px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  // color: #337ac5;
  color: #aaa;
  img{
    width: 100%;
    height: 100%;
  }
}
.home-icon:hover {
  color: #337ac5;
}
.headBox {
  span {
    font-weight: 600;
    font-size: 14px;
    color: #285f87;
  }
}
</style>