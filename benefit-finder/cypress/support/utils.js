export function getDateByOffset(offset) {
  const date = new Date(Date.now())
  const n = Number(offset)

  date.setDate(date.getDate() + n)
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const monthName = date.toLocaleString('default', { month: 'long' })
  const day = ('0' + date.getDate()).slice(-2)
  const year = date.getFullYear()

  return { month: month + ' - ' + monthName, day, year }
}
