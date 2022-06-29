<template>
  <div class="pageBox">
    <h2>Transaction History</h2>
    <a-table :columns="columns" :data-source="data" @change="change">
      <template slot="Status" slot-scope="status">
        <span v-if="status == 1" style="color: #11cb88">Completed</span>
        <span v-else style="color: #9a9a9a">Fail</span>
      </template>
    </a-table>
  </div>
</template>

<script>
import { walletTransfers } from "@/tools/api/account";
export default {
  name: "transactionHistory",
  data() {
    return {
      columns: [
        {
          title: "Time",
          dataIndex: "createdTime",
        },
        {
          title: "Type",
          dataIndex: "type",
        },
        {
          title: "Asset",
          dataIndex: "Asset",
        },
        {
          title: "Amount",
          dataIndex: "value",
        },
        {
          title: "Status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
      ],
      data: [],
    };
  },
  created() {
    walletTransfers({ page: 0, size: 100 }).then((res) => {
      this.data = res.content.map((it) => {
        it.createdTime = this.$formatTimes(it.createdTime);
        it.Asset = "DAD";
        return it;
      });
      console.log(res);
    });
  },
  methods: {
    change(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="less" scoped>
.pageBox {
  padding: 20px 70px;
  h2 {
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 24px;
    line-height: 48px;
  }
}
</style>