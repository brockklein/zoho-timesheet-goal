import { Dayjs } from 'dayjs'
import { getWeekdayCountForSelectedMonth } from './hours-summary'

export const getHoursGoal = (day: Dayjs) => {
	const weekdays = getWeekdayCountForSelectedMonth(day)
	const dailyGoalForMonth = getDailyGoalForMonth(day)

	return weekdays.reduce((total, day) => {
		// if (day.get('d') !== 4) total = total += dailyGoalForMonth
		// return total

		return (total += dailyGoalForMonth)
	}, 0)
}

export const getDailyGoalForMonth = (day: Dayjs) => {
	// const month = day.month()
	// if (month <= 4) return 11
	// if (month === 8) return 10
	// if (month === 9) return 5
	// if (month === 10) return 7.5

	return 6
}
