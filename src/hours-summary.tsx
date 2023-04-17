import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import dayjsBusinessDays from 'dayjs-business-days'
import { getHours } from './get-hours'
import { getSelectedMonth } from './get-selected-month'

dayjs.extend(dayjsBusinessDays)

const getWeekdayCountForSelectedMonth = (): Dayjs[] => {
	const day = getSelectedMonth()
	// @ts-ignore
	return day.businessDaysInMonth()
}

const getHoursGoal = () => {
	const weekdays = getWeekdayCountForSelectedMonth()
	return weekdays.reduce((total, day) => {
		if (day.get('d') !== 4) total = total += 11
		return total
	}, 0)
}

const getRemainingBusinessDays = () => {
	const weekdays = getWeekdayCountForSelectedMonth()
	return weekdays.filter(day => day.isAfter(dayjs(), 'day')).length
}

const getHoursProgressTarget = () => {
	const weekdays = getWeekdayCountForSelectedMonth()
	return weekdays.reduce((total, day) => {
		if (
			(day.isBefore(dayjs(), 'day') || day.isSame(dayjs(), 'day')) &&
			day.get('d') !== 4
		) {
			total = total += 11
		}

		return total
	}, 0)
}

export const HoursSummary = () => {
	const [hoursWorked, setHoursWorked] = useState(getHours())
	const [hoursGoal, setHoursGoal] = useState(getHoursGoal())
	const [hoursProgressTarget, setHoursProgressTarget] = useState(
		getHoursProgressTarget()
	)

	useEffect(() => {
		setInterval(() => {
			setHoursWorked(getHours())
			setHoursGoal(getHoursGoal())
			setHoursProgressTarget(getHoursProgressTarget())
		}, 1000)
	}, [])

	if (hoursWorked === null) return null

	const overUnderHours = hoursWorked - hoursProgressTarget

	return (
		<div
			style={{
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				margin: '0 20px',
			}}
		>
			<table>
				<tbody>
					<tr style={{ lineHeight: 1 }}>
						<td>
							<div style={{ marginRight: 10, fontWeight: 'bold' }}>Goal</div>
						</td>
						<td>{hoursGoal}</td>
					</tr>
					<tr style={{ lineHeight: 1 }}>
						<td>
							<div style={{ marginRight: 10, fontWeight: 'bold' }}>
								Progress
							</div>
						</td>
						<td>
							{hoursWorked} of {hoursProgressTarget}
						</td>
					</tr>
					<tr style={{ lineHeight: 1 }}>
						<td>
							<div style={{ marginRight: 10, fontWeight: 'bold' }}>Pace</div>
						</td>
						<td>
							<div
								style={{
									color: (() => {
										if (overUnderHours < 0) return 'red'
										if (overUnderHours > 0) return 'green'
										return undefined
									})(),
								}}
							>
								{overUnderHours}
								{dayjs().month() === getSelectedMonth()?.month() && (
									<>
										{' '}
										(
										{Math.round(
											(overUnderHours / getRemainingBusinessDays()) * -1 * 100
										) / 100}
										/day)
									</>
								)}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			{/* <table>
				<tbody>
					<tr>
						<td>
							<div style={{ marginRight: 5, fontWeight: 'bold' }}>Progress</div>
						</td>
						<td>
							<div style={{ marginRight: 5, fontWeight: 'bold' }}>Target</div>
						</td>
						<td>
							<div style={{ marginRight: 5, fontWeight: 'bold' }}>Pace</div>
						</td>
					</tr>
					<tr>
						<td>
							<div style={{ marginRight: 5 }}>
								{hoursWorked}/{hoursGoal}
							</div>
						</td>
						<td>
							<div style={{ marginRight: 5 }}>{hoursProgressTarget}</div>
						</td>
						<td>
							<div
								style={{
									marginRight: 5,
									color: (() => {
										if (overUnderHours < 0) return 'red'
										if (overUnderHours > 0) return 'green'
										return undefined
									})(),
								}}
							>
								{overUnderHours}
								{overUnderHours < 0 && (
									<>
										{' '}
										(
										{Math.round(
											(overUnderHours / getRemainingBusinessDays()) * -1 * 100
										) / 100}
										/day)
									</>
								)}
							</div>
						</td>
					</tr>
				</tbody>
			</table> */}
		</div>
	)
}
