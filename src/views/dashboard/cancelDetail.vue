<template>
  <div class="pageBox">
    <b class="btn-noBorder fl ai" @click="$router.push('/dashboard')" style="cursor: pointer;"
      ><img src="../../assets/imgs/icon-left.png" />Back</b
    >
    <div class="resultBox">
      <img src="../../assets/imgs/success.png" />
      <h4>Thanks for your support!</h4>
      <p>Your advertisement will be ended.</p>
    </div>
    <div class="infoBox">
      <div class="title fl jcb">
        <h4>{{item.title}}</h4>
        <a-button class="Ended">Ended</a-button>
      </div>
      <div class="contentBox fl">
        <img :src="item.image" />
        <div class="textInfoBox fl fdc jcb">
          <div class="fl jcb">
            <span>Duration</span>
            <p>{{$timeFormatting(item.createdTime)}}</p>
          </div>
          <div class="fl jcb">
            <span>Click</span>
            <p>{{ item.clicks }}</p>
          </div>
          <div class="fl jcb">
            <span>Pageviews</span>
            <p>{{ item.views }}</p>
          </div>
          <div class="fl jcb">
            <span>Cost</span>
            <p>53.4 DAD</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cancelDetail",
  data() {
    return {
      item: {},
    };
  },
  created() {
    this.item = this.$route.params;
    let { item } = this;
    if (!item.id) {
      this.$router.push("/dashboard");
      return;
    }
  },
};
</script>

<style lang="less" scoped>
.pageBox {
  padding: 26px 40px;
  .btn-noBorder {
    width: auto !important;
    border: none;
    font-size: 16px;
    font-weight: 800;
    line-height: 24px;

    img {
      margin-right: 8px;
    }
  }

  .resultBox {
    text-align: center;
    h4 {
      font-weight: 600;
      font-size: 18px;
      line-height: 32px;
    }
    p {
      font-size: 14px;
      line-height: 32px;
    }
  }

  .infoBox {
    background: #f7fafc;
    border-radius: 4px;
    overflow: hidden;
    .title {
      padding: 10px 40px;
      background: #ebf4ff;
      h4 {
        width: 450px;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
      }
      .Ended {
        width: 80px !important;
        font-weight: 500;
        font-size: 14px;
        color: #285f87;
        background: #d5e2f1 !important;
      }
    }
    .contentBox {
      padding: 18px 40px;
      img {
        width: 320px;
        height: 160px;
      }
      .textInfoBox {
        width: calc(100% - 320px - 34px);
        margin-left: 34px;
        span {
          font-size: 12px;
          line-height: 24px;
        }
        p {
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
        }
      }
    }
  }
}
</style>