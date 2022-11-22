// <- ['red', 'blue', 'green']
// -> 'red, blue, green'
export function commaSeparated(array) {
  return array.filter(Boolean).join(', ')
}
// <- ['red', 'blue', 'green']
// -> 'red, blue, green'
export function commaSeparatedWithAnd(array) {
  const str = array.filter(Boolean).join(', ')
  return str.replace(/_/g, ' ').replace(/,(?=[^,]*$)/, ', and')
}

// <- '2021-11-05T06:11:56.926268Z'
// -> 'Friday, November 5, 2021, 2:11:56 PM'
export function formatDate(date_string) {
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  let date = new Date(date_string)
  return date.toLocaleTimeString('en-us', options)
}

// <- '2021-11-05T06:11:56.926268Z'
// -> 'November 5, 2021'
export function simpleDateFormat(date_string) {
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  let date = new Date(date_string)
  return date.toLocaleDateString('en-us', options)
}

// <- true
// -> Yes
export function yesNo(boolean) {
  if (boolean === null) return 'NO ANSWER'
  return boolean ? 'YES' : 'NO'
}

// <- null
// -> 'NO ANSWER'
export function NA(str) {
  return str ? 'Yes' : 'NO ANSWER'
}

// <- ['a', 'b', 'c'] & 'a'
// -> true
export function hasPermission(array = [''], str) {
  const result = array.find((element) => element === str)
  return Boolean(result)
}

// <- null
// -> 'Unknown'
// <- '' or []
// -> 'None' or falsyValue
// <- 'farmer'
// -> 'FARMER'
export function hasNullValue(value, falsyValue, truthyValue) {
  if (value === null) return 'NO ANSWER'
  if (value === '' || value?.length === 0) return falsyValue || 'NONE'
  return truthyValue || value?.toString().toUpperCase()
}

// <- 50, 1, 1
// -> 1
export function tableIndex(limit, page, index) {
  return limit * page + index - limit + 1
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
