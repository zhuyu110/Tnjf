<template>
	<gui-page :fullPage="true" :isLoading="pageLoading" ref="guiPage" :customHeader="true">
		<view slot="gHeader" class="gui-margin-top gui-bg-gray gui-padding "  >
					<gui-speaker 
					:items="speakerMsgs" 
					:vertical="true" 
					@change="chang2" :current="0" 
					styles="overflow:hidden; height:60rpx; line-height:60rpx; font-size:28rpx; color:#ED6A0C;">
						<text slot="icon" class="gui-block-text gui-icons demo-icon gui-color-orange" style="width:100rpx;">&#xe62b;</text>
					</gui-speaker>
		</view>
		<view slot="gBody" class="gui-flex1">
			
			<!-- 确认订单弹框 -->
			<gui-modal ref="guimodal1" 
					title="确认订单">
						<view slot="content" class="gui-padding gui-bg-gray" style="height: 320rpx; ">
								<form @submit="submit">
									<view class="gui-form-item gui-border-b">
										<text class="gui-form-label">收货地址</text>
										<view class="gui-form-body">
											<picker mode="selector" :range="address" @change="pickerChange">
												<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
													<text class="gui-text">{{address[addressIndex]}}</text>
													<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
												</view>
											</picker>
										</view>
									</view>
									<view class="gui-form-item gui-border-b gui-margin-top">
									<view class="gui-form-body">
										<view class="gui-flex gui-rows gui-nowrap gui-cate-product-list1">
											<view class="gui-cate-pimg">
												<gui-image :src="imgURL+product.sysAttachVOS[0].url" :width="150" :height="150" borderRadius="10rpx"></gui-image>
											</view>
											<view class="gui-cate-pbody">
												<text class="gui-text gui-primary-color gui-block-text">{{product.goodsName}}</text>
												<view class="gui-flex gui-rows gui-nowrap gui-space-between">
													<text class="gui-cate-price gui-color-red">{{product.pricepoints==null? "0":product.pricepoints}}积分 * {{baseAmount}}</text>
												</view>
											</view>
											<view class="gui-list-arrow-right " style="margin-right: 70rpx;">
												<gui-step-box width="150rpx" @change="change" :disabled="true" :value="baseAmount"></gui-step-box>
											</view>
										</view>
									</view>
									</view>
									
								</form>
							
								</view>
						<!-- 利用 flex 布局 可以放置多个自定义按钮哦  -->
						<view slot="btns" class="gui-flex gui-rows gui-space-between">
							<view class="modal-btns gui-flex1" style="margin-right:80rpx;">
								<text class="modal-btns gui-color-gray" @tap="close1">取消</text>
							</view>
							<view class="modal-btns gui-flex1" style="margin-left:80rpx;">
								<text class="modal-btns gui-color-blue" @tap="confirm1">确认</text>
							</view>
						</view>
					</gui-modal>
			<!-- 搜索框 -->
			
			<gui-modal ref="guimodal2" :canCloseByShade="true" 
			:title="dialogTitle" style="margin-top: 300rpx;" >
				<view slot="content" class="gui-padding gui-bg-gray" >
					<text class="gui-block-text gui-text-center gui-text gui-color-red1" 
					style="line-height:100rpx; padding:10rpx;">{{dialogContent}}</text>
				</view>
				<!-- 利用 flex 布局 可以放置多个自定义按钮哦  -->
				<view slot="btns" class="gui-flex gui-rows gui-space-between">
					<view class="modal-btns gui-flex1" style="margin-right:80rpx;">
						<text class="modal-btns gui-color-gray" @tap="close2">取消</text>
					</view>
					<view class="modal-btns gui-flex1" style="margin-left:80rpx;">
						<text class="modal-btns gui-color-blue  " @tap="confirm2">{{confirmTxt}}</text>
					</view>
				</view>
			</gui-modal>
			
			<view class="header-search gui-bg-gray gui-border-box">
				<gui-search @clear="search" @confirm="search"></gui-search>
			</view>
			<!-- 主体区域 -->
			<view class="gui-flex gui-rows gui-space-between">
				<!-- 左侧分类列表 -->
				<scroll-view :scroll-y="true" :show-scrollbar="false" 
				:scroll-with-animation="true" :scroll-into-view="leftTo" 
				class="gui-cate-left" :style="{height:mainHeight+'px'}">
					<view class="gui-cate-left-item gui-border-box" 
					v-for="(item, index) in mainCate" :key="index" 
					:class="[currentCateIndex == item.typecode ? 'gui-cate-left-current' : '']">
						<text class="gui-border-l" 
						:class="['gui-cate-left-item-title','gui-block-text', currentCateIndex == item.typecode ? 'gui-cate-left-current' : '']" 
						:data-cateid="item.typecode" @tap='changCate' 
						:id="'cate'+item.typecode">{{item.typename}}</text>
					</view>
				</scroll-view>
				<!-- 右侧列表 -->
				<scroll-view 
				:scroll-into-view="productListTo" :show-scrollbar="false" 
				:scroll-with-animation="true" :scroll-y="true" 
				class="gui-cate-right" 
				:style="{height:mainHeight+'px'}" @scroll="rscroll">
					<!-- 循环展示分类及分类对应的产品列表 -->
					<view class="gui-margin-top "  :id="'productList'+cate.typecode" 
					v-for="(cate, idx) in mainCate" :key="idx">
					
						<text class="gui-block-text gui-h6 gui-bold gui-color-gray gui-cate-right-title">{{cate.typename}}</text>
						<!-- 循环展示产品 -->
						<view class="gui-flex gui-rows gui-nowrap gui-cate-product-list" style="position: relative;"
						v-for="(product, pidx) in cate.jfGoodsVOList" :key="pidx" 
						:id="'products'+product.id" :data-parentid="cate.typecode">
						<view v-if="platform=='ios'&&!isVip&&product.isVip">
						</view>
						<view v-else class="gui-flex gui-rows gui-nowrap gui-cate-right-title" style="position: relative;">
							<view class="gui-cate-pimg" >
							<gui-image :src="imgURL+product.sysAttachVOS[0].url" :width="150" :height="150" borderRadius="10rpx"></gui-image>
							</view>
							<view class="gui-cate-pbody">
								<text class="gui-text gui-primary-color gui-block-text gui-ellipsis ">{{product.goodsName}}</text>
								<view class="gui-flex gui-rows gui-nowrap gui-space-between">
									<text class="gui-cate-price gui-color-red">{{product.pricepoints==null? "0":product.pricepoints}}积分</text>
								</view>
								<view class="gui-flex gui-rows gui-nowrap gui-space-between">
									<text></text>
									<text :data-productid="product.id" :data-product="product"  class="gui-bg-orange gui-color-white demo-sub-btn gui-block-text " @tap="submit">兑换</text>
								</view>
							</view>
							<text @tap="registVIP" v-if="!isVip&&product.isVip" class="item_vip  gui-color-white gui-text-center gui-bg-red4" >非会员版不可查看,1元加入VIP俱乐部</text>
						</view>
						
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</gui-page>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
var cateChangeData = require('@/GraceUI5/demoData/cateChange.js');
export default {
	data() {
		return {
			platform:global.platform(),
			speakerMsgs : [
							{ title: "加入会员，获取双倍积分特权", url: "../shop/shop", opentype: "switchTab"},
							{ title: "兑换的商品每月25号发货到代理商", url: "../shop/shop", opentype: "switchTab"}
						],
			isVip:false,
			baseAmount:1,
			imgURL:'',
			dialogTitle:"完善信息",
			dialogContent:"完善店铺信息？",
			confirmTxt:"确定",
			product:{},
			addressList:[],
			address:[],
			addressIndex:0,
			// 全屏加载，当数据请求完毕时关闭
			pageLoading : true,
			// 核心区域高度
			mainHeight  : 300,
			// 左侧分类定位
			leftTo      : 'cate',
			// 标识切换时左侧点击触发的
			isLeftTap   : false,
			// 左侧分类数据
			mainCate    : [],
			// 当前分类
			currentCateIndex : 1,
			// 延迟执行防止卡顿
			scrollTimer : null,
			// 产品列表滚动定位
			productListTo: ''
		}
	},
	onLoad:function(){
		// 获取页面主体高度从而得出主体高度
		graceJS.getRefs('guiPage', this, 0, (ref)=>{
			ref.getDomSize('guiPageBody', (e)=>{
				console.log(e);
				// 02. 导航的高度
				// 可以 使用 graceJS.select() 函数动态获取， 也可以使用 uni.upx2px 转换已知高度
				this.mainHeight  = e.height - uni.upx2px(110);
				setTimeout(()=>{
					this.pageLoading = false;
				},1000)
			});
		});
		this.getProducts();
		
	},
	onShow() {
		/* this.dialogTitle="温馨提示";
		this.dialogContent="由于系统升级，暂停相关功能，系统升级期间，您现有积分将持续保留，已兑换的礼品，将在近期发货！",
		 */
		this.isVip=uni.getStorageSync("isVip");
		var addressList=uni.getStorageSync("addressList");
		if(addressList==''){
			addressList=[];
			this.address=[];
		}
		this.imgURL=this.imgUrl;
		this.addressList=addressList;
		// 遍历数据 转换对象格式
		this.addressList.forEach((item)=>{
			this.address.push(item.name+item.area+item.address+item.phoneno);
		});
	},
	methods: {
		chang2:function(e){},
		registVIP:function(){
			console.log("注册vip")
			if(global.isLogin()){
				if(!global.business()){
					this.dialogTitle="完善信息";
					this.dialogContent="完善店铺信息？";
					this.confirmTxt="确定";
				}else{
					this.confirmTxt="充值";
					this.dialogTitle="注册会员";
					this.dialogContent="确定充值1元成为会员吗?";
				}
			}else{
				graceJS.navigate("../login/login");
			}
				this.$refs.guimodal2.open();
		},
		//获取产品列表
		getProducts:function(){
			var that=this;
			uni.gRequest.get(
						'jf/goods/getJfGoodsListNologin',
						{}, 
						(res)=>{
							console.log('get 异步请求成功');
							console.log(res);
							that.mainCate = res.result;
						},
						(error)=>{
							console.log(error);
						},
						(res) => {
							uni.hideLoading();
						}
					);
			
			
		},
		change : function(e){
					console.log(e[0]);
					this.baseAmount=e[0];
					
				},
				
// picker 切换
		pickerChange : function (e) {
			console.log(e);
			this.addressIndex    = e.detail.value;
			
		},
		close1 : function () {
			this.$refs.guimodal1.close();
		},
		confirm1 : function () {
			// 客户点击确认按钮后的逻辑请在此处实现
			//调用下单接口
			//提交兑换id
			if(this.address.length<=0){
				graceJS.showLoading("请选择收货地址！");
				setTimeout(()=>{uni.hideLoading();},1000)
				return ;
			}
			var that=this;
			graceJS.showLoading("上传订单中！");
			uni.gRequest.post(
						'jfOrder/orderSubmit',
						{
							data:{
								goodsId:that.product.id,
								baseNum:that.baseAmount,
								baseAmount:that.product.pricepoints*that.baseAmount,
								sendAddress:that.address[that.addressIndex]
							}
						}, 
						(res)=>{
							console.log('post 异步请求成功');
							console.log(res);
							if(res.status=='SUCCESS'){
								uni.hideLoading();
								this.$refs.guimodal1.close();
							}else{
								console.log("fail="+res.errorMsg)
								graceJS.showLoading(res.errorMsg);
								setTimeout(()=>{uni.hideLoading();},1000)
							}
							
						},
						(error)=>{
							console.log(error);
						},
						(res) => {
							//uni.hideLoading();
							
						}
					);
			
			
			
		},
		close2 : function () {
			this.$refs.guimodal2.close();
		},
		confirm2 : function () {
			// 客户点击确认按钮后的逻辑请在此处实现
			//调用下单接口
		if(this.confirmTxt=="充值"){
			uni.gRequest.get(
						'jfPay/payVip',
						{}, 
						(res)=>{
							console.log('post 异步请求成功');
							console.log(res);
							var orderId=res.result.id;
							if(res.status=="SUCCESS"){
								// 仅作为示例，非真实参数信息。
								var result=res.result.zfReturn;
								var resultjson=JSON.parse(result);
								uni.requestPayment({
								    provider: 'wxpay',
								    timeStamp: resultjson.timeStamp,
								    nonceStr: resultjson.nonce_str,
								    package: 'prepay_id='+resultjson.prepay_id,
								    signType: 'MD5',
								    paySign: resultjson.paySign,
								    success: function (res) {
										uni.gRequest.post(
													'jfPay/successCallbackByVip',
													{
														data:{
															id:orderId
														}
													}, 
													(res)=>{
														console.log('post 异步请求成功');
														console.log(res);
														uni.setStorageSync("isVip",true);
													},
													(error)=>{
														console.log(error);
													},
													(res) => {
														uni.hideLoading();
													}
												);
								        console.log('success:' + JSON.stringify(res));
										
								    },
								    fail: function (err) {
										uni.gRequest.post(
													'jfPay/errorCallbackByVip',
													{
														data:{
															id:orderId
														}
													}, 
													(res)=>{
														console.log('post 异步请求成功');
														console.log(res);
														
													},
													(error)=>{
														console.log(error);
													},
													(res) => {
														uni.hideLoading();
													}
												);
								        console.log('fail:' + JSON.stringify(err));
								    }
								});
							}
						},
						(error)=>{
							console.log(error);
						},
						(res) => {
							uni.hideLoading();
						}
					);
		
			
		}else{
			graceJS.navigate("../regist/regist_vip")
		}
		
		this.$refs.guimodal2.close();
		},
		submit: function(e){
			/* this.$refs.guimodal2.open();
			return */
			console.log(e)
			if(global.isLogin()){
				if(!global.business()){
					this.$refs.guimodal2.open();
				}else{
					this.baseAmount=1;
					this.$refs.guimodal1.open();
				}
			}else{
				graceJS.navigate("../login/login");
				return;
			}
			var productId=e.currentTarget.dataset.productid;
			this.product=e.currentTarget.dataset.product
		
			
		},
		changCate : function (e) {
			this.isLeftTap = true;
			var cateid = e.currentTarget.dataset.cateid;
			this.currentCateIndex = cateid;
			if(cateid == 1){
				this.productListTo     = 'productList2';
				this.$nextTick(()=>{
					this.productListTo = 'productList' + cateid;
				});
			}else{
				this.productListTo     = 'productList' + cateid;
			}
			setTimeout(()=>{this.isLeftTap = false;},3000)
			
		},
		rscroll : function(e){
			if(this.isLeftTap){return ;}
			if(this.scrollTimer != null){
				clearTimeout(this.scrollTimer);
			}
			this.scrollTimer = setTimeout(()=>{this.getIndex();}, 100);
		},
		// 动态识别分类激活
		getIndex: function (i){
			const query = uni.createSelectorQuery()
			query.selectAll('.gui-cate-product-list').boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec((res) => {
				var products = res[0];
				for(let i = 0; i < products.length; i++){
					if (products[i].top > 0 && products[i].top >= this.mainHeight / 2){
						this.currentCateIndex = products[i].dataset.parentid,
						this.leftTo = 'cate' + products[i].dataset.parentid;
						break ;
					}
				}
				console.log(this.leftTo);
			});
		},
		// 搜索
		search : function(e){
			var kwd = e;
			var searchIndex = -1;
			var index = 0;
			for(var k in this.mainCate){
				for(var i = 0; i < this.mainCate[k].jfGoodsVOList.length; i++){
					if(this.mainCate[k].jfGoodsVOList[i].goodsName.indexOf(kwd) != -1){
						searchIndex = this.mainCate[k].jfGoodsVOList[i].id;
						break;
					}
					index++;
				}
				if(searchIndex != -1){break ;}
			}
			if(searchIndex != -1){
				this.productListTo = 'products' + searchIndex;
			}
			
		}
	}
}
</script>
<style>
@import "@/GraceUI5/css/colors.css";
.header-search{padding:20rpx 80rpx; width:750rpx;}
.gui-cate-left{width:200rpx; background-color:#F6F7F8;}
.gui-cate-right{width:520rpx; overflow:hidden;}
.gui-cate-left-item{height:100rpx; padding:35rpx 0; font-size:26rpx;}
.gui-cate-left-item-title{line-height:32rpx; font-size:28rpx; border-color:#F6F7F8; border-left-width:8rpx; text-align:center;}
.gui-cate-left-current{border-color:#FF0066 !important; background-color:#FFFFFF; color:#FF0066; font-weight:bold;}
.gui-cate-right-title{line-height:80rpx;}
.gui-cate-product-list{margin-bottom:30rpx; margin-right:25rpx;}
.gui-cate-product-list1{ margin-right:5rpx;}
.gui-cate-pimg{width:150rpx;}
.gui-cate-pbody{margin-left:30rpx; width:300rpx; flex:1; padding-top:-20rpx;}
.gui-cate-price{font-size:32rpx; line-height:60rpx;}
.demo-sub-btn{padding:10rpx 25rpx; line-height:30rpx; font-size:24rpx; border-radius:6rpx;}
.modal-btns{line-height:88rpx; font-size:35rpx; text-align:center; width:200rpx;}
.item_vip{height: 180rpx;width: 500rpx;line-height: 80rpx;border-radius: 20rpx;z-index: 9;position: absolute;}

</style>