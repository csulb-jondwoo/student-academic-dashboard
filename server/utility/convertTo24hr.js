// convert time to 24hr
const convertTo24hr = (time) => {
  let hours = parseInt(time.split(':')[0])

  const minutes = parseInt(time.split(':')[1].split(' ')[0])

  const AMPM = time.split(':')[1].split(' ')[1]

  if (AMPM == 'PM' && hours < 12) {
    hours = hours + 12
  }

  if (AMPM == 'AM' && hours == 12) {
    hours = hours - 12
  }

  let sHours = hours.toString()
  let sMinutes = minutes.toString()
  if (hours < 10) sHours = '0' + sHours
  if (minutes < 10) sMinutes = '0' + sMinutes
  return sHours + ':' + sMinutes
}

module.exports = {
  convertTo24hr,
}
