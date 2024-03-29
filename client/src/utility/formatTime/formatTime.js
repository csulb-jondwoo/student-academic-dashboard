const formatTime = (time) => {
  const hh = time.split(':')[0]
  const m = time.split(':')[1]
  let dd = 'AM'
  let h = hh
  if (h >= 12) {
    h = hh - 12
    dd = 'PM'
  }
  if (h === 0) {
    h = 12
  }

  if (h < 10 && dd === 'AM') {
    h = h.toString().split('')[1]
  }

  let replacement = h + ':' + m
  replacement += ' ' + dd

  return replacement
}

export default formatTime
