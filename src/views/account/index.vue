<template>
  <div class="accountBox">
    <headBox />
    <main>
      <div class="topBox fl jcb">
        <b class="btn-noBorder fl ai" @click="$router.back()" style="cursor: pointer;"
          ><img src="../../assets/imgs/icon-left.png" />Back</b
        >
        <!-- <span class="successText" v-if="$route.meta.status == 1"
          >Save success!</span
        > -->
        <div
          class="fl ai"
          v-if="$route.meta.status == 2"
          style="color: #285f87; font-size: 14px;cursor: pointer;"
          @click="$router.push('/account/transactionHistory')"
        >
          <a-icon type="profile" theme="filled" style="margin-right: 4px" />
          <span>History</span>
        </div>
      </div>
      <div class="contentBox">
        <router-view />
      </div>
    </main>
    <footBox />
  </div>
</template>

<script>
import headBox from "@/components/headBox";
import footBox from "@/components/footBox";
export default {
  name: "account",
  components: { headBox, footBox },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
main {
  margin-top: 14px;
  background: #ffffff;
  box-shadow: 0 10px 14px rgba(40, 79, 115, 0.1);
  border-radius: 6px;
  .topBox {
    padding: 32px 42px;
    background: #f7fafc;
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
    .successText {
      font-weight: 600;
      font-size: 16px;
      color: #11cb88;
    }
  }
  .contentBox {
    min-height: 600px;
  }
}
</style>
