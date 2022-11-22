const ViewUtils = {
  valCapsOrNotFound: function (val) {
    return val?.toUpperCase() || 'NOT FOUND'
  },
  numOrNotFound: function (number) {
    return number || 'NOT FOUND'
  },
  numCommaOrNotFound: function (number) {
    return number?.toLocaleString() || 'NOT FOUND'
  },
  yesNoOrNotFound: function (boolean) {
    if (boolean === null) return 'NOT FOUND'
    return boolean ? 'YES' : 'NO'
  },
  dateCapsOrNotFound: function (date_string) {
    if (!date_string) return 'NOT FOUND'
    let options = { year: 'numeric', month: 'long', day: 'numeric' }
    let date = new Date(date_string)
    return date.toLocaleDateString('en-us', options).toUpperCase()
  },
  dayDateTimeOrNotFound: function (date_string) {
    if (!date_string) return 'NOT FOUND'
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    let date = new Date(date_string)
    return date.toLocaleTimeString('en-us', options)
  },
  arrayTextCapsOrNotFound(array = []) {
    if (array?.length === 0) return 'NOT FOUND'
    return array.filter(Boolean).join(', ').toUpperCase()
  },
  joinByCommaCapsOrNotFound: function (array) {
    return array.filter(Boolean).join(', ').toUpperCase() || 'NOT FOUND'
  },
  tableIndex: function (limit, page, index) {
    return limit * page + index - limit + 1
  },
  percentage(value, total) {
    let x = (value / total) * 100
    return x ? `${x?.toFixed(2)}%` : 'NOT FOUND'
  }
}

export default ViewUtils
