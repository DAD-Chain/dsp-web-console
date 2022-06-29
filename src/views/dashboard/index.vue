<template>
    <div class="dashboardBox">
        <head-box/>
        <div class="statisticsBox fl jcb">
            <div class="itemBox" v-for="(item, index) in statisticsList" :key="index">
                <span>{{ item.name }}</span>
                <p>{{ item.num }}</p>
            </div>
        </div>
        <div class="listBox">
            <div class="addNew" style="cursor: pointer;">
                <span @click="goToAddPostFn"><a-icon type="plus" /> Add a new ad content</span>
            </div>
            <div class="content">
                <router-view />
            </div>
        </div>
        <foot-box/>
    </div>
</template>

<script>
import { adsStat } from '@/tools/api/newPost'
import footBox from '../../components/footBox.vue'
import headBox from '../../components/headBox.vue'
const Account = localStorage.getItem('name')
export default {
    name: "dashboard",
    components: { footBox, headBox },
    data() {
        return {
            Account,
            statisticsList: [
                { name: 'Posted', num: '0' },
                { name: 'New exposure', num: '0' },
                { name: 'New click', num: '0' },
                { name: 'Total exposure', num: '0' },
            ]
        }
    },
    created(){
        adsStat().then((res) => {
            this.statisticsList = [
                { name: 'Posted', num: res.totalAds },
                { name: 'New exposure', num: res.newViews },
                { name: 'New click', num: res.newClicks },
                { name: 'Total exposure', num: res.totalViews },
            ]
        })
    },
    methods: {
        goToAddPostFn() {
            this.$router.push('/newPost')
        }
    }
};
</script>

<style lang="less" scoped>
.headBox {
    span {
        font-weight: 600;
        font-size: 14px;
        color: #285F87;
    }
}
.statisticsBox {
    width: 100%;
    padding: 24px 56px;
    border-radius: 6px;
    margin-top: 10px;
    background: white;
    box-shadow: 0 4px 14px rgba(40, 79, 115, 0.1);
    .itemBox {
        width: 25%;
        text-align: center;
        border-right: 1px solid #DCE6ED;
        span {
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            color: #9A9A9A;
        }
        p {
            margin-top: 8px;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: #000000;
        }
    }
    .itemBox:last-child {
        border-right: none;
    }
}
.listBox {
    width: 840px;
    // height: 600px;
    margin-top: 10px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 4px 14px rgba(40, 79, 115, 0.1);
    .addNew {
        padding: 20px 22px;
        border-bottom: 1px solid #DCE6ED;
        span {
            display: inline-block;
            width: 796px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            font-size: 16px;
            color: #285F87;
            background: #F7FAFC;
            border: 2px dashed #DCE6ED;
            box-sizing: border-box;
            border-radius: 4px;
        }
    }
}
.Email {
    margin-top: 10px;
    font-size: 14px;
    color: #285F87;
    text-align: center;
    padding: 80px 0;
}
</style>
