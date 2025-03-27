<template>
	<view class="point-container">
		<!-- <image class="bg-img" src="@/static/images/bg.png" ></image> -->
		<view class="content">
			<view class="head-title">我的总积分：{{userInfo.point}}</view>
			<view class="list-box">
				<view v-for="point in pointList" class="list-item">
					<view v-if="point.type != 3" class="list-item-title">
					  {{point.question}}
						<text :class="keyStateMatch(point.status).color" class="list-item-status">{{keyStateMatch(point.status).text}}</text>
					</view>
					<view v-if="point.type == 3" class="list-item-title">
					  <view class="quesetion-img" :style="{ backgroundImage: `url(${point.question})` }"></view>
						<text :class="keyStateMatch(point.status).color" class="list-item-status">{{keyStateMatch(point.status).text}}</text>
					</view>
					<view class="list-item-content">
						<view class="answer">
							题目类型：{{keyStateMatch2(point.type).text}}
							<text style="margin-left: 20px;">积分：{{point.point}}</text>
						</view>
						<view class="answer">
							正确答案：{{point.answer}}
						</view>
						<text>{{dateFormatte(point.answerTime)}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getMyPointHistory,getUserProfile} from '@/api/personal/user.js'
	export default {
		data() {
		  return {
				name: this.$store.state.user.name,
				pointList: [],
				userInfo:undefined,
		  }
		},
		computed: {
		  avatar() {
		    return this.$store.state.user.avatar
		  },
		},
		onShow() {
			this.getPointList()
			this.getUser()
		},
		methods: {
			getPointList() {
				getMyPointHistory().then(res => {
					this.pointList = res.data
				})
			},
			getUser() {
				getUserProfile().then(res => {
					this.userInfo = res.data
				})
			},
			keyStateMatch(status) {
				switch(status) {
				  case 0:
				    return { color: 'status-red', text: '答错' };
				  case 1:
				    return { color: 'status-blue', text: '答对' };
				  default:
				    return { color: 'status-red', text: '未知状态' }; // 默认情况
				}
			},
			keyStateMatch2(status) {
				switch(status) {
				  case 1:
				    return { color: 'status-blue', text: '文献论述' };
				  case 2:
				    return { color: 'status-blue', text: '历史时刻' };
					case 3:
					  return { color: 'status-blue', text: '历史图片' };
				  default:
				    return { color: 'status-red', text: '未知状态' }; // 默认情况
				}
			},
			dateFormatte(time) {
				let date = new Date(time);
				let formattedDate = date.toLocaleDateString('zh-CN', {
				  year: 'numeric', 
				  month: 'long', 
				  day: 'numeric'
				});
				return formattedDate;
			},
		}
	}
</script>

<style lang="scss">
	page {
	}
	.point-container {
		position: relative;
		width: 100%;
		min-height: calc(100vh - 50px);
		background-color: #fafbfe;
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
			// margin-top: 20px;
			.head-title {
				padding: 10px 20px;
				font-size: 16px;
			}
			.list-box{
				padding: 20px 20px;
				.list-item{
					margin-bottom: 40px;
					.quesetion-img {
						width: 80px;
						height: 40px;
						background-size: cover;  
						background-position: center; 
						background-repeat: no-repeat;
					}
					.list-item-title{
						display: flex;
						justify-content: space-between;
						color: #2A3563;
						font: 600 14px 'Plus Jakarta Sans';
						.list-item-status {
							font: 700 14px 'Plus Jakarta Sans';
						}
						.status-blue {
							color: #3658C9;
						}
						.status-red {
							color: #AC1010;
						}
					}
					.list-item-content {
						margin-top: 10px;
						width: 100%;
						color: #848FAC;
						font: 400 12px 'Plus Jakarta Sans';
						.answer {
							margin-bottom: 10px;
						}
					}
				}
			}
		}
	}
</style>