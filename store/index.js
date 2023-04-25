import {createStore} from 'vuex'
import {counter} from '../utils/calculate.js'

export default createStore({
    state: {
        result: '0',
				firstValue: null,
				operator: null,
				waitingForSecondValue: true
    },
    mutations: {
			calculate(state, value){
				const {result,firstValue,operator,waitingForSecondValue} = state
				const symbolArr = ['+','-','×','÷','=']
				const numArr = ['0','1','2','3','4','5','6','7','8','9']
				if(symbolArr.includes(value)){ 
					// 加减乘除运算
					
					if(operator && waitingForSecondValue){
						state.operator = value
						return
					}
					
					if(firstValue == null){
						state.firstValue = result
					} else if(operator){
						const newResult = counter(parseFloat(firstValue), parseFloat(result), operator)
						state.result = String(newResult)
						state.firstValue = newResult
					}
										
					state.waitingForSecondValue = true
					state.operator = value
				} else if(value === 'AC'){ 
					// 清零
					state.result = "0"
					state.firstValue = null
					state.operator = null
					state.waitingForSecondValue = false
				} else if(value === '+/-'){ 
					// 正负数
					if(waitingForSecondValue){
						state.result = '-0'
						state.waitingForSecondValue = false
					} else {
						state.result = result.charAt(0) === '-' ? result.slice(1) : `-${result}`;
					}
				} else if(value === '%'){
					// 百分数
					state.result = parseFloat(result/100)
					state.firstValue = null
					state.operator = null
					state.waitingForSecondValue = false
				} else if(value === '.'){
					// 小数点
					if(waitingForSecondValue){
						state.result = '0.'
						state.waitingForSecondValue = false
					} else {
						if (!/\./.test(result)){
							state.result = `${result}.`;
						}
					}
				} else if(numArr.includes(value)) {
					// 数字输入
					if(waitingForSecondValue){
						state.result = value
						state.waitingForSecondValue = false
					} else {
						state.result = state.result === "0" ? value
												 : state.result === "-0" ? `-${value}`
												 : state.result + value
					}
				} else {
					alert('功能开发中')
				}
			}
    },
    actions: {

    },
    modules: {
        
    }
})