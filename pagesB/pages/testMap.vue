<template>
	<gui-page @scroll="scroll">
		 
	 <view slot="gBody" class="gui-flex " >
		 
		 <image src="../static/images/cj_bg.jpg" mode="widthFix" style="width:750rpx; z-index:-5"></image>
		
		 <text class="gui-color-black  gui-bold gui-h6"  style="background: none;position: absolute;z-index: 0;margin-top: 2150rpx;margin-left: 250rpx;">版本号:{{version}}</text>
	<view  style=" margin: 80rpx; position: absolute;margin-top: 650rpx;" >
		<view class="hb">
			<view class="hb-bd">
			<view class="hb-bd-turn">
			<gui-turntable-activity ref="guiturntable" 
			:rewardNames="rewardNames" 
			:rewardBGColors="rewardBGColors" 
			:rewardColors="rewardColors" @end="end"></gui-turntable-activity>
			<button v-if="userPhone==''"  v-show="showCJ" style="border-radius: 50%;background:none;z-index: 10;" class="gui-lucky-turntable-btn"   open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				<text class="gui-color-white  gui-bold gui-h2"  ></text>
			</button>
			<image class="gui-lucky-turntable-btn" v-show="showCJ"
			src="../static/images/ic_cj.png" 
			mode="widthFix" 
			@tap="scan()"
			:class="[luckyStatus == 1 ? 'gui-breathing' : '']">
			</image>
			
		<view class="lotteryModal" @touchmove.stop="handle" @click="closeLotteryModal" v-if="lotteryModalShow">
			<view class="lotteryModal-content animate__animated animate__zoomIn" @click.stop="handle">
				<view class="lotteryModal-content-body">
					<image src="https://funimg.pddpic.com/mobile_piggy/cash_back_three_choose_adv_img_10.png.slim.png" mode="" class="lotteryModal-content-body-bg"></image>
					<view class="lotteryModal-content-body-title">
						恭喜您中奖了
					</view>
					<view class="lotteryModal-content-body-bd">
						<image src="https://images.pinduoduo.com/market-lottie/2021-01-31/d221aa8d-d8f3-4f27-84e0-90459919e422_suffix.png" mode="" class="lotteryModal-content-body-bd-bg1"></image>
						<image src="https://images.pinduoduo.com/market-lottie/2021-01-31/164a356b-b62a-46bd-99cc-440e562136b2_suffix.png" mode="" class="lotteryModal-content-body-bd-bg2"></image>
						<image style="margin-bottom: 25rpx;" src="../static/images/ic_lbg.png" mode="" class="lotteryModal-content-body-bd-bg3"></image>
						<button v-if="nickName==''" @tap="getUserInfo()" class="gui-button lotteryModal-content-body-bd-bg3 " >
							<text class="gui-color-black  gui-bold gui-h2"  >领</text>
						</button>
						<button v-else class="gui-button lotteryModal-content-body-bd-bg3 " @tap="submitMony()">
							<text class="gui-color-black  gui-bold gui-h2"  >领</text>
						</button>
						<view class="lotteryModal-content-body-bd-money animate__animated animate__jackInTheBox" v-show="hongbaoMoneyShow" >
							<view class="lotteryModal-content-body-bd-money-num">
								{{money}}
							</view>
							<view class="lotteryModal-content-body-bd-money-yuan">
								元
							</view>
						</view>
					</view>
				</view>
				<!-- <image src="../static/images/close.png" mode="" class="lotteryModal-content-cancel" @click.stop="closeLotteryModal"></image> -->
			</view>
		</view>
		
		
				<gui-popup ref="guipopup1" :canCloseByShade="false"  >
					<view class="gui-relative gui-box-shadow ">
						<official-account style="width: 600rpx;height: 800rpx;"></official-account>
						<text class="gui-block-text   gui-icons gui-color-black  gui-absolute-rt  "
						@tap.stop="close1">&#xe78a;</text>
					</view>
					
					<!-- <view class="gui-relative gui-box-shadow ">
						 <image @tap="goPhoneBtn()" src="../static/images/ic_ddc.png"  style="width: 600rpx;height: 650rpx;"  
						></image> 
						<image  src="../static/images/ic_xxhg.png"  style="width: 600rpx;height: 650rpx;"
						></image>
						
						<text class="gui-block-text demo-close gui-icons gui-color-white gui-absolute-rt"
						@tap.stop="close1">&#xe78a;</text>
					</view> -->
				</gui-popup>
				
				<!-- <gui-popup ref="guipopup2"  :canCloseByShade="false">
							<view class="gui-flex gui-box-shadow gui-img-in">
								<image src="../static/images/ic_zjbg.png"  mode="widthFix" style=" z-index:-5;width: 550rpx;margin-right: 10rpx;"  
								></image>
								<text v-if="nowIndex==1||nowIndex==5" style="" class="gui-block-text demo-close gui-icons gui-color-white gui-absolute-rt"
								@tap.stop="close2">&#xe78a;</text>
							<image :src="currentDilogPic" mode="widthFix" style="position: absolute;width: 200rpx;margin-top: 550rpx;margin-left: 180rpx;"
							></image>
							<gui-tags v-if="nowIndex!=1&&nowIndex!=5" @tapme="goAddress" text="填写收货地址" bgClass="gui-bg-red" :size="26" :borderRadius="50" style="position: absolute;margin-top: 880rpx;margin-left: 180rpx;"></gui-tags>
							</view>
				</gui-popup> -->
				
				<gui-popup ref="guipopup2" >
							<view class="gui-relative gui-box-shadow gui-img-in">
								<image src="../static/images/ic_txcg.png"   style="width: 600rpx;height: 650rpx;"  
								></image>
								
								<text class="gui-block-text demo-close gui-icons gui-color-white gui-absolute-rt"
								@tap.stop="close2">&#xe78a;</text>
							</view>
				</gui-popup>
				
				
				
				<gui-modal ref="guipopup3" 
						title="录入抽奖码">
							<view slot="content" class="gui-padding gui-bg-gray">
								<image src="../static/images/ic_zy.png"   style="width: 500rpx;height: 150rpx;"
								></image>
								<input type="text" maxlength="27" style="font-size:25rpx;line-height:100rpx; padding:10rpx;"
								v-model="codeContent" @input="uppercase" placeholder="请输入兑换码内容" />
							  
							</view>
							<!-- 利用 flex 布局 可以放置多个自定义按钮哦  -->
							<view slot="btns" class="gui-flex gui-rows gui-space-between">
								<view class="modal-btns gui-flex1" style="margin-right:80rpx;">
									<text class="modal-btns gui-color-gray" @tap="close3">取消</text>
								</view>
								<view class="modal-btns gui-flex1" style="margin-left:80rpx;">
									<text class="modal-btns gui-color-blue" @tap="inputBtn()">提交抽奖</text>
								</view>
							</view>
						</gui-modal>
				
				<gui-action-sheet ref="guiactionsheet" @selected="selected" height="300" 
						title="请选择抽奖方式" :items="actionSheetItems"></gui-action-sheet>
		</view>
		</view>
		</view>
		</view>
		</view>
		</gui-page>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
