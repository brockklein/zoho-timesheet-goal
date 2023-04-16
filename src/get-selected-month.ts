import dayjs from 'dayjs'

export const getSelectedMonth = () => {
    const activeLinks = Array.from(document.getElementsByClassName('nav-link active'))
    const selectedMonth = activeLinks.find(link => link.firstChild?.nodeName === 'DIV')
    if (selectedMonth && selectedMonth?.firstChild?.textContent) {
        return dayjs(selectedMonth.firstChild.textContent, 'MMM YYYY')
    }
}
