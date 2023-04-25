<template>
	<view
		class="content"
		:class="deviceOrientation"
	>
		<view class="result">{{result}}</view>
		<view class="buttons">
			
			<view
				v-if="deviceOrientation == 'landscape'"
				class="formula-list"
			>
				<keyboard
					class="item"
					type="landscape"
					v-for="item in formulaList"
					:value="item"
				></keyboard>
			</view>
			
			<view class="list">
				<keyboard
					class="item"
					:type="deviceOrientation"
					v-for="item in buttons"
					:value="item"
				></keyboard>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { reactive, ref, computed } from "vue";
	import { useStore } from "vuex";
	const store = useStore()
	let deviceOrientation = ref('portrait') // portrait:竖屏； landscape:横屏
	
	uni.onWindowResize(res => {
		deviceOrientation.value = res.deviceOrientation
	})

	const buttons = reactive([
		'AC', '+/-', '%', '÷',
		'7', '8', '9', '×',
		'4', '5', '6', '-',
		'1', '2', '3', '+',
		'0', '.', '=',
	])
	
	const formulaList = reactive([
		'(',')','mc','m+','m-','mr'
	])
	
	const result = computed(() => {
		return store.state.result
	})
</script>

<style lang="scss">
.content{
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: end;
	background-color: #000;
}
.result{
	padding: 30rpx;
	color: #fff;
	text-align: right;
	font-size: 168rpx;
}
.landscape{
	.result{
		padding: 10rpx;
		font-size: 32rpx;
	}
	.list{
		width: 40%;
		padding:0;
		.item{
			min-width: calc((100% - 26rpx) / 4);
			height: 50rpx;
			margin: 0 0 6rpx 0;
		}
	}
}
.buttons{
	display: flex;
}
.list,
.formula-list{
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	flex-wrap: wrap;
}
.list{
	padding:0 13rpx;
	.item{
		min-width: calc((100% - 100rpx) / 4);
		height: 152rpx;
		margin: 0 0 30rpx 0;
	}
}
.formula-list{
	width: 60%;
	color: #fff;
	.item{
		width: calc((100% - 26rpx) / 6);
		height: 52rpx;
	}
}
</style>
