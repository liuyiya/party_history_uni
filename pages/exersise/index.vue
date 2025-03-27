<template>
	<view class="exercise-index">
		<image class="bg-img" src="@/static/images/bg.png" ></image>
		<view class="content">
			<view class="head-title">首页</view>
			<view class="progress-box">
				<view class="title">您当前的答题进度</view>
				<view class="progress">
					<view class="cu-progress round margin-top">
					    <view class="bg-blue-gradient" :style="{ width: (currentQuestionIndex + 1) / questionNum * 100 + '%' }"></view>
					</view>
				</view>
				<view v-if="type==1" class="number-box">{{essayQuestions[currentQuestionIndex].sort}}/{{questionNum}}</view>
				<view v-if="type!=1" class="number-box">{{multipleChoiceQuestions[currentQuestionIndex].sort}}/{{questionNum}}</view>
			</view>
			<view v-if="type==1" class="topic-box">
				<view class="topic">{{essayQuestions[currentQuestionIndex].sort}}、{{essayQuestions[currentQuestionIndex].question}}</view>
				<view class="answer">
					<textarea v-model="answerValue" placeholder="请输入"/>
				</view>
			</view>
			<view v-if="type==2" class="topic-box">
				<view class="topic">{{multipleChoiceQuestions[currentQuestionIndex].sort}}、{{multipleChoiceQuestions[currentQuestionIndex].question}}</view>
				<view class="select-box">
					<radio-group @change="radioChange">
					 	<label class="uni-list-cell uni-list-cell-pd">
							<radio style="transform:scale(0.5)" 
							  :value="'A'"
							  :checked="answerValue === 'A'"/>
							  {{multipleChoiceQuestions[currentQuestionIndex].optionA}}
						</label>
						<label class="uni-list-cell uni-list-cell-pd">
							<radio style="transform:scale(0.5)" 
							  :value="'B'" 
							  :checked="answerValue === 'B'"/>
							  {{multipleChoiceQuestions[currentQuestionIndex].optionB}}
						</label>
						<label class="uni-list-cell uni-list-cell-pd">
							<radio style="transform:scale(0.5)" 
							  :value="'C'" 
							  :checked="answerValue === 'C'"/>
							  {{multipleChoiceQuestions[currentQuestionIndex].optionC}}
						</label>
					</radio-group>
				</view>
			</view>
			<view v-if="type==3" class="topic-box">
				<view class="topic">{{multipleChoiceQuestions[currentQuestionIndex].sort}}、这里是哪里？</view>
				<view class="select-img-box">
					<image style="width: 100%; height: 140px;" :src="multipleChoiceQuestions[currentQuestionIndex].question" mode="aspectFit"> </image>
				</view>
				<view class="select-box">
					<radio-group @change="radioChange">
					 	<label class="uni-list-cell uni-list-cell-pd">
							<radio style="transform:scale(0.5)" 
							  :value="'A'"
							  :checked="answerValue === 'A'"/>
							  {{multipleChoiceQuestions[currentQuestionIndex].optionA}}
						</label>
						<label class="uni-list-cell uni-list-cell-pd">
							<radio style="transform:scale(0.5)" 
							  :value="'B'" 
							  :checked="answerValue === 'B'"/>
							  {{multipleChoiceQuestions[currentQuestionIndex].optionB}}
						</label>
						<label class="uni-list-cell uni-list-cell-pd">
							<radio style="transform:scale(0.5)" 
							  :value="'C'" 
							  :checked="answerValue === 'C'"/>
							  {{multipleChoiceQuestions[currentQuestionIndex].optionC}}
						</label>
					</radio-group>
				</view>	
			</view>
		</view>
		<view class="my-button-box">
			<button @click="goToPreviousQuestion" class="cu-btn lg my-button my-bg-white">
			  上一题
			</button>
			<button @click="goToNextQuestion" class="cu-btn lg my-button my-bg-red">
			  {{bottonValue}}
			</button>
		</view>
	</view>
</template>

<script>
	import {getQuestionList,answerQuestion,startOrEnd} from '@/api/exersis/qusetion.js'
	
	export default {
		data() {
		  return {
				userId:this.$store.state.user.userId,
				name: this.$store.state.user.name,
				type: undefined,
				questionInfo: undefined,
				questionNum: undefined, //题目数量
				essayQuestions: undefined, //简答题
				multipleChoiceQuestions: undefined, //选择题
				exersiseInfo: undefined,
				loading: true,
				allNumber: undefined,
				currentQuestionIndex: 0, // 当前题目索引
				answerValue: '' ,//答题内容
				bottonValue:'下一题'
		  }
		},
		computed: {
		  avatar() {
		    return this.$store.state.user.avatar
		  },
		},
		onLoad(options) {
			this.type = options.type
			this.getQuestionInfo()
		},
		methods: {
			getQuestionInfo() {
				let param = {
					type: this.type
				}
				getQuestionList(param).then(res => {
					this.questionInfo = res.data
					this.essayQuestions = res.data.essayQuestions
					this.multipleChoiceQuestions = res.data.multipleChoiceQuestions
					console.log('type',this.type)
					if(this.type == 1) {
						this.questionNum =res.data.essayQuestions.length
					}else{
						this.questionNum =res.data.multipleChoiceQuestions.length
					}
				})
			},
			radioChange(evt) {
				this.answerValue = evt.detail.value
			},
			toEndLearn(){
				const that = this
				let param = {
					userId: this.userId,
					type: this.type,
					status: 1
				}
				startOrEnd(param).then(res => {
					// if(res.data) {
						this.$tab.redirectTo("/pages/exersise/finish");
						// this.$modal.msgSuccess("答题完成");
						// setTimeout(()=> {
						// 	this.$tab.switchTab("/pages/index");
						// },1500)
					// }else {
					// 	this.$modal.msgError("提交失败");
					// }
				})
			},
			goToNextQuestion() {
				if(!this.answerValue) {
					this.$modal.msg('请填写答案！')
					return
				}
				const that = this
				let questionId,questionInfo
				if(this.type == 1) {
					questionId = this.essayQuestions[this.currentQuestionIndex].id
					questionInfo = this.essayQuestions
				}else {
					questionId = this.multipleChoiceQuestions[this.currentQuestionIndex].id
					questionInfo = this.multipleChoiceQuestions
				}
				let param = {
					userId: this.userId,
					type: Number(this.type),
					questionId: questionId,
					answer: this.answerValue
				}
			  if (this.currentQuestionIndex < this.questionNum - 1) {
					answerQuestion(param).then(res => {
						// if(res.data) {
							this.currentQuestionIndex++;
							this.answerValue = ''
							if(this.currentQuestionIndex == (this.questionNum-1)) {
								this.bottonValue = '提交'
							}
						// }else {
						// 	uni.showToast({
						// 	    title: '提交答案失败',
						// 	    icon: 'none'
						// 	});
						// }
					})
			  } else {//已是最后一题
				    answerQuestion(param).then(res => {
				    	// if(res.data) {
				    		this.toEndLearn()
				    	// }else {
				    	// 	uni.showToast({
				    	// 	    title: '提交答案失败',
				    	// 	    icon: 'none'
				    	// 	});
				    	// }
				    })
			  }
			},
			goToPreviousQuestion() {
			    if (this.currentQuestionIndex > 0) {
			        this.currentQuestionIndex--;
			    } else {
			        uni.showToast({
			            title: '已是第一题',
			            icon: 'none'
			        });
			    }
			}
		}
	}
</script>

<style lang="scss">
	page {
	  box-sizing: border-box;
	  background-color: #fafbfe;
	  min-height: 100%;
	  height: auto;
		.my-bg-white{
			background-color: #FFFFFF;
			color: #000000;
		}
		.my-bg-red{
			background-color: #CF2929 !important; 
			color: #ffffff;
		}
		.bg-blue-gradient {
			background: linear-gradient(to right,rgba(61, 92, 255, 0.5),rgba(61, 92, 255, 1));
		}
	}
	.exercise-index {
		position: relative;
		width: 100%;
		min-height: calc(100vh - 44px);
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
			.head-title {
				padding: 20px 0 20px 0;
				color: #ffffff;
				font: 600 24px 'Plus Jakarta Sans';
				text-align: center;
			}
			.progress-box {
				padding: 20px 40px 20px 40px;
				margin: 0px 15px 15px 15px;
				height: 124px;
				background-color: #FFE7EE;
				border-radius: 15px;
				.cu-progress{
					background-color: #ffffff;
					.bg-blue-gradient {
						background: #FF3D3D;
					}
				}
				.title {
					color: #1F1F39;
					font: 700 16px 'Poppins';
				}
				.number-box {
					margin-top: 5px;
					color: #1F1F39;
					font: 700 20px 'Poppins';
				}
			}
		  .topic-box {
		  	margin: 0 15px;
		  	padding: 20px 20px 20px 20px;
		  	background-color: #ffffff;
		  	border-radius: 15px;
		  	color: #858597;
		  	font: 400 12px 'Poppins';
				.select-img-box {
					margin-top: 20px;
				}
				.select-box {
					margin-top: 20px;
				}
		  	.answer {
		  		margin-top: 30px;
		  		background-color: #FFE7EE;
		  		border-radius: 15px;
		  		min-height: 150px;
		  		textarea {
		  			padding: 15px 15px;
		  			font: 400 12px 'Poppins';
		  			color: #000000;
		  		}
		  	}
		  }
		}
		
		.my-button-box{
			display: flex;
			justify-content: space-between;
			gap: 30px;
			padding: 80px 15px 40px 15px;
			.my-button{
				flex: 1;
				height: 52px;
				font: 600 16px 'Plus Jakarta Sans';
				border-radius: 10px;
			}
		}
	}
</style>