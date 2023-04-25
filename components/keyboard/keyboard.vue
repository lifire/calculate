<template>
	<view
		:class="type"
	>
		<view
			class="btn"
			:class="[
				props.value == '0' ? 'double' : '',
				symbolArr.includes(props.value) ? 'symbol' : '',
				grayArr.includes(props.value) ? 'gray' : '',
				w && (props.value == operator) && (props.value != '=') ? 'active' : ''
			]"
			size="40"
			@click="handleButtonClick(props.value)">
			{{props.value}}
		</view>
	</view>
</template>

<script setup>
	import {computed, ref} from 'vue'
	import {useStore} from 'vuex'
	const store = useStore()
	const props = defineProps({
		value:String,
		type: String // portrait:竖屏； landscape:横屏
	})
	
	let operator = computed(() => {
		return store.state.operator
	})
	let w = computed(() => {
		return store.state.waitingForSecondValue
	})
	
	const symbolArr = ref(['+','-','×','÷', '='])
	const grayArr = ref(['AC','+/-', '%'])
	
	const handleButtonClick = ((item) => {
			store.commit('calculate', item)
	})
</script>

<style lang="scss">
	.btn{
		// width: 152rpx;
		// height: 152rpx;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		// margin: 0 auto 30rpx;
		border-radius: 76rpx;
		font-size: 54rpx;
		background-color: #333;
		color: #fff;
		&.double{
			width: 336rpx;
			margin-left: 6rpx;
			margin-right: 6rpx;
		}
		&.symbol{
			background-color: #efa43e;
			&.active{
				background-color: #fff;
				color: #efa43e;
			}
		}
		&.gray{
			background-color: #a5a5a5;
			color: #040404;
		}
	}
	
	.landscape{
		// width: 10%;
		.btn{
			font-size: 24rpx;
			&.double{
				width: 142rpx;
				margin-left: 3rpx;
				margin-right: 3rpx;
			}
		}
	}
</style>