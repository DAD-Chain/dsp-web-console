<template>
  <div class="sendBox fl">
    <div class="leftBox" style="overflow: auto;">
      <h2>Preview your AD</h2>
      <img :src="item.image" alt="" />
      <div class="mainBox fdc jcb">
        <h2>
          {{item.title}}
        </h2>
        <p>
          {{item.content}}
        </p>
        <a :href="item.url"
          >{{item.url}}</a
        >
      </div>
    </div>
    <div class="rightBox fl jcb">
      <div class="successBox" v-if="success">
        <img src="../../assets/imgs/success.png" alt="" />
        <h2>Successfully saved!</h2>
        <p>
	Your ad content has been received.
        It will be displayed when users browse relevant posts.
        </p>
        <a-button class="btn-border" @click="$router.push('/dashboard')"
          ><a-icon type="arrow-left" /> Home</a-button
        >
      </div>
      <div class="errorBox" v-else>
        <img src="../../assets/imgs/fail.png" alt="" />
        <h2>Payment Failed..</h2>
        <p>please try again.</p>
        <a-button class="btn-border" @click="$router.back()" style="cursor: pointer;"
          ><a-icon type="arrow-left" /> Back</a-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "send",
  data() {
    return {
      success: true,
      item:{},
    };
  },
  created(){
    this.item = this.$route.params;
    let { item } = this;
    if (!item.id) {
      this.$router.push("/newPost");
      return;
    }
  },
};
</script>

<style lang="less" scoped>
.sendBox {
  padding: 20px 40px;
  & > div {
    width: 50%;
    height: 530px;
  }
  .leftBox {
    padding-right: 24px;
    border-right: 1px solid #dce6ed;
    img {
      width: 100%;
      margin: 10px 0 24px;
    }
    .mainBox {
      padding: 8px 20px;
      background: #f7fafc;
      border-radius: 4px;
      h2 {
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
      }
      p {
        margin: 8px 0;
        font-size: 12px;
        line-height: 18px;
      }
      a {
        font-size: 14px;
        line-height: 20px;
        color: #0092ff;
        word-break: break-word;
      }
    }
  }
  .rightBox {
    padding: 90px 0 0 88px;
    text-align: center;
    & > div {
      width: 226px;
    }
    h2 {
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;
    }
    p {
      margin-bottom: 50px;
      font-size: 14px;
      line-height: 21px;
    }
    .errorBox {
      p {
        padding-bottom: 76px;
      }
    }
  }
}
</style>
