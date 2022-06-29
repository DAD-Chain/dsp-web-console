<template>
  <div class="mainBox">
    <div class="leftBox">
      <img :src="bannerImgUrl" alt="" />
      <div class="title">
        <h2>DAD 2.0</h2>
        <p>The bridge to connect <span>Web 3.0</span> network</p>
        <p>traffic in the <span>Metaverse era</span>.</p>
      </div>
    </div>
    <div class="rightBox">
      <Login class="loginContent" />
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login";
export default {
  name: "login",
  components: { Login },
  data() {
    return {
      bannerImgUrl: require("../../assets/imgs/bg-login1.png"),
    };
  },
  created() {
    this.setBannerImgByTimes();
  },
  methods: {
    setBannerImgByTimes() {
      var rand = 0;
      var useRand = 0;
      let imgUrlList = [
        require("../../assets/imgs/bg-login1.png"),
        require("../../assets/imgs/bg-login2.png"),
        require("../../assets/imgs/bg-login3.png"),
        require("../../assets/imgs/bg-login4.png"),
        require("../../assets/imgs/bg-login1.png"),
      ];
      let imgNum = imgUrlList.length - 1;
      do {
        var randNum = Math.random();
        rand = Math.round((imgNum - 1) * randNum) + 1;
      } while (rand == useRand);
      useRand = rand;
      this.bannerImgUrl = imgUrlList[useRand];
    },
  },
};
</script>

<style lang="less" scoped>
.mainBox {
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 14px rgba(40, 79, 115, 0.1);
  .leftBox {
    width: 420px;
    height: 420px;
    // background-image: url("../../assets/imgs/bg-login.png");
    background-size: cover;
    position: relative;
    img {
      z-index: -1;
      // opacity: .4;
      width: 420px;
      height: 420px;
    }
    .title {
      position: absolute;
      left: 34px;
      bottom: 44px;
      color: white;
      h2 {
        color: white;
        font-size: 50px;
        font-weight: 600;
      }
      p {
        font-size: 16px;
        color: #f1f2f2;
        span {
          color: #88f7fc;
        }
      }
    }
  }

  .rightBox {
    width: 420px;
    height: 420px;
    padding: 40px;
    background-image: url("../../assets/imgs/bg-icon.png");
    background-size: cover;
    .loginContent {
      width: 100%;
      height: 100%;
    }
  }
}
</style>