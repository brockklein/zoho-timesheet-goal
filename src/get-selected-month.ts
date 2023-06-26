import dayjs from 'dayjs'

export const getSelectedMonth = () => {
	const selectedMonth = document.querySelector('[data-test="month-selector"')
	if (selectedMonth && selectedMonth.textContent) {
		return dayjs(selectedMonth.textContent, 'MMM YYYY')
	}
}
