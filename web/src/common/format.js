export const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
const PM = 'PM'
const AM = 'AM'

export const formatDate = (dateString, display) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const monthIndex = date.getMonth()

  display = {
    year: true,
    month: true,
    day: true,
    time: true,
    seconds: false,
    dayOfWeek: false,
    dayOfWeekAbbr: false,
    ...display
  }

  let dayStr = ''
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  let meridiem = AM
  let formattedDate = ''
  const dayOfWeek = date.getDay()

  switch (dayOfWeek) {
  case 0:
    dayStr = display.dayOfWeekAbbr ? 'Sun' : 'Sunday'
    break
  case 1:
    dayStr = display.dayOfWeekAbbr ? 'Mon' : 'Monday'
    break
  case 2:
    dayStr = display.dayOfWeekAbbr ? 'Tue' : 'Tuesday'
    break
  case 3:
    dayStr = display.dayOfWeekAbbr ? 'Wed' : 'Wednesday'
    break
  case 4:
    dayStr = display.dayOfWeekAbbr ? 'Thu' : 'Thursday'
    break
  case 5:
    dayStr = display.dayOfWeekAbbr ? 'Fri' : 'Friday'
    break
  case 6:
    dayStr = display.dayOfWeekAbbr ? 'Sat' : 'Saturday'
    break
  }

  if (hours > 12) {
    hours = Math.round(hours - 12)
    meridiem = PM
  }

  if (day < 10) {
    day = `0${day}`
  }

  if (hours < 10) {
    hours = `0${hours}`
  }

  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  if (display.dayOfWeek) {
    formattedDate += `${dayStr}, `
  }
  if (display.month) {
    formattedDate += `${MONTH_NAMES[monthIndex]} `
  }
  if (display.day) {
    formattedDate += `${day}, `
  }
  if (display.year) {
    formattedDate += `${year} `
  }
  if (display.time) {
    if (display.seconds) {
      formattedDate += `${hours}:${minutes}:${seconds} ${meridiem}`
    } else {
      formattedDate += `${hours}:${minutes} ${meridiem}`
    }
  }

  return formattedDate
}