import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import dayjsBusinessDays from 'dayjs-business-days'
import { getHours } from './get-hours'
import { getSelectedMonth } from './get-selected-month'
import { getDailyGoalForMonth, getHoursGoal } from './get-hours-goal'

dayjs.extend(dayjsBusinessDays)

export const getWeekdayCountForSelectedMonth = (day: Dayjs): Dayjs[] => {
	// @ts-ignore
	return day.businessDaysInMonth()
}

const getRemainingBusinessDays = (day: Dayjs) => {
	const weekdays = getWeekdayCountForSelectedMonth(day)
	return weekdays.filter(day => day.isAfter(dayjs(), 'day')).length
}

const getHoursProgressTarget = (day: Dayjs) => {
	const weekdays = getWeekdayCountForSelectedMonth(day)
	return weekdays.reduce((total, day) => {
		if (
			(day.isBefore(dayjs(), 'day') || day.isSame(dayjs(), 'day')) &&
			day.get('d') !== 4
		) {
			total = total += getDailyGoalForMonth(day)
		}

		return total
	}, 0)
}

export const HoursSummary = () => {
	const [selectedDay, setSelectedDay] = useState(getSelectedMonth())
	const [hoursWorked, setHoursWorked] = useState(getHours())
	const [hoursGoal, setHoursGoal] = useState(
		selectedDay ? getHoursGoal(selectedDay) : 0
	)
	const [hoursProgressTarget, setHoursProgressTarget] = useState(
		selectedDay ? getHoursProgressTarget(selectedDay) : 0
	)

	useEffect(() => {
		setInterval(() => {
			const selectedDay = getSelectedMonth()

			if (!selectedDay) return

			setSelectedDay(selectedDay)
			setHoursWorked(getHours())
			setHoursGoal(getHoursGoal(selectedDay))
			setHoursProgressTarget(getHoursProgressTarget(selectedDay))
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
							<div style={{ marginRight: 10, fontWeight: 'bold' }}>Progress</div>
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
											selectedDay
												? (overUnderHours / getRemainingBusinessDays(selectedDay)) *
														-1 *
														100
												: 0
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
