<template>
  <div class="certain-category-search-wrapper">
    <a-auto-complete
      :data-source="dataSource"
      style="width: 100%"
      @select="select"
      v-model="searchKey"
      :filter-option="filterOption"
    >
      <a-input
        class="searchBox"
        @pressEnter="select(searchKey)"
        v-model="searchKey"
        allow-clear
        :class="_class"
        :placeholder="placeholder"
      >
        <a-icon slot="prefix" type="search" />
      </a-input>
    </a-auto-complete>
  </div>
</template>
<script>
export default {
  props: ["dataSource", "_class", "placeholder"],
  data() {
    return { searchKey: "", value: true };
  },
  methods: {
    pressEnter() {
      if (!this.searchKey) {
        return;
      }
      let a = this.dataSource.filter((it) => {
        return it.toUpperCase().indexOf(this.searchKey.toUpperCase()) >= 0;
      });
      console.log(a);
    },
    select(value) {
      if (!this.value) {
        return;
      }
      this.value = false;
      setTimeout(() => {
        this.$emit("select", value);
        this.value = value;
        this.value = true;
      }, 100);
    },
    filterOption(input, option) {
      if (!this.searchKey) {
        return;
      }
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },
    clearInput() {
      console.log("searchKey-clearInput");
      this.$set(this, "searchKey", null);
      this.searchKey = null;
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.errorIpt>input{
  border-color: #ff5656 !important;
}
</style>
<style>
.certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
  color: #666;
  font-weight: bold;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
  border-bottom: 1px solid #f6f6f6;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item {
  padding-left: 16px;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
  text-align: center;
  cursor: default;
}

.certain-category-search-dropdown .ant-select-dropdown-menu {
  max-height: 300px;
}
</style>
<style scoped>
.certain-category-search-wrapper
  >>> .certain-category-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix {
  right: 12px;
}
.certain-category-search-wrapper >>> .certain-search-item-count {
  position: absolute;
  color: #999;
  right: 16px;
}
.certain-category-search-wrapper
  >>> .certain-category-search.ant-select-focused
  .certain-category-icon {
  color: #108ee9;
}
.certain-category-search-wrapper >>> .certain-category-icon {
  color: #6e6e6e;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 16px;
}
</style>