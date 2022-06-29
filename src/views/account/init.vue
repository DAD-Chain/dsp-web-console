<template>
  <div class="pageBox">
    <div class="infoBox">
      <div class="topBox fl jcb ai">
        <img src="../../assets/imgs/icon-DAD.png" alt="" />
        <span>{{ userInfo.id }}</span>
        <a-icon type="copy" style="cursor: pointer;" @click="$copyText(userInfo.id).then(() => {$message.success('Copy succeeded')})"/>
      </div>
      <div class="contentBox fl jcb ai">
        <p>Available balance</p>
        <h2>{{ userInfo.balance }} DAD</h2>
      </div>
      <div class="bottomBox fl jca ai">
        <div class="fl ai" @click="$router.push('/account/depositCrypto')" style="cursor: pointer;">
          <a-icon type="plus-circle" theme="filled" />
          <span>Deposit</span>
        </div>
        <a-divider type="vertical" style="height: 22px" />
        <div class="fl ai" @click="$router.push('/account/transactionHistory')" style="cursor: pointer;">
          <a-icon type="profile" theme="filled" />
          <span>History</span>
        </div>
      </div>
    </div>
    <div class="iptBox">
      <div>
        <h4>Acount name</h4>
        <a-input v-model="userInfo.name" />
      </div>
      <div>
        <h4>Email</h4>
        <a-input v-model="userInfo.email" />
      </div>
    </div>
    <div style="text-align: right">
      <a-button class="btn-blue" size="small" @click="putProfileFn"
        >Save</a-button
      >
    </div>
  </div>
</template>

<script>
import { putProfile } from "@/tools/api/account";
export default {
  name: "init",
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.$updateUserCache().then((Res) => {
        this.userInfo = this.$getCache("userInfo");
    });
  },
  methods: {
    putProfileFn() {
      let { name, email } = this.userInfo;
      putProfile({ name, Email: email }).then((putProfile) => {
        this.$updateUserCache().then((updateUserCache) => {
          location.href = location.href;
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pageBox {
  padding: 40px 0;
  & > div {
    display: inline-block;
    width: 330px;
    color: #285f87;
    margin-left: calc((100% - 330px) / 2);
  }

  .infoBox {
    background: #f7fafc;
    border: 1px solid #dce6ed;
    border-radius: 5px;
    .topBox {
      padding: 16px 20px;
      span {
        width: 212px;
        font-size: 16px;
        line-height: 22px;
        word-wrap: break-word;
        word-break: break-all;
        display: inline-block;
      }
    }
    .contentBox {
      padding: 16px 20px;
      background: white;
      p {
        width: 20px;
        color: #285f87;
        font-size: 12px;
        line-height: 16px;
      }
      h2 {
        font-weight: bold;
        font-size: 30px;
        line-height: 41px;
      }
    }
    .bottomBox {
      padding: 10px 20px;
      font-size: 14px;
      line-height: 24px;
      i {
        margin-right: 6px;
      }
    }
  }
  .iptBox {
    padding: 18px 0 40px;
    div {
      margin-bottom: 12px;
      h4 {
        margin-bottom: 4px;
        font-size: 14px;
        line-height: 24px;
      }
    }
  }
}
</style>
