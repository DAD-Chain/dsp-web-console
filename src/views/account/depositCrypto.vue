<template>
  <div>
    <h2>Deposit Crypto</h2>
    <div class="fl" style="display: flex; justify-content: center">
      <div class="leftBox">
        <div>
          <h4>Select coin</h4>
          <a-select default-value="DAD" style="width: 330px">
            <a-select-option value="DAD" class="fl ai">
              <img
                src="../../assets/imgs/icon-DAD.png"
                style="margin-right: 6px;width: 20px;margin-top: -5px;"
              />
              DAD
            </a-select-option>
          </a-select>
        </div>
        <div>
          <h4>Network</h4>
          <a-input addon-before="Recharge quantity" v-model="value" type="number"/>
        </div>
        <div>
          <a-button block @click="payin">Launch Pay</a-button>
        </div>
        <ul>
          <li>Send only <b>DAD</b> to this deposit address.</li>
          <li>Ensure the network is <b>Ethereum (ERC20)</b>.</li>
        </ul>
      </div>
      <div class="rightBox">
        <h4>Deposit to</h4>
        <div class="infoBox">
          <div class="topBox fl jcb ai">
            <img src="../../assets/imgs/icon-metamask.png" alt="" />
            <span>{{config.depositAddress}}</span>
            <a-icon type="copy" style="cursor: pointer;" @click="$copyText(config.depositAddress).then(() => {$message.success('Copy succeeded')})"/>
          </div>
          <div class="contentBox fl jcc">
            <div class="qrcode" ref="qrCodeUrl"></div>
          </div>
          <div class="bottomBox">
            <p>
              Scan the code on the withdrawal page of the trading platform APP
              or wallet APP
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { walletDepositDAD } from "@/tools/api/account";
import { dspConfig } from "@/tools/api/newPost";
import QRCode from 'qrcodejs2'
export default {
  name: "depositCrypto",
  data(){
    return {
      value:'',
      config:{},
    }
  },
  created(){
    this.dspConfigFn()
  },
  methods: {
    creatQrCode() {
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: 'xxxx',
            width: 150,
            height: 150,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        })
    },
		dspConfigFn(){
			dspConfig().then((res) => {
				this.config = res
        this.creatQrCode(res.depositAddress);
			})
    },
    payin() {
      if(!this.value){
        this.$message.error('Please enter the amount to recharge')
        return
      }
      let MetaMaskIP = this.$getCache("MetaMaskIP");
      let toIP = "0x5a51Ca981F0B01412ccFAC949fe64AE4eD10F55E";
      let value = this.value;
      this.$payDad(MetaMaskIP, toIP, value).then((txHash) => {
        walletDepositDAD({ from: MetaMaskIP, txHash, value }).then((res) => {
          // console.log("walletDepositDAD", res);
          this.$message.success('Payment successful')
          this.$router.push('/account/transactionHistory')
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
h2 {
  font-weight: 600;
  font-size: 24px;
  line-height: 48px;
  margin: 20px 70px;
}
.main {
  padding: 20px 70px;
  .leftBox {
    width: 330px;
    margin-right: 36px;
    div {
      margin-bottom: 12px;
      h4 {
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 6px;
      }
    }
    ul {
      margin-top: 34px;
      margin-left: 18px;
      font-size: 14px;
      line-height: 24px;
      b {
        font-weight: 600;
        color: #0092ff;
      }
    }
  }
  .infoBox {
    display: inline-block;
    width: 330px;
    color: #285f87;
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
    }
    .bottomBox {
      padding: 10px 42px;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
    }
  }
}
/deep/.ant-select-selection-selected-value {
  display: flex;
  align-items: center;
  img {
    margin-right: 0;
  }
}
/deep/.ant-input-affix-wrapper {
  display: flex;
  align-items: center;
  input {
    padding-left: 40px !important;
  }
}
</style>
