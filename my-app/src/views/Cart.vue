<template>
  <div class="hander-car">
			<div class="store-content">
				<div class="cart-box">
					<div class="title">
						<h2>购物清单</h2>
					</div>
					<div class="cart-inner">
						<div class="empty-label hide">
							<h3>您的购物车中还没有商品</h3>
							<a class="link" href="javascript:;">现在选购</a>
						</div>
						<div>
							<div class="cart-table-title">
								<span class="name">商品信息</span>
								<span class="operation">操作</span>
								<span class="subtotal">小计</span>
								<span class="num">数量</span>
								<span class="price">单价</span>
							</div>
							<div class="cart-table">
								<div class="cart-group">
									<!--购物列表-->
									<div 
										class="cart-top-items" 
										v-for="(item,index) in list" 
										:key="index"
									>
										<div class="cart-items">
											<div class="items-choose">
												<span 
													class="blue-checkbox-new" 
													:class="item.isCheck?'checkbox-on':''" 
													@click="item.isCheck=!item.isCheck"
												>
													<a></a>
												</span>
											</div>
											<div class="items-thumb">
												<img :src="item.image">
												<a href="javascript:;" target="_blank"></a>
											</div>
											<div class="name hide-row" >
												<div class="name-table">
													<a href="javascript:;" target="_blank">
														{{item.title}}
													</a>
													<ul class="attribute">
														<li>透明</li>
													</ul>
												</div>
											</div>
											<div class="operation">
												<a class="items-delete-btn" ></a>
											</div>
											<div class="subtotal">¥ {{item.price*item.num}}</div>
											<div class="item-cols-num">
												<div class="select js-select-quantity">
													<span 
														class="down" 
														:class="item.num<=1?'down-disabled':''"
														@click="item.num>1?item.num--:''"
													>-</span>
													<span class="num">
														<input type="text" v-model="item.num" style="display: inline-block;">
													</span>
													<span class="up" @click="item.num++">+</span>
													
												</div>
											</div>
											<div class="price">¥ {{item.price}}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="cart-bottom-bg fix-bottom">
						<div class="cart-bar-operation">
							<div>
								<div class="choose-all js-choose-all">
									<span 
										class="blue-checkbox-new" 
										:class="allCheck?'checkbox-on':''" 
										@click="handleAllCheck"
									>
										<a></a>
									</span>
									全选
								</div>
								<div class="delete-choose-goods">删除选中的商品</div>
							</div>
						</div>
						<div class="shipping">
							<div class="shipping-box">
								<div class="shipping-total shipping-num">
									<h4 class="">
										已选择 <i>{{allInfo.checkNum}}</i> 件商品
									</h4>
									<h5>
										共计 <i >{{allInfo.allNum}}</i> 件商品
									</h5>
								</div>
								<div class="shipping-total shipping-price">
									<h4 class="">
										应付总额：<span>￥</span><i >{{allInfo.checkPrice}}</i> 
									</h4>
									<h5 class="shipping-tips">
										应付总额不含运费
									</h5>
									
								</div>
							</div>
							<span class="jianguo-blue-main-btn big-main-btn js-checkout disabled-btn"><a>现在结算</a></span>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>

  export default {
    data() {
			return {
				list: [ //模拟数据包
					{
						title:'一部手机',
						image:'https://resource.smartisan.com/resource/623bad86546352a2035ec704e2faf041.png?x-oss-process=image/resize,w_216/format,webp',
						price:998,
						num:2,
						isCheck:false
					},
					{
						title:'一对儿耳机',
						image:'https://resource.smartisan.com/resource/211d521553c8816ae1dc6fb5ecdcc99d.jpg?x-oss-process=image/resize,w_216/format,webp',
						price:98,
						num:1,
						isCheck:true
					}
				]
			}
		},
		computed: {
			allCheck() { //控制全选按钮的计算属性
				let bool = true; //标志是否全选
				let len = this.list.length;
				for(let i=0;i<len;i++){
					if(!this.list[i].isCheck){  //一旦发现某个商品未勾选，则直接修改全选为false
						bool=false;
						break;
					}
				}
				return bool 
			},
			allInfo(){ //总计信息的计算属性
				let checkNum = 0; //汇总勾选商品总数
				let allNum = 0; //所有商品总数
				let checkPrice = 0; //汇总勾选商品总价
				this.list.forEach(item=>{
					allNum += item.num;
					if(item.isCheck){
						checkNum += item.num;
						checkPrice += item.num*item.price
					}
				})
				return {
					checkNum,
					allNum,
					checkPrice
				}
			}
		},
		methods: {
			handleAllCheck() { //全选按钮的点击事件
				//根据当前的全选状态，去修改所有的单选
				let allCheck = this.allCheck; //提取computed的属性值
				this.list.forEach(item => {
					item.isCheck = !allCheck
				});
			}
		},
  }
</script>

<style scoped>
@import url('../assets/css/cart.css');
</style>