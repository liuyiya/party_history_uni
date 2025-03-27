<template>
	<view class="finish-container">
		<image class="bg-img" src="@/static/images/bg.png" ></image>
		<view class="content">
			<!-- <view class="head-title">首页</view> -->
		  <view class="finish-img-box">
				<view class="finish-img" :style="{backgroundImage: `url(${require('@/static/images/index/finish.png')})`}"></view>
			</view>
			<view class="text">已完成答题~</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		  return {
				name: this.$store.state.user.name,
		  }
		},
		computed: {
		  avatar() {
		    return this.$store.state.user.avatar
		  },
		},
		methods: {}
	}
</script>

<style lang="scss">
	page {
		}
	.finish-container {
		position: relative;
		width: 100%;
		min-height: calc(100vh - 45px);
		background-color: #E05A5A;
		overflow: hidden; /* 防止滚动条出现 */
		.bg-img{
			position: absolute;
			top: 246px;
			left: 50%;
			width: 600px;
			height: 600px;
			transform: translateX(-50%);
			object-fit: cover; /* 确保图像覆盖 */
		} 
		.finish-img-box {
			z-index: 1;
			position: relative;
			display: flex;
			justify-content: center;
			margin-top: 160px;
			width: 100%;
			.finish-img {
				width: 298px;
				height: 158px;
			}
		}
		.text {
			margin-top: 80px;
			width: 100%;
			font: 500 24px 'SemiBold';
			color: #ffffff;
			text-align: center;
		}
	}
</style>