<template>
  <div class="addBox fl jcb">
    <div class="leftBox fdc jcb">
      <div class="iptBox">
        <div class="fl jcb ai">
          <h4><font color="red">*</font>Title</h4>
          <span>{{ parameter.title.length }}/50</span>
        </div>
        <a-input
          class="ipt"
          :maxLength="50"
          v-model="parameter.title"
          :class="formVerification[0] ? 'errorIpt' : ''"
          placeholder="Please fill in the title"
        ></a-input>
      </div>
      <div class="iptBox">
        <div class="fl jcb ai">
          <h4><font color="red">*</font>AD post content</h4>
          <span>{{ parameter.content.length }}/300</span>
        </div>
        <a-textarea
          class="ipt"
          :auto-size="{ minRows: 6, maxRows: 6 }"
          :maxLength="300"
          v-model="parameter.content"
          :class="formVerification[1] ? 'errorIpt' : ''"
          placeholder="Please fill in the content"
        ></a-textarea>
      </div>
      <div class="uploadBox" style="position: relative">
        <div class="fl jcb ai">
          <h4><font color="red">*</font>Insert picture</h4>
          <span>{{ !parameter.image ? 0 : 1 }}/1</span>
        </div>
        <a-upload
          name="avatar"
          list-type="text"
          accept="image/png,image/jpg,image/gif"
          class="avatarUploader"
          :class="formVerification[2] ? 'errorIpt' : ''"
          :show-upload-list="false"
          action="/1231232"
          :beforeUpload="
            (a, b) => {
              return this.handlePreview(a, b);
            }
          "
        >
          <div v-if="!parameter.image">
            <span>1:2 or 350*175px</span>
            <a-button class="btn-border" size="large"
              >+ Insert .jpg picture here</a-button
            >
          </div>
          <div v-if="parameter.image">
            <img
              :src="
                parameter.id ? parameter.image : $getFileURL(parameter.image)
              "
              alt=""
              style="
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                z-index: 1;
              "
            />
          </div>
        </a-upload>
      </div>
      <div class="iptBox">
        <h4><font color="red">*</font>Link to</h4>
        <a-input
          class="ipt"
          v-model="parameter.url"
          :class="formVerification[3] ? 'errorIpt' : ''"
          placeholder="Please enter an ad link"
        ></a-input>
      </div>
    </div>
    <div class="rightBox">
      <h2><font color="red">*</font>Choose your keywords</h2>
      <div class="tagBox">
        <a-tag
          closable
          color="#EBF4FF"
          style="color: #285f87; padding: 4px 14px; border-radius: 50px"
          v-for="(tag, ind) in tags"
          :key="ind"
          @close="close(ind)"
        >
          {{ tag.name }}
        </a-tag>
      </div>
      <searchInput
        :dataSource="dataSource.map((it) => it.name)"
        @select="select"
        ref="searchInput"
        :_class="formVerification[4] ? 'errorIpt' : ''"
        placeholder="Please select at least one label"
      ></searchInput>
      <div class="selectCoin">
        <div class="fl jcb ai">
          <h2>Select coin</h2>
          <span>Available balance: {{ userInfo.balance }} DAD</span>
        </div>
        <a-select default-value="DAD" style="width: 100%; margin-top: 6px">
          <a-select-option value="DAD" class="fl ai">
            <img
              src="../../assets/imgs/icon-DAD.png"
              style="margin-right: 6px; width: 20px; margin-top: -5px"
            />
            DAD
          </a-select-option>
        </a-select>
      </div>
      <div class="rowBox fl jcb ai">
        <h2><font color="red">*</font>Budget:</h2>
        <div class="fl ai" style="width: calc(100% - 70px)">
          <span style="padding-right: 5px">0</span>
          <a-slider
            v-model="parameter.budget"
            :min="0"
            :max="userInfo.balance"
            style="width: 160px; margin: 0 10px"
            @afterChange="changeBudge"
          />
          <a-input-number
            v-model="parameter.budget"
            :min="0"
            :max="userInfo.balance"
            style="margin-left: 16px"
            :class="formVerification[5] ? 'errorIpt' : ''"
          />
        </div>
      </div>
      <div class="rowBox fl jcb ai">
        <h2>Exposure (Estimated)</h2>
        <p style="position: relative">
          {{ dspConfigValue.cpkPrice || 0 }} DAD
          <span style="cursor: pointer">
            (CPM)
            <a-tooltip trigger="click" placement="topLeft" :title="CPMText">
              <img class="CPMTips" src="../../assets/imgs/help.png" alt="" />
            </a-tooltip>
          </span>
        </p>
      </div>
      <div class="rowBox fl jcb ai">
        <h2>
          <span style="cursor: pointer; position: relative; margin-right: 12px"
            >CPC
            <a-tooltip trigger="click" placement="topLeft" :title="CPMText">
              <img class="CPCTips" src="../../assets/imgs/help.png" alt="" />
            </a-tooltip>
          </span>

          (Estimated)
        </h2>
        <div class="fl ai">
          <p>{{ dspConfigValue.cpcPrice || 0 }} DAD</p>
          <span>/Click</span>
        </div>
      </div>
      <div class="sendResult">
        <span style="display: flex; align-items: center">
          <h2>We will send result to</h2>
          <!-- <a-tooltip trigger="click" placement="topLeft" :title="helpText">
            <img
              style="
                width: 18px;
                height: 18px;
                margin-left: 6px;

                cursor: pointer;
              "
              src="../../assets/imgs/help.png"

              
              alt=""
            />
          </a-tooltip> -->
        </span>

        <a-input
          addonBefore="Account"
          disabled
          :defaultValue="userInfo.name"
          style="margin: 10px 0"
        ></a-input>
        <a-input
          addonBefore="CC to"
          v-model="parameter.ccEmail"
          :class="formVerification[6] ? 'errorIpt' : ''"
          placeholder="Please enter the mailbox to send"
        ></a-input>
      </div>
      <div style="text-align: right; position: absolute; bottom: 0; right: 0">
        <a-button @click="Save">Confirm <a-icon type="arrow-right" /></a-button>
      </div>
    </div>
  </div>
