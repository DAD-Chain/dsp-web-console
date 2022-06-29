<template>
  <div class="pageBox">
    <b class="btn-noBorder fl ai" @click="$router.back()" style="cursor: pointer;"
      ><img src="../../assets/imgs/icon-left.png" />Back</b
    >
    <h4 class="title">{{ item.title }}</h4>
    <main class="contentBox fl">
      <div class="leftBox">
        <div class="topContentBox fl jca ai">
          <div style="padding-left: 24px">
            <span>Pageviews</span>
            <p>{{ item.views }}</p>
          </div>
          <a-divider type="vertical" style="height: 50px" />
          <div style="padding-right: 24px">
            <span>Click</span>
            <p>{{ item.clicks }}</p>
          </div>
        </div>
        <img :src="item.image" />
      </div>
      <div class="rightBox">
        <div>
          <h4>Created time</h4>
          <p>{{ $timeFormatting(item.createdTime) }}</p>
        </div>
        <div>
          <h4>Status</h4>
          <p
            :style="{
              color:
                item.status == 'Pending'
                  ? 'black'
                  : item.status == 'Overdue'
                  ? '#ff0000'
                  : item.status == 'Active'
                  ? '#11CB88'
                  : item.status == 'Rejected'
                  ? '#ff0000'
                  : '#9A9A9A',
            }"
          >
            {{ item.status }}
          </p>
        </div>
        <div>
          <h4>keywords</h4>
          <div>
            <a-tag
              v-for="(tag, ind) in item.tags"
              :key="ind"
              color="#EBF4FF"
              style="color: #285f87; padding: 4px 14px; border-radius: 50px"
            >
              {{ tag.name }}
            </a-tag>
          </div>
        </div>

        <div class="btnBox">
          <a-button
            class="btn-blue"
            v-if="item.status == 'Active'"
            @click="cancelFn"
            >Cancel</a-button
          >
          <a-button class="Re-edit" v-else @click="ReEdit">Re-edit</a-button>
        </div>
      </div>
    </main>

    <a-modal
      :visible="isShowCancel"
      @ok="handleOkFn"
      @cancel="isShowCancel = false"
      :footer="null"
    >
      <p>Are you sure you want to end this advertisement?</p>
      <h4>{{ item.title }}</h4>

      <div class="fl jcb" style="padding: 24px 48px 0">
        <a-button class="Re-edit" key="back" @click="isShowCancel = false">
          No, thanks
        </a-button>
        <a-button
          class="btn-blue"
          key="submit"
          type="primary"
          @click="handleOkFn"
        >
          Yes, cancel now
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { adsEnd, adsListDetail } from "@/tools/api/newPost";
export default {
  name: "detail",
  data() {
    return {
      status: 1, 
      isShowCancel: false,
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
		this.$tagsRestore(item.tags).then((res) => {
			this.item.tags = res;
		})
  },
  methods: {
    ReEdit() {
      let { item } = this;
      this.$router.push({ name: "AddNewPost", params: item });
    },
    cancelFn() {
      this.isShowCancel = true;
    },
    handleOkFn() {
      let { item } = this;
      adsEnd({ id: item.id }, item.id).then((res) => {
        this.$router.push({ name: "DashboardCancelDetail", params: item });
        this.isShowCancel = false;
      });
    },
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

  .title {
    width: 516px;
    margin-top: 14px;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  }

  .contentBox {
    margin-top: 14px;
    .leftBox {
      width: 460px;
      border-radius: 6px;
      background: #f7fafc;
      overflow: hidden;
      .topContentBox {
        padding: 8px 0;
        div {
          text-align: center;
          span {
            font-size: 12px;
          }
          p {
            font-weight: 600;
            font-size: 24px;
          }
        }
      }
      img {
        width: 460px;
        height: 234px;
      }
    }

    .rightBox {
      width: calc(100% - 460px);
      padding: 0 40px;
      position: relative;
      div {
        margin-bottom: 10px;
        h4 {
          font-size: 12px;
          line-height: 24px;
        }
        p {
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
        }
      }

      .btnBox {
        text-align: right;
        position: absolute;
        bottom: 0;
        right: 0;
        .Re-edit {
          color: #285f87;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          background: white !important;
          border: 1px solid #285f87;
          border-radius: 54px;
        }
      }

      .ant-tag {
        margin: 4px 6px 8px 0;
      }
      /deep/.anticon-close {
        color: black;
      }
    }
  }
}

/deep/.ant-modal-content {
  width: 500px;
  .ant-modal-body {
    text-align: center;
    p {
      font-size: 16px;
      line-height: 32px;
    }
    h4 {
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
    }
  }
  .Re-edit {
    color: #285f87;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    background: white !important;
    border: 1px solid #285f87;
    border-radius: 54px;
  }
}
</style>