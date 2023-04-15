import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HoursSummary } from './hours-summary'

setTimeout(() => {
	const buttonToolbar = getButtonToolbar()
	if (buttonToolbar) {
		const container = document.createElement('div')
		buttonToolbar.insertBefore(container, buttonToolbar.firstChild)
		const root = createRoot(container)
		container.style.margin = '-16px 0px';
		root.render(
			<StrictMode>
				<HoursSummary />
			</StrictMode>
		)
	}
}, 1000)

const getButtonToolbar = () => {
	const xpath = "//div[contains(@class, 'btn-toolbar mr-7')]"
	return document.evaluate(
		xpath,
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	).singleNodeValue
}
