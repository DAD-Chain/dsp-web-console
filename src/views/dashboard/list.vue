<template>
  <div class="pageBox">
    <template v-if="list.length > 0">
      <div
        class="itemBox fl jcb"
        v-for="(item, index) in list"
        :key="index"
        style="cursor: pointer;"
        @click="goToDetailFn(item)"
      >
        <div class="fl">
          <img class="imgBox" :src="item.image" />

          <div class="content">
            <h4>{{ item.title }}</h4>
            <div class="fl">
              <div class="fl ai" style="margin-right: 64px">
                <a-icon type="eye" theme="filled" />{{ item.views }}
              </div>
              <div class="fl ai">
                <img src="../../assets/imgs/icon-mouse.png" />{{ item.clicks }}
              </div>
            </div>
          </div>
        </div>

        <div class="rightBox">
          <span class="date">{{ $timeFormatting(item.createdTime) }}</span>
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
            {{ item.status || "Expired" }}
          </p>
        </div>
      </div>
      <div style="padding: 20px; display: flex; justify-content: center">
        <a-pagination
          v-model="current"
          :total="total"
          show-less-items
          @change="onChange"
        />
      </div>
    </template>
    <div class="noDataBox" v-else>
      <div class="noDataContentBox fl fdc ai">
        <img src="../../assets/imgs/nodata.png" />
        <p>No data</p>
      </div>
    </div>
  </div>
</template>

<script>
import { adsList } from "@/tools/api/newPost";
export default {
  name: "list",
  data() {
    return {
      list: [],
      current: 1,
      total: 0,
    };
  },
  created() {
    this.adsListFn();
  },
  methods: {
    adsListFn() {
      let { current } = this;
      adsList({ page: current - 1, size: 10 }).then((res) => {
        this.list = res.content;
        this.total = res.total;
      });
    },
    onChange() {
      this.adsListFn();
    },
    goToDetailFn(item) {
      this.$router.push({ name: "DashboardDetail", params: item });
    },
  },
};
</script>

<style lang="less" scoped>
.pageBox {
  // min-height: calc(600px - 86px);
  // overflow-y: scroll;
  .itemBox {
    padding: 20px;
    border-bottom: 1px solid #dce6ed;
    .imgBox {
      width: 120px;
      height: 60px;
      border-radius: 4px;
    }
    .content {
      margin-left: 36px;
      color: black;
      h4 {
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 14px;
      }
      .anticon-eye,
      img {
        margin-right: 6px;
      }
    }
    .rightBox {
      text-align: right;
      .date {
        color: #9a9a9a;
        font-size: 14px;
      }
      p {
        margin-top: 18px;
        font-weight: 600;
        font-size: 14px;
      }
    }
  }
  .itemBox:last-child {
    border-bottom: none;
  }
  .itemBox:hover {
    background: #f7fafc;
  }
  .noDataBox {
    position: relative;
    // width: 100%;
    width: 100%;
    height: calc(600px - 86px);
    .noDataContentBox {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 12px;
      p {
        color: #285f87;
      }
    }
  }
}
</style>