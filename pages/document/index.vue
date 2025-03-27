<template>
	<view class="index-container">
		<image class="bg-img" src="@/static/images/bg.png" ></image>
		<view class="content">
			<view class="head-title">伟人文献</view>
			<view class="search-box">
				<input v-model="title" type="text" class="my-input" placeholder="文献名称"/>
				<view @click="toSearch" class="search-icon">
					<image style="width: 48px;height: 48px;" src="@/static/images/seach.png"></image>
				</view>
			</view>
			<view class="list-box">
				<view @click="openLink(item.content,item.id)" v-for="(item,index) in bookList" class="my-card">
					<view class="left">
						<view class="number">{{index +1}}</view>
						<view class="book-img">
							<image style="width: 57px;height: 73px;" :src="item.pic" mode="center"></image>
						</view>
						<view class="book-info">
							<view class="book-title">{{item.title}}</view>
							<view class="read-num">阅读量 {{item.count}}</view>
						</view>
					</view>
				  <view v-if="index<3" class="right">
						<image style="width: 40px;height: 40px;" :src="getRankImage(index + 1)"></image>
					</view>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	import {getBookList,getBookById} from '@/api/book/book.js'
	export default {
		data() {
		  return {
				name: this.$store.state.user.name,
				title:undefined,
				bookList:[]
		  }
		},
		computed: {
		  avatar() {
		    return this.$store.state.user.avatar
		  },
		},
		onLoad() {
			
		},
		onShow() {
			this.toGetBookList()
		},
		methods: {
			toGetBookList() {
				let param = {
					title: this.title
				}
				getBookList(param).then(res => {
					this.bookList = res.data
				})
			},
			toSearch(){
				this.toGetBookList()
			},
			getRankImage(rank) {
			    switch (rank) {
			        case 1:
			            return require('@/static/images/rank/num1.png');
			        case 2:
			            return require('@/static/images/rank/num2.png');
			        case 3:
			            return require('@/static/images/rank/num3.png');
			        default:
			            return '';
			    }
			},
			openLink(url,bookId) {
				getBookById(bookId).then(res => {
					uni.navigateTo({
					    url: `/pages/webview/webview?url=${encodeURIComponent(url)}`
					});
				})
			},
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
			// z-index: -1;
			position: absolute;
			top: 246px;
			left: 50%;
			width: 600px;
			height: 600px;
			transform: translateX(-50%);
			object-fit: cover; /* 确保图像覆盖 */
		} 
		.content {
			z-index: 1;
			position: relative;
			padding: 0 20px;
			.head-title {
				padding: 30px 0;
				color: #ffffff;
				font: 600 24px 'Plus Jakarta Sans';
				text-align: center;
			}
			.search-box {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 10px;
				.my-input{
					padding:0 30px;
					height: 48px;
					width: 259px;
					color: #ffffff;
					border: 1.5px solid #DFE8F6;
					border-radius: 8px;
					font: 500 12px 'Plus Jakarta Sans';
				}
				.uni-input-placeholder {
					color: #ffffff;
				}
			}
		  .list-box {
				margin-top: 24px;
				.my-card {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 15px;
					padding: 10px 15px;
					border-radius: 20px;
					background-color: #ffffff;
					.left {
						display: flex;
						align-items: center;
						gap: 20px;
						.number {
							width: 24px;
							height: 24px;
							border-radius: 24px;
							border: 1.5px solid #E6E6E6;
							text-align: center;
							line-height: 24px;
						}
						.book-info {
							.book-title{
								font: 500 16px 'Rubik';
								color: #0C092A;
							}
							.read-num {
								margin-top: 8px;
								color: #858494;
							}
						}
					}
				}
			}
			
		}
	}
</style>