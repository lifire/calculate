export const counter = (firstValue, secondValue, operator) => {
	if (operator === '+') {
		return firstValue + secondValue;
	} else if (operator === '-') {
		return firstValue - secondValue;
	} else if (operator === '×') {
		return firstValue * secondValue;
	} else if (operator === '÷') {
		return firstValue / secondValue;
	}

	return secondValue;
}