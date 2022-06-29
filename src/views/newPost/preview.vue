<template>
    <div class="previewBox">
        <div class="contentBox">
            <h2>Preview your AD</h2>
            <img src="../../assets/imgs/img2.png" alt="">
            <h2>AD detail</h2>
            <div class="mainBox fdc jcb">
                <h2>Staying in a role builds valuable, SAD SAD company-specific domain</h2>
                <p>Placeholder Placeholder Placeholder Placeholder Placeholder announces strategic investment from Raising handsThe two parties will focus on lowering the entry barriers of NFTs to non-crypto users.</p>
                <a href="http://deficontest.sdfadsfsf/dasdaa/sdasd_sadsadsadasd/">http://deficontest.sdfadsfsf/dasdaa/sdasd_sadsadsadasd/</a>
            </div>
        </div>
    </div>
</template>

<script>
// import {}
export default {
    name: "preview",
    data(){
        return {
            preview:{}
        }
    },
    created(){
        console.log(this.$refs.sonView)
    }
};
</script>

<style lang="less" scoped>
.previewBox {
    position: relative;
    width: 100%;
    height: 100%;
    .contentBox {
        width: 354px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    h2 {
        margin-bottom: 20px;
        text-align: center;
        font-size: 14px;
        line-height: 24px;
    }
    img {
        width: 100%;
        margin-bottom: 20px;
    }
    .mainBox {
        padding: 8px 20px;
        background: #F7FAFC;
        border-radius: 4px;
        h2 {
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
        }
        p {
            margin: 8px 0;
            font-size: 12px;
            line-height: 18px;
        }
        a {
            font-size: 14px;
            line-height: 20px;
            color: #0092FF;
            word-break: break-word;
        }
    }
}
</style>