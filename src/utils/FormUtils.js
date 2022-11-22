import dayjs from 'dayjs'

const FormUtils = {
  booleanAndNullable: function (factual) {
    if (factual === 'YES') return true
    if (factual === 'NO') return false
    return null
  },
  dateAndNullable: function (date) {
    return date ? date + 'T00:00:00Z' : null
  },
  emptyStringIsNull: function (item) {
    return item !== '' ? item : null
  },
  nullable: function (val) {
    return val ? val : null
  },
  number: function (number) {
    return Number(number.toString()?.replace(',', ''))
  },
  zeroIsNull: function (num) {
    return Number(num) !== 0 ? Number(num) : null
  },
  valOrEmpty: function (val) {
    return val || ''
  },
  dateOrEmpty: function (date) {
    return date ? dayjs(date).format('YYYY-MM-DD') : ''
  },
  factualOrEmpty: function (factual) {
    if (factual === true) return 'YES'
    if (factual === false) return 'NO'
    return ''
  },
  onArrayOrFalse: function (array, str) {
    return Boolean(array?.find((e) => e === str)) || false
  }
}

export default FormUtils
