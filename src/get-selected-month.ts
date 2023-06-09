import dayjs from 'dayjs'

export const getSelectedMonth = () => {
	const selectedMonth = document.getElementById('ember153')
	if (selectedMonth && selectedMonth.textContent) {
		return dayjs(selectedMonth.textContent, 'MMM YYYY')
	}
}
