<template>
  <div class="loginBox">
    <main>
      <div class="contentBox" v-if="status == 1">
        <div class="title">
          <p>Connect wallet and log in</p>
          <p>your DAD Advertiser account.</p>
        </div>
        <div class="top">
          <p>Choose your Network</p>
          <a-button class="btn-blue"
            ><img
              style="width: 20px; height: 20px"
              src="../assets/imgs/icon-ethereum.png"
              alt=""
            />Ethereum</a-button
          >
        </div>
        <div class="bottom">
          <p>Please select a wallet</p>
          <div class="fl">
            <a-button
              class="btn-white"
              @click="activity = true"
              :class="activity ? 'activity' : ''"
              ><img
                src="../assets/imgs/icon-metamask.png"
                alt=""
              />MetaMask</a-button
            >
            <a-button
              class="btn-white"
              style="
                margin-left: 10px;
                background: #eee !important;
                color: #999 !important;
              "
              disabled
              :class="!activity ? 'activity' : ''"
              @click="activity = false"
              ><img
                src="../assets/imgs/icon-walletConnect.png"
                alt=""
              />WalletConnect</a-button
            >
          </div>
        </div>
      </div>
      <div class="contentBox" v-else-if="status == 2">
        <div class="title">
          <p>Complete your info</p>
        </div>
        <p class="registerTips">Create an account for DAD identification</p>
        <div class="top">
          <div class="fl jcb">
            <p>Acount Name</p>
            <span v-if="formVerification[0]"
              ><a-icon type="exclamation-circle" theme="filled" />Please enter
              the account number</span
            >
          </div>
          <a-input
            :class="formVerification[0] ? 'errorIpt' : ''"
            v-model="name"
          />
        </div>
        <div class="bottom">
          <div class="fl jcb">
            <p>Email</p>
            <span v-if="formVerification[1]"
              ><a-icon type="exclamation-circle" theme="filled" />Please enter
              email address</span
            >
          </div>
          <a-input
            :class="formVerification[1] ? 'errorIpt' : ''"
            v-model="Email"
          />
        </div>
      </div>
      <div class="contentBox successBox" v-else>
          <div class="firstTips" v-if="isFirst">
          <p>You need to deposit DAD tokens upon the first login!</p>
        </div>
        <div v-else>
          <img src="../assets/imgs/hi.png" alt="" />
          <p>Welcome!</p>
        </div>
      </div>
    </main>
    <a-button class="submitBtn" @click="nextFn">
      {{ status == 1 ? "Connect" : status == 2 ? "Confirm" : "Next"
      }}<a-icon type="arrow-right" style="font-size: 12px"
    /></a-button>
  </div>
</template>

<script>
import Web3 from "web3";
import { loginEth, putProfile } from "@/tools/api/login";
export default {
  name: "Login",
  data() {
    return {
      isFirst:false,
      status: 1,
      iptError: 1, 
      name: "",
      Email: "",
      activity: true,
      formVerification: [false, false],
    };
  },
  created() {
    let userInfo = this.$getCache("userInfo");
    let EDToken = this.$getCache("EDToken");
    if (EDToken) {
      if (userInfo.email && userInfo.name) {
        this.status = 3;
      } else {
        this.status = 2;
      }
    }
  },
  methods: {
    nextFn(evt) {
      let { status } = this;
      if (status == 1) {
        // login
        this.isFirst = false
        this.login_connect();
      } else if (status == 2) {
        // go on
        this.isFirst = true
        this.putProfileFn();
      } else {
        this.isFirst = false
        this.$updateUserCache().then((res) => {
          this.$router.push("/dashboard");
        });
      }
      let target = evt.target;
      if (target.nodeName == "SPAN") {
        target = evt.target.parentNode;
      }
      target.blur();
    },
    putProfileFn() {
      let { name, Email } = this;
      this.$set(this.formVerification, 0, !name);
      this.$set(this.formVerification, 1, !Email);
      if (!name || !Email) return;
      putProfile({ name, Email }).then((res) => {
        this.status = 3;
      });
    },
    login_connect() {
      this.inspectLogin(Web3).then((MetaMaskRes) => {
        if (MetaMaskRes) {
          loginEth(MetaMaskRes).then((loginRes) => {
            this.$setCache("EDToken", loginRes.token);
            // localStorage.setItem("EDToken", loginRes.token);
            if (!loginRes.name || !loginRes.email) {
              this.status = 2;
            } else {
              this.status = 3;
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.loginBox {
  position: relative;
  .activity {
    background: #3591fe !important;
    color: #fff !important;
  }
  main {
    .title {
      font-weight: 600;
      font-size: 20px;
    }
    .top,
    .bottom {
      margin-top: 20px;
      p {
        margin-bottom: 10px;
        font-weight: 600;
        font-size: 12px;
      }
      span {
        color: #ff5656;
        font-size: 12px;
        line-height: 24px;
      }
    }
    .errorIpt {
      border-color: #ff5656;
    }

    .successBox {
      div {
        position: absolute;
        top: 40%;
        left: 40%;
        transform: translate(-50%, -50%);
        img {
          width: 55px;
          height: 55px;
        }
        p {
          font-weight: 600;
          font-size: 24px;
        }
      }
    }
  }

  .submitBtn {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .registerTips {
    color: #858585;
    font-size: 13px;
  }
  .firstTips {
    width: 116%;
    position: absolute!important;
    top: 32%!important;
    left: -5%!important;
    transform: translate(0)!important;
    p {
      // font-size: 20px!important;
    }
  }
}
</style>