<template>
	<view class="index-container">
		<image class="bg-img" src="@/static/images/bg.png" ></image>
		<view class="content">
			<view class="head-title">积分排行榜</view>
			<view class="tab">
				<view @click="toChangeData('week')" :class="activeTab == 'week'?'active':''" class="tab-name">周排行</view>
				<view @click="toChangeData('all')" :class="activeTab == 'all'?'active':''" class="tab-name">全部</view>
			</view>
			<view class="tip-box">
				<view class="tip">
					<view class="tip-num">#{{rankData.rank}}</view>
					<view class="tip-content">你已超过当前{{rankData.ratio}}%的人，请继续保持努力哦~</view>
				</view>
			</view>
			<view class="rank-box">
				<image style="padding-right: 15px; width: 100%; height: 262px;" src="@/static/images/rank/rank-icon.png" mode="aspectFill"></image>
			  <view v-if="pointList1[0]" class="rank-info rank1">
					<view class=' cu-avatar round xl rank1-num-box' :style="{ backgroundImage: `url(${pointList1[0].pic})` }">
						<image class="rank1-num" src="@/static/images/rank/num1-icon.png"></image>
					</view>
					<view class="rank-name">{{pointList1[0].username}}</view>
					<view class="rank-point">{{pointList1[0].point}}</view>
				</view>
				<view v-if="pointList1[1]" class="rank-info rank2">
					<view class=' cu-avatar round xl rank1-num-box' :style="{ backgroundImage: `url(${pointList1[1].pic})` }"></view>
					<view class="rank-name">{{pointList1[1].username}}</view>
					<view class="rank-point">{{pointList1[1].point}}</view>
				</view>
				<view v-if="pointList1[2]" class="rank-info rank3">
					<view class=' cu-avatar round xl rank1-num-box' :style="{ backgroundImage: `url(${pointList1[2].pic})` }"></view>
					<view class="rank-name">{{pointList1[2].username}}</view>
					<view class="rank-point">{{pointList1[2].point}}</view>
				</view>
		    
			</view>
			<view v-if="pointList2.length" class="rank-list-box">
				<view class="rank-list">
					<view v-for="(user, index) in pointList2" :key="index" class="rank-card">
						<view class="rank-card-num">{{user.sort}}</view>
					  <view class="rank-card-img">
							<view class='cu-avatar round lg' :style="{ backgroundImage: `url(${user.pic})` }"></view>
						</view>
					  <view class="rank-card-info">
							<view class="rank-card-username">{{user.username}}</view>
						  <view class="rank-card-point">{{user.point}}</view>
						</view>
					</view>
				</view>
			</view>
						
		</view>
	</view>
</template>

<script>
	import {getUserPointList} from '@/api/personal/user.js'
	
	export default {
		data() {
		  return {
				name: this.$store.state.user.name,
				activeTab: 'week',
				rankData: undefined,
				pointList1: [],
				pointList2: [],
		  }
		},
		computed: {
		  avatar() {
		    return this.$store.state.user.avatar
		  },
		},
		onShow() {
			this.toGetPointList(this.activeTab)
		},
		methods: {
			toChangeData(type) {
				if(type == 'week') {
					this.activeTab = 'week'
					this.toGetPointList('week')
				}else {
					this.activeTab = 'all'
					this.toGetPointList('all')
				}
			},
			toGetPointList(type) {
				let typeValue
				if(type == 'week') {
					typeValue = 1
				}else {
					typeValue = 2
				}
				let param = {
					type: typeValue
				}
				getUserPointList(param).then(res => {
					this.rankData = res.data
					if (this.rankData && this.rankData.users && this.rankData.users.length > 0) {
					    this.pointList1 = this.rankData.users.slice(0, 3); // Get first three elements
					    this.pointList2 = this.rankData.users.slice(3);    // Get remaining elements
					  } else {
					    this.pointList1 = [];
					    this.pointList2 = [];
					  }
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
	}
	.index-container {
		position: relative;
		width: 100%;
		min-height: calc(100vh - 50px);
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
		.content {
			// padding: 0 24px;
			.head-title {
				padding: 30px 0;
				color: #ffffff;
				font: 600 24px 'Plus Jakarta Sans';
				text-align: center;
			}
			.tab {
				display: flex;
				padding: 0 24px;
				.tab-name {
					padding: 8px;
					width: 150.5px;
					height: 40px;
					text-align: center;
					font: 400 16px 'Rubik';
				}
				.active {
					color: #D27575;
					background-color: #FFE7EE;
					border-radius: 16px;
				}
			}
			.tip-box {
				padding: 0 24px;
				.tip {
					display: flex;
					align-items: center;
					gap: 15px;
					margin-top: 20px;
					padding: 15px;
					width: 100%;
					height: 88px;
					border-radius: 20px;
					background-color: #FFB380;
					.tip-num {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 56px;
						width: 56px;
						border-radius: 20px;
						background-color: #FF9B57;
						color: #ffffff;
						font: 500 24px 'Graphik';
					}
					.tip-content {
						flex: 4;
						line-height: 24px;
						color: #ffffff;
					}
				}
			}
			.rank-box {
				position: relative;
				display: flex;
				justify-content: center;
				margin-top: 20px;
				padding-top: 120px;
				padding-right: 10px;
				.rank-info {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 6px;
					position: absolute;
					color: #ffffff;
					font: 400 16px 'Rubik';
					.rank-point {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 34px;
						width: 72px;
						background-color: #9087E5;
						border-radius: 12px;
					}
				}
				.rank1 {
					top: 15px;
					left: 41%;
					.rank1-num-box {
						position: relative;
					}
					.rank1-num {
						position: absolute;
						top: -20px;
						width: 40px;
						height: 40px;
					}
				}
				.rank2 {
					top: 45px;
					left: 13%;
				}
				.rank3 {
					top: 80px;
					left: 69%;
				}
				
			}
			.rank-list-box {
				position: relative;
				top: -100px;
				padding: 0 10px;
				width: 100%;
				.rank-list {
					display: flex;
					flex-direction: column;
					gap: 15px;
					padding: 15px;
					background-color: #EFEEFC;
					border-radius: 20px;
					.rank-card {
						box-sizing: border-box;
						position: relative;
						z-index: 2;
						display: flex;
						align-items: center;
						gap: 20px;
						padding: 15px;
						height: 92px;
						background-color: #ffffff;
						border-radius: 20px;
						.rank-card-num {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 24px;
							height: 24px;
							border-radius: 24px;
							border: 1.5px solid #858494;
							color: #858494;
						}
					  .rank-card-info {
							.rank-card-point {
								margin-top: 8px;
								color: #858494;
							}
						}
					}
				}
				.rank-list::before {
				    content: '';
				    position: absolute;
				    top: -15px; /* 控制椭圆弧的位置 */
				    left: 50%; /* 控制椭圆弧的水平位置 */
				    transform: translateX(-50%); /* 将椭圆弧水平居中 */
				    width: 60px; /* 椭圆弧的水平直径 */
				    height: 70px; /* 椭圆弧的垂直直径 */
				    background-color: #EFEEFC; /* 椭圆弧的背景色 */
				    border-radius: 60%/60%; /* 使用水平和垂直半径创建椭圆弧 */
				    z-index: 1; /* 使椭圆弧位于.rank-list上方 */
				}
				.rank-list::after {
				    content: '';
				    position: absolute;
				    top: -8px; /* 控制小圆点的位置 */
				    left: 50%; /* 控制小圆点的水平位置 */
				    transform: translateX(-50%); /* 将小圆点水平居中 */
				    width: 8px; /* 小圆点的宽度 */
				    height: 8px; /* 小圆点的高度 */
				    background-color: #C1BCF1; /* 小圆点的背景色 */
				    border-radius: 50%; /* 将方形变为圆形 */
				    z-index: 2; /* 使小圆点位于.rank-list上方 */
				}
			}
						
		}
	
	}
</style>