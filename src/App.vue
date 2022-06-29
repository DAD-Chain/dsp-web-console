<template>
	<div id="app">
        <img class="leftTopBg" src="./assets/imgs/bg-icon.png" alt="">
        <div class="main">
		    <router-view class="mainContent" />
        </div>
	</div>
</template>

<style lang="less">
#app {
    width: 100vw;
    height: 100vh;
    position: relative;
    background: #ECF4FB url("./assets/imgs/bg-icon.png") no-repeat right bottom;
    background-size: 400px 400px;
    .leftTopBg {
        width: 400px;
        height: 400px;
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
    }
    .main {
        // width: 840px;
        // min-width: 840px;
        // max-width: 840px;
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);
        position: relative;
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
        overflow: auto;
        padding: 0 calc((100vw - 840px) / 2);
        padding-top: 100px;
        .mainContent {
            position: static;
        }
    }
}
</style>