var codeError1="http://fw.cn-tn.com/tn/";
var codeError2="http://k4C0hAXbxjnw~14?;/Q5";
var graceString = require('@/GraceUI5/js/string.js');
export default{
	data() {
		return {
			scenArry:[1001,1011,1017,1025,1047,1124,1038,1041,1089,1090,1104,1131,1187],
			nowIndex:"",
			currentDilogPic:"",
			version:"",
			code:"",
			nickName:"",
			openid:"",
			userPhone:"",
			QRcode:"",
			userInfo:{nickName:"",avatarUrl:""},
			lotteryModalShow : false,
			hongbaoMoneyShow : false,
			isLogin:false,
			showCJ:true,
			lotteryNum:1,
			codeContent:"",
			money:"",
			actionSheetItems : ['扫码抽奖','录码抽奖'],
			// 奖品名称
			rewardNames    : [
				{"cover": "http://cdn.letwind.com/zy/free/lottery/redpack.png",
				"name": "1888元"},
				{"cover": "http://cdn.letwind.com/zy/free/lottery/redpack.png",
				"name": "18.88元"},
				{"cover": "http://cdn.letwind.com/zy/free/lottery/redpack.png",
				"name": "188元"},
				{"cover": "http://cdn.letwind.com/zy/free/lottery/redpack.png",
				"name": "8.88元"},
				{"cover": "http://cdn.letwind.com/zy/free/lottery/redpack.png",
				"name": "18.88元"},
				 {"cover": "http://cdn.letwind.com/zy/free/lottery/redpack.png",
				"name": "1.88元"}
				],
			// 奖品展示区背景颜色
			rewardBGColors : ["#AE3EFF","#4D3FFF","#FC262C","#3A8BFF","#EE7602","#FE339F"],
			// 奖品展示区文本颜色
			rewardColors   :  ["#FFF000","#FFFFFF","#FFF000","#FFFFFF","#FFF000","#FFFFFF"],
			// 抽奖状态
			luckyStatus    : 0,// 0 等待抽奖  1 抽奖中
			// 奖项和概率数据结构，probability 为中奖概率，可以根据实际需求修改
			 model : [  {
				name : '1888',
				key : '0',
				probability : 9,
			},{
				name : '18.88',
				key : '5',
				probability : 45000,
			}, {
				name : '188',
				key : '4',
				probability : 40000,
			}, {
				name : '8.88',
				key : '3',
				probability : 4990,
			}, {
				name : '18.88',
				key : '2',
				probability : 9,
			},
			{
				name : '1.88',
				key : '1',
				probability : 9,
			}
			]
		
			}
	},
	
	methods:{
		goAddress(){
			this.close2();
			graceJS.navigate("../../pages/regist/regist_vip")
		},
		goPhoneBtn() {
			uni.makePhoneCall({
				// 手机号
				phoneNumber: '0572-6058030',
				// 成功回调
				success: (res) => {
				},
				// 失败回调
				fail: (res) => {
				}
			});
		},
		roll(){
				uni.pageScrollTo({
					duration: 100,//过渡时间
					scrollTop: 50,//到达目标class的top值
					})
				
			},
		getPhoneNumber (e) {
			var that=this;
			console.log("微信调用获取手机号=",e)
			console.log(e.detail.errMsg);
			console.log(e.detail.iv);
			console.log(e.detail.encryptedData);
			wx.checkSession({
							  success () {
							   console.log("checkSession success")
							  },
							  fail () {
								  console.log("checkSession fail 重新登录")
								   that.getWxCode() 
								    return//重新登录
							  }
							})
							//-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
							    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //用户点击拒绝
							         uni.showToast({
										 title:"你点击了拒绝,请重新授权",
										 icon:"none"
									 })
									 return
							    } else { //允许授权执行跳转 
									 that.iv=e.detail.iv;
									 that.encryptedData=e.detail.encryptedData;
									   console.log("执行获取 手机号解密")
									 setTimeout(()=>{
									 graceJS.get(
									 			that.apiUrl+'jf/redpacket/wxUpdatePhoneNumberNologin',
									 			{encryptedData : that.encryptedData,iv : that.iv,openid:that.openid}, // url 参数对象
									 			{}, 
									 			(res)=>{
									 				console.log('获取手机号解密');
									 				console.log(res);
									 				if(res.status=='SUCCESS'){
														if(res.result==""){
															 that.showToast("手机号解密失败")
														}else{
															that.userPhone=res.result;
															that.scan();
														}
									 					
									 					
									 				}else{
									 					that.userPhone="";
									 					 that.showToast("手机号解密接口报错")
									 				}
									 				
									 			},(error) => {
									 					console.log(error);
									 					 that.showToast("手机号解密接口报错")
									 			}
									 		);
									 		},500)
							    }
		
	
			
			
		 },
		 
		// 获取微信授权
			getWxCode() { 
				let that = this;
				uni.login({
					provider: 'weixin',
					timeout: 3000,
					success: res => {
						if (res.code) {
							 that.code=res.code;
							 console.log("微信获取openid的usercode="+res.code);
							 graceJS.post(
							 			that.apiUrl+'jf/redpacket/getWxOpenidNologin',
							 			{authcode:res.code},
							 			'json',
							 			{},
							 			(res) => {
							 				console.log('获取openid结果=',res);
							 				if(res.status=="SUCCESS"){
							 					 that.openid=res.result;
							 				}else{
							 					that.openid="";
							 				} ;
							 			},
							 			(error) => {
							 					console.log(error);
							 					 that.showToast("获取openid接口报错")
							 			}
							 		);
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},

		
		//01 居中弹出
		open1  : function () {this.$refs.guipopup1.open();},
		
		close1 : function () {this.$refs.guipopup1.close();},
		open2  : function () {this.$refs.guipopup2.open();},
		
		close2 : function () {this.$refs.guipopup2.close();},
		open3  : function () {this.$refs.guipopup3.open();},
		
		close3 : function () {this.$refs.guipopup3.close();},
		open() {
						this.$refs.guiactionsheet.open();
			},
		selected(index){
			console.log(index);
			if(index==0){
				this.scanbtn();
			}else if(index==1){
				this.open3()
			}
			// 返回索引，可以根据索引获取文本数据
			},
		scan(){
			console.log("当前状态=",this.luckyStatus)
			if(this.luckyStatus != 0){
				return ;
			}
			this.open();
			//this.scanbtn();
			//this.start(0);
			return
		},
		uppercase(){
			this.codeContent=this.codeContent.toUpperCase();
		},
		/* 录入兑换 */
		inputBtn(){
			let  that=this;
			var result=this.codeContent.toUpperCase();
			if(graceString.count(result)!=27){
				that.showToast("无效码，编码长度不足27位")
				return 
			}else if(graceString.search(result,'weixin', false)>-1||result==codeError2||graceString.search(result,'fw.cn', false)>-1){
				that.showToast("无效码，请输入池盖片上的二维码")
				return
			}
			this.close3();
			that.QRcode=result;
			  if(that.QRcode!=null&& that.QRcode!=undefined&&that.QRcode!=''){
						graceJS.post(
									that.apiUrl+'jf/redpacket/getRedpacketNologin',
									{batteryCode:that.QRcode,phoneNum:that.userPhone},
									'form',
									{},
									(res) => {
										console.log('post 异步请求成功');
										console.log(res);
										if(res.status=="SUCCESS"){
											that.showToast("扫码成功")
											graceJS.arrayEach(that.model, (item, index)=>{
															if(item.name==res.result){
																that.money=item.name;
																that.start(item.key);
															}
													});
											
											that.codeContent="";
										}else{
											that.showToast(res.result)
										} ;
										
									},
									(error) => {
											console.log(error);
											that.showToast(error.result)
										
									}
								);
			  	
			  }else{
				  that.showToast("兑换码无法识别！")
			  }
			
			
		},
		/* 扫码兑换 */
		scanbtn(){
			var that=this;
			uni.scanCode({
			    onlyFromCamera: true,
			    success: function (rest) {
			        console.log('条码内容：' + rest.result);
					/* if(graceString.search(rest.result,'weixin', false)>-1||rest.result==codeError2||graceString.search(rest.result,'fw.cn', false)>-1){
						that.showToast("无效码，请扫电池盖片上的二维码")
						return
					} */
					that.QRcode=rest.result;
					  if(that.QRcode!=null&& that.QRcode!=undefined&&that.QRcode!=''){
								graceJS.post(
											that.apiUrl+'jf/redpacket/getRedpacketNologin',
											{batteryCode:that.QRcode,phoneNum:that.userPhone},
											'form',
											{},
											(res) => {
												console.log('post 异步请求成功');
												console.log(res);
												if(res.status=="SUCCESS"){
													that.showToast("扫码成功")
													graceJS.arrayEach(that.model, (item, index)=>{
																	if(item.name==res.result){
																		that.money=item.name;
																		that.start(item.key);
																	}
															});
													
													
												}else{
													that.showToast(res.result)
												} ;
											},
											(error) => {
													console.log(error);
													that.showToast(error.result)
												
											}
										);
					  	
					  }else{
						  that.showToast("兑换码无法识别！")
					  }
					  
						
			}
			});
			
		},
		showToast(content){
			graceJS.msg(content);
		},
		getUserInfo(){
			if(this.nickName!=""){
				return
			}
			var that=this;
		        uni.getUserProfile({
		            desc:'Wexin', // 这个参数是必须的
		            success:res=>{
		                console.log("获取用户信息=",res)
						that.nickName=res.userInfo.nickName;
						that.submitMony();
		            },
		            fail:err=>{
						  that.showToast("抱歉，您取消了提现操作!")
		                console.log(err)
		            }
		        })
				
		    },
			
	
		submitMony(){
		var that=this;
		setTimeout(()=>{
			var wxUserInfostr={userName:this.nickName,openid:this.openid,userPhone:this.userPhone};
			console.log("wxUserInfostr=",JSON.stringify(wxUserInfostr))
				 if(this.userPhone!=""&&this.openid!=""){
					 var clickTimes= uni.getStorageSync("clickTimes");
					 if(clickTimes!=""){
						var charge=graceJS.now()-clickTimes;
						console.log("charge="+charge)
						if(charge<6000){
							console.log("间隔小于6秒，")
							return
						}
					 }
			
					 graceJS.post(
					 			that.apiUrl+'jf/redpacket/cashoutNologin',
					 			{batteryCode:that.QRcode, wxUserInfo:JSON.stringify(wxUserInfostr) },
					 			'form',
					 			{},
					 			(res) => {
					 				console.log('post 异步请求成功');
					 				console.log(res);
					 				if(res.status=="SUCCESS"){
					 					that.open2();
					 					that.closeLotteryModal()
					 				}else{
										that.showToast(res.result)
									};
					 			},
					 			(error) => {
					 					console.log(error);
					 			}
					 		);
				 }
					
				},1000)
			},
		start : function(index){
			
		 var that=this;
			if(this.luckyStatus != 0){
				return ;
			}
			this.luckyStatus = 1;
			// 抽奖流程
			// 检查抽奖次数，看用户是否还可以继续抽奖
			//if(用户不能抽奖){ 提示用户代码; return ;}
			// 向后端发起请求, 后端进行抽奖算法封装，返回中奖结果索引
			setTimeout(()=>{
				// 假设中奖 index 为 2
				/* var draw = this.Draw(this.model);js模拟抽奖
				console.log(draw) */
				this.$refs.guiturntable.goto(index);
				
			},500);
		},
		end : function(index){
			console.log(index);
			this.nowIndex=index;
			console.log(this.nowIndex);
			this.luckyStatus = 0;
			/* if(index==0){
				this.currentDilogPic="https://www.tn-hs.com/pms-pic/2022-08-19/018581d6-31a0-41b9-9474-f1cac4e2425a.png"
			}else if(index==1||index==5){
				this.currentDilogPic="https://www.tn-hs.com/pms-pic/2022-08-19/03b6b6a7-a81a-42c9-8606-1e043688bf4d.png"
			}else if(index==2){
				this.currentDilogPic="https://www.tn-hs.com/pms-pic/2022-08-19/f1d45422-141a-4a4a-bb2d-b0608a073ac8.png"
			}else if(index==4){
				this.currentDilogPic="https://www.tn-hs.com/pms-pic/2022-08-19/db9e2050-fcc4-43f4-beb4-aa60e6439c2c.png"
			}
			this.open2() */
			/* if(index==0){
				this.open1()
			}else{
				this.openLotteryModal()
			} */
			
			this.openLotteryModal()
		},
		openLotteryModal(){
			this.lotteryModalShow = true
			this.hongbaoMoneyShow=true
			this.showCJ=false
		},
		closeLotteryModal(){
			this.lotteryModalShow = false
			this.hongbaoMoneyShow = false
			this.showCJ=true
		},
		turn(){
			this.lotteryDo()
		},
	// 抽奖方法
		Draw:function (prizes) {
			var prizeList = [] //按照权重分解后的奖品数组
			prizes.map(function(item) {
				
				for (var i = 0; i < item.probability; i++) {
					prizeList.push({
						name : item.name,
						value : item.key
					})
				}
			});
			//prizeList = reset(prizeList);
			//console.log("prizeList",prizeList)
			// 范围随机数
			function randomFrom(lowerValue, upperValue) {
				return Math.floor(Math.random() * (upperValue - lowerValue + 1)
						+ lowerValue);
			};
			// 随机打乱数组
			function reset(arr) {
				var eachArr = arr.concat([])
				var lastArr = []
				function deepEach(deepArr) {
					if (deepArr.length) {
						var randomIndex = randomFrom(0, eachArr.length - 1)
						lastArr.push(eachArr[randomIndex])
						eachArr.splice(randomIndex, 1)
						deepEach(eachArr)
					}
				}
				deepEach(eachArr)
				return lastArr
			}
		  var random = randomFrom(0, prizeList.length - 1);
		  return prizeList[random]
		}

	},
	
	onShow() {
		this.getWxCode()
		let option =uni.getEnterOptionsSync();
		  console.log('小程序进入场景--------------------' + option.scene);
		  console.log('是否包含--------------------' + this.scenArry.includes(option.scene));
		  if(this.scenArry.includes(option.scene)){
			  this.open1()
		  }
		// #ifdef MP-WEIXIN  
		if(wx.hideHomeButton){  
		    wx.hideHomeButton();  
		}  
		// #endif
		this.roll();
		this.version=uni.getStorageSync("version");
	},

//提示滚动到固定位置上  

	/* onShow() {
		var total=1000;
			var first = 0;
			var second = 0;
			var third = 0;
			var four=0;
			var five=0;
			var six=0;
			var results = new Array(total);
		for(var i=0;i<total;i++){		
				// 获取中了几等奖
				var drawResult = this.Draw(this.model);
				// 生成相应奖项的随机金额
				var value = 0;
				if (drawResult.name == '0.88元') {
					// 1-200，两位小数
					value="0.88元"
					first++;
				} else if (drawResult.name == '1.88元') {
					// 0.5-1，两位小数
						value="1.88元"
					second++;
				} else if (drawResult.name == '3.88元') {
					// 0.3-0.5，两位小数
						value="3.88元"
					third++;
				}else if (drawResult.name == '8.88元') {
					// 0.3-0.5，两位小数
						value="8.88元"
					four++;
				}else if (drawResult.name == '88.88元') {
					// 0.3-0.5，两位小数
						value="88.88元"
					five++;
				}else if (drawResult.name == '888元') {
					// 0.3-0.5，两位小数
						value="888元"
					six++;
				}
				
				results[i] = value;
			}
			console.log("results:" + results);
			console.log("total:" + total);
			console.log("first:" + first + ",比例：" + (first / total));
			console.log("second:" + second + ",比例：" + (second / total));
			console.log("third:" + third + ",比例：" + (third / total));
			console.log("four:" + four + ",比例：" + (four / total));
			console.log("five:" + five + ",比例：" + (five / total));
			console.log("six:" + six + ",比例：" + (six / total));

	}
 */
}
</script>
<style lang="scss">
.gui-lucky-turntable{overflow:hidden; width:600rpx; height:600rpx; border-radius:100%;}
.gui-lucky-turntable-btn{width:160rpx; height:160rpx; position:absolute; left:205rpx; top:190rpx; z-index:9;}

@keyframes gui-breathing{
	0%{opacity:0.5; transform: scale(1,1);} 
	50%{opacity:1; transform: scale(1.08,1.08);} 
	100%{opacity:0.5; transform: scale(1,1);}
}
.gui-breathing{animation:gui-breathing 1200ms ease-in infinite;}

.hb{
		display: flex;
		flex-wrap: wrap;
		position: relative;
		border-radius: 50rpx;
		&-hd{
			width: 590rpx;
			margin: auto;
			margin-top: -120rpx;
			background-color: #fff9eb;
			border-radius: 40rpx 40rpx 0 0;
			position: relative;
			// margin-bottom: -60rpx;
			box-sizing: border-box;
			&-content{
				width: 590rpx;
				margin: 20rpx auto;
				background-color: #FFFFFF;
				border: 1px solid rgba(254,230,208,1);
				border-radius: 20rpx 20rpx 0 0;
				position: relative;
				box-sizing: border-box;
				height: 100%;
				&-head{
					width: 100%;
					height: 150rpx;
					&-user{
						display: flex;
						align-items: center;
						padding-top: 10rpx;
						&-logo{
							width: 80rpx;
							height: 80rpx;
							border-radius: 60rpx;
							margin-right: 10rpx;
							margin-left: 20rpx;
							flex-shrink: 0;
						}
						&-name{
							font-size: 30rpx;
							color: #b9562d;
						}
						&-center{
							flex-shrink: 0;
							margin-left: auto;
							background: #fda673;
							color: #fff;
							font-size: 26rpx;
							height: 50rpx;
							display: flex;
							align-items: center;
							border-radius: 50rpx 0 0 50rpx;
							padding-left: 20rpx;
							font-weight: 500;
							.iconiconfontjiantou2{
								font-size: 26rpx;
								padding: 0 4rpx;
							}
						}
					}
					&-money{
						text-align: center;
						font-size: 60rpx;
						line-height: 60rpx;
						color: #d72128;
						display: flex;
						align-items: flex-end;
						justify-content: center;
						margin-top: 40rpx;
						&-balance{
							display: flex;
							align-items: flex-end;
							justify-content: center;
							position: relative;
							&-do{
								font-size: 38rpx;
								line-height: 38rpx;
								margin-bottom: 4rpx;
							}
							&-wx{
								font-size: 24rpx;
								line-height: 1;
								position: absolute;
								right: 0;
								top: -20rpx;
								transform: translate(100%);
								background-color: #fcc68e;
								padding: 8rpx 10rpx;
								border-radius: 14rpx 14rpx 14rpx 0;
								color: #782a09;
							}
						}
					}
					&-btn{
						margin: auto;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 80rpx;
						width: 300rpx;
						margin-top: 30rpx;
						border-radius: 80rpx;
						background-color: #f33d31;
						color: #FFFFFF;
						// background: linear-gradient(to right, #fef8de , #fbe792);
						box-shadow: 0 4rpx 12rpx #b62e25; //8rpx 8rpx 16rpx #c5c5c5
						text-align: center;
						// color: #e81e10;
						animation-timing-function:ease-in-out;
						animation-name:breathe;
						animation-duration:500ms;
						animation-iteration-count:infinite;
						animation-direction:alternate;
					}
				}
				&::after{
					position: absolute;
					content: '';
					width: 548rpx;
					height: 16rpx;
					top: -14rpx;
					left: 12rpx;
					background: rgba(255,255,255,1);
					border: 1px solid rgba(254,230,208,1);
					border-width: 1px 1px 0 1px;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
					box-sizing: border-box;
				}
			}
		}
		&-bd{
			width: 100%;
			position: relative;
			
			background-size: 100% 100%;
			padding-top: 70rpx;
			padding-bottom: 40rpx;
			margin-top: -60rpx;
			box-sizing: border-box;
			&-turn{
				width: 566rpx;
				height: 566rpx;
				margin: auto;
				box-sizing: border-box;
				position: relative;
				&-content{
					width: 100%;
					height: 100%;
					padding: 40rpx;
					box-sizing: border-box;
					background-size: 100%;
					&.rotate{
						animation: turn 30s linear infinite;
						animation-fill-mode: forwards;
					}
					&-block{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						overflow: hidden;
						position: relative;
						transform: rotate(1deg);
						&-item{
							position: absolute;
							left: 50%;
							transform-origin: bottom center;
							display: flex;
							align-items: center;
							justify-content: flex-start;
							flex-direction: column;
							width: 243rpx;
							height: 243rpx;
							&-name{
								font-size: 28rpx;
								line-height: 1;
								font-weight: bold;
								color: rgba(195, 83, 31, 1);
								margin-top: 20rpx;
								margin-bottom: 10rpx;
							}
							&-img{
								display: block;
								width: 84rpx;
								height: 84rpx;
							}
							&.item0{
								transform: translateX(-50%) rotate(0deg);
							}
							&.item1{
								transform: translateX(-50%) rotate(60deg);
							}
							&.item2{
								transform: translateX(-50%) rotate(120deg);
							}
							&.item3{
								transform: translateX(-50%) rotate(180deg);
							}
							&.item4{
								transform: translateX(-50%) rotate(240deg);
							}
							&.item5{
								transform: translateX(-50%) rotate(300deg);
							}
						}
					}
				}
				&-btn{
					width: 282rpx;
					height: 286rpx;
					background: url(https://funimg.pddpic.com/spi_main/turntable_cursor_v2.png.slim.png) no-repeat;
					background-size: 100%;
					position: absolute;
					top: 180rpx;
					left: 144rpx;
					padding-top: 80rpx;
					text-align: center;
					box-sizing: border-box;
					&-lottery{
						color: rgba(253,37,81,1);
						font-weight: 600;
						font-size: 46rpx;
						line-height: 46rpx;
						background: linear-gradient( 180deg, rgba(255,254,251,1) 0%, rgba(255,204,149,1) 100% );
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
						--animate-duration: 2s;
					}
					&-last{
						margin-top: 8rpx;
						color: rgba(253,37,81,1);
						font-weight: 600;
						font-size: 24rpx;
						line-height: 24rpx;
						background: linear-gradient( 180deg, rgba(255,254,251,1) 0%, rgba(255,204,149,1) 100% );
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}
			}
		}
	}

.lotteryModal{
		width: 100%;
		height: 100%;
		background-color: rgba(000, 000, 000, 1);
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		&-content{
			--animate-duration: 0.3s;
			&-body{
				width: 600rpx;
				padding: 40rpx 0;
				// background-color: #DB5C4E;
				border-radius: 8px;
				position: relative;
				&-bg{
					position: absolute;
					position: absolute;
					top: -100rpx;
					left: -100rpx;
					width: 800rpx;
					height: 800rpx;
				}
				&-title{
					font-size: 42rpx;
					color: #FBECCB;
					font-weight: 700;
					text-align: center;
					margin-bottom: 30rpx;
				}
				&-bd{
					position: relative;
					z-index: 9;
					width: 320rpx;
					height: 485rpx;
					margin: auto;
					&-bg1{
						position: absolute;
						z-index: -1;
						top: 0;
						left: 0;
						width: 100%;
						height: 485rpx;
					}
					&-bg2{
						position: absolute;
						z-index: -1;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 166rpx;
					}
					&-bg3{
						position: absolute;
						z-index: -1;
						bottom: 60rpx;
						left: 50%;
						width: 140rpx;
						height: 140rpx;
						transform: translate(-50%);
					}
					&-title{
						padding-top: 120rpx;
						font-size: 30rpx;
						text-align: center;
						color: #FFFFFF;
						&-name{
							margin-bottom: 10rpx;
						}
					}
					&-money{
						padding-top: 130rpx;
						font-size: 26rpx;
						text-align: center;
						color: #FFFFFF;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						--animate-duration: 2s;
						&-num{
							font-size: 60rpx;
							line-height: 1;
						}
						&-yuan{
							
						}
					}
				}
				&-question{
					margin: auto;
					display: block;
					border: none!important;
					font-size: 28rpx;
					color: #576b95!important;
					margin-top: 30rpx;
				}
			}
			&-cancel{
				width: 50rpx;
				height: 50rpx;
				margin: auto;
				display: block;
				margin-top: 60rpx;
			}
		}
		
	}
.bg3{
		position: absolute;
		z-index: -1;
		bottom: 60rpx;
		left: 50%;
		width: 140rpx;
		height: 140rpx;
		transform: translate(-50%);
					}
.modal-btns{line-height:88rpx; font-size:26rpx; text-align:center; width:200rpx;}
.demo-close{width:100rpx; height:100rpx; line-height:100rpx; opacity:0.88; text-align:center; font-size:58rpx;}
</style>