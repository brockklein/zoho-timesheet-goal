export const getHours = () => {
    const xpath = "//h3[text()='Total Hours']"
    const hoursContainer = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue?.lastChild

    let hoursText = hoursContainer?.textContent
    if (!hoursText) return null
    const [hours, minutes] = hoursText.split(':')
    const minutesFraction = parseInt(minutes) / 60
    const totalHours = parseInt(hours) + minutesFraction
    return totalHours
}