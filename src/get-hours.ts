export const getHours = () => {
	const footers = Array.from(document.getElementsByTagName('tfoot'))
	const footerCell = Array.from(footers[0].getElementsByTagName('td')).pop()

	if (!footerCell) return null

	const hoursText = Array.from(footerCell.getElementsByTagName('h4'))[0]
		.textContent

	if (!hoursText) return null
	const [hours, minutes] = hoursText.split(':')
	const minutesFraction = parseInt(minutes) / 60
	const totalHours = parseInt(hours) + minutesFraction
	return totalHours
}
