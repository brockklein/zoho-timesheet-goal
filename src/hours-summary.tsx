import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import dayjsBusinessDays from 'dayjs-business-days'
import { getHours } from './get-hours'

dayjs.extend(dayjsBusinessDays)

const getWeekdayCount = (): Dayjs[] => {
	// @ts-ignore
	return dayjs().businessDaysInMonth()
}
const weekdays = getWeekdayCount()
const hoursGoal = weekdays.reduce((total, day) => {
	if (day.get('d') !== 4) total = total += 11
	return total
}, 0)

export const HoursSummary = () => {
	const [totalHours, setTotalHours] = useState(getHours())

	useEffect(() => {
		setInterval(() => setTotalHours(getHours()), 1000)
	}, [])

	return (
		<div
			style={{
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				margin: '0px 20px',
			}}
		>
			<div>
				Hours Progress: {totalHours}/{hoursGoal}
			</div>
		</div>
	)
}
