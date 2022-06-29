<template>
  <div class="newPostBox">
    <head-box />
    <main>
      <div class="top fl jcb ai">
        <template v-if="$route.meta.status == 1">
          <h2>New post</h2>
          <div>
            <a-button
              size="small"
              class="btn-border"
              style="margin-right: 16px"
              @click="$router.back()"
              >Back</a-button
            >
            <!-- <a-button size="small" class="btn-border" style="margin-right: 16px;" @click="Preview">Preview</a-button> -->
            <!-- <a-button size="small" class="btn-blue" @click="Save"
              >Save</a-button
            > -->
          </div>
        </template>
        <template v-else-if="$route.meta.status == 2">
          <h2>Save Ad Result</h2>
        </template>
        <template v-else>
          <a-button class="btn-noBorder" @click="$router.back()"
            ><a-icon type="arrow-left" /> Back</a-button
          >
        </template>
      </div>
      <div class="contentBox">
        <keep-alive>
          <router-view ref="sonView" />
        </keep-alive>
      </div>
    </main>
    <!-- Email -->
    <foot-box />
  </div>
</template>

<script>
import headBox from "@/components/headBox";
import footBox from "@/components/footBox";
export default {
  name: "dashboard",
  components: { footBox, headBox },
  data() {
    return {};
  },
  methods: {
    goToAddPostFn() {
      this.$router.push("/newPost");
    },
    Save() {
      this.$refs.sonView.Save();
    },
  },
};
</script>

<style lang="less" scoped>
.headBox {
  span {
    font-weight: 600;
    font-size: 14px;
    color: #285f87;
  }
}
main {
  width: 100%;
  height: 680px;
  margin-top: 10px;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  .top {
    width: 100%;
    height: 80px;
    padding: 16px 30px;
    background: #f7fafc;
    h2 {
      font-weight: 600;
      font-size: 24px;
      line-height: 48px;
    }
  }
  .contentBox {
    height: calc(100% - 80px);
    padding: 20px 40px;
  }
}
.Email {
  margin-top: 10px;
  font-size: 14px;
  color: #285f87;
  text-align: center;
}
</style>