</template>

<script>
import searchInput from "@/components/search-input";
import { tagsList, tagsIncrease } from "@/tools/api/tags";
import { adsIncrease, adsModify, dspConfig } from "@/tools/api/newPost";
const Email = localStorage.getItem("email");
const name = localStorage.getItem("name");
export default {
  name: "add",
  components: { searchInput },
  data() {
    return {
      helpText:
        "Enter your email to receive the ad application results and more updates.",
      CPMText:
        "Cost per thousand(CPM),also called cost per mille,is a marketing term used to denote the price of 1,000 advertisement impressions on one web page. Cost-per-click(CPC)bidding means that you pay for each click on your ads.",
      showCPMMean: false,
      tags: [],
      userInfo: {},
      dataSource: [],
      dspConfigValue: {},
      formVerification: [],
      parameter: {
        title: "",
        content: "",
        image: null,
        tags: "",
        budget: 0,
        ccEmail: "",
        url: "",
      },
    };
  },
  created() {
    this.$updateUserCache().then((Res) => {
      this.userInfo = this.$getCache("userInfo");
      this.tagsListFn();
      this.dspConfigFn();
      if (this.$route.params.id) {
        this.parameter = this.$route.params;
        this.tags = this.parameter.tags;
      }
    });
  },
  methods: {
    changeBudge(val) {
      console.log(val);
      if (val === 0) {
        let that = this;
        this.$confirm({
          title: "Badget not enough? Go to depost",

          onOk() {
            return new Promise((resolve, reject) => {
              that.$router.push({
                path: "/account/depositCrypto",
              });
              resolve()
            }).catch(() => {});
          },
          onCancel() {},
        });
      }
    },
    dspConfigFn() {
      dspConfig().then((res) => {
        this.dspConfigValue = res;
      });
    },
    handlePreview(a) {
      this.parameter.image = a;
      return false;
    },
    Save() {
      let p = this.parameter;
      p.tags = this.tags.map((it) => it.id).join(",");
      this.$set(this.formVerification, 0, !p.title);
      this.$set(this.formVerification, 1, !p.content);
      this.$set(this.formVerification, 2, !p.image);
      this.$set(this.formVerification, 3, !p.url);
      this.$set(this.formVerification, 4, !p.tags);
      this.$set(this.formVerification, 5, !p.budget);
      this.$set(this.formVerification, 6, !p.ccEmail);
      if (
        !p.title ||
        !p.content ||
        !p.image ||
        !p.tags ||
        !p.budget ||
        !p.ccEmail ||
        !p.url
      ) {
        console.log(this.formVerification);
        return;
      }
      let image = p.image;
      let data = JSON.parse(JSON.stringify(p));
      delete data.image;

      if (data.id) {
        delete data.userId;
        delete data.status;
        delete data.views;
        delete data.clicks;
        delete data.cost;
        delete data.createdTime;
        delete data.lastModifiedDate;
        delete data.cpcPrice;
        adsModify(data, image).then((res) => {
          this.$message.success("Saved successfully");
          this.$router.push({ name: "SendNewPost", params: res });
        });
      } else {
        adsIncrease(data, image).then((res) => {
          this.$message.success("Saved successfully");
          this.$router.push({ name: "SendNewPost", params: res });
        });
      }
    },
    select(value) {
      let it = this.dataSource.filter(
        (it) => it.name.toLocaleLowerCase() == value.toLocaleLowerCase()
      )[0];
      if (it && it.id) {
        this.tags.push(it);
      } else {
        tagsIncrease({ name: value }).then((it) => {
          this.tagsListFn();
          this.tags.push(it);
        });
      }
      // setTimeout(() => {
      this.$refs.searchInput.clearInput();
      // }, 1000);
      console.log(this.$refs.searchInput);
    },
    tagsListFn() {
      tagsList({ page: 0, size: 100 }).then((res) => {
        this.dataSource = res.content;
      });
    },
    close(ind) {
      this.tags.splice(ind, 1);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.errorIpt {
  border-color: #ff5656 !important;
  .ant-input-number {
    border-color: #ff5656 !important;
  }
  input {
    border-color: #ff5656 !important;
  }
}
.addBox {
  position: relative;
  & > div {
    width: 50%;
  }
  .leftBox {
    padding-right: 30px;
    border-right: 1px solid #dce6ed;
    .iptBox span {
      font-size: 14px;
      color: #9a9a9a;
    }
    .ipt {
      margin: 8px 0 16px;
      height: 40px;
    }
    .avatarUploader {
      position: relative;
      width: 100%;
      height: 150px;
      margin: 10px 0 26px;
      padding-top: 38px;
      display: inline-block;
      text-align: center;
      background: #f7fafc;
      border: 1px dashed #dce6ed;
      box-sizing: border-box;
      border-radius: 4px;
      span {
        display: inline-block;
        margin-bottom: 8px;
        font-size: 14px;
        line-height: 24px;
        color: #285f87;
      }
    }
  }
  .rightBox {
    padding-left: 30px;
    h2 {
      font-size: 14px;
      line-height: 24px;
    }
    .tagBox {
      margin: 6px 0 14px;
    }
    .selectCoin {
      margin: 20px 0;
    }
    .rowBox {
      margin-top: 20px;
      p {
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
      }
      span {
        font-size: 14px;
        line-height: 24px;
      }
    }
    .sendResult {
      margin: 20px 0 0;
      border: 1px;
    }
  }
}
.ant-tag {
  margin: 4px 6px 8px 0;
}
.CPMTips {
  width: 14px;
  height: 14px;
  margin-left: 6px;
  cursor: pointer;
  position: absolute;
  right: -13px;
  top: 0px;
}
.CPCTips {
  width: 14px;
  height: 14px;
  margin-left: 6px;
  cursor: pointer;
  position: absolute;
  right: -11px;
  top: -2px;
}
/deep/.anticon-close {
  color: black;
}
</style>
