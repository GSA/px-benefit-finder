import * as apiCalls from '../apiCalls'

// The Function DateEligibility handles the date calculations.

// Our comparison string (content) values for acceptable criteria should be limited to the following formats
// compared to a specific date
// "<operator><MM><hyphen><DD><hyphen><YYYY>"

// ie. // "<01-01-1978"

// or

// compared to a length of time
// "<operator><number><years>"

// ie. // "<18years"

// Our conditionals handle the following operators
// // const operators = /['>', '>=', '<', '<=', '=']/g

// Write a spec to test each string format with each acceptable conditional

// ie.

// take the following values of:

// selected value: 01-01-1977
// criteria format 1: 01-01-1978
// criteria format 2: 18years

// loop through our array of operators

// compare to the expected output

// month: === monthIndex
// 0 - 11
const sameDate = { year: 2023, month: 0, day: 1 }
const closerDate = { year: 2023, month: 0, day: 2 } // younger
const furtherDate = { year: 2022, month: 11, day: 30 } // older
const same18 = { year: 2005, month: 9, day: 26 }
const older18 = { year: 2005, month: 0, day: 1 }
const younger18 = { year: 2006, month: 0, day: 1 }
// const deathDate = { year: 1977, month: 0, day: 1 }

const conditionalsSpecificDate = [
  {
    value: '>01-01-2023', // before 2023
    isSame: false,
    isCloser: false,
    isFurther: true,
  },
  {
    value: '>=01-01-2023', // before or in 2023
    isSame: true,
    isCloser: false,
    isFurther: true,
  },
  {
    value: '<01-01-2023', // after 2023
    isSame: false,
    isCloser: true,
    isFurther: false,
  },
  {
    value: '<=01-01-2023',
    isSame: true,
    isCloser: true,
    isFurther: false,
  },
  {
    value: '=01-01-2023',
    isSame: true,
    isCloser: false,
    isFurther: false,
  },
]

const conditionalsLengthOfTime = [
  {
    value: '>18years', // more than 18years
    isSame: false,
    isOlder: true,
    isYounger: false,
  },
  {
    value: '>=18years', // 18years years or more
    isSame: true,
    isOlder: true,
    isYounger: false,
  },
  {
    value: '<18years',
    isSame: false,
    isOlder: false,
    isYounger: true,
  },
  {
    value: '<=18years',
    isSame: true,
    isOlder: false,
    isYounger: true,
  },
  {
    value: '=18years',
    isSame: true,
    isOlder: false,
    isYounger: false,
  },
]

const conditionalsOthers = [
  {
    value: '<01-01-1978', // after 1978
    selectedValue: { year: 1977, month: 0, day: 1 },
    eval: false,
  },
  {
    value: '>01-01-1978', // before 1978
    selectedValue: { year: 1977, month: 0, day: 1 },
    eval: true,
  },
  {
    value: '<2years', // less
    selectedValue: { year: 2023, month: 9, day: 27 },
    eval: true,
  },
  {
    value: '>=62years', // younger than
    selectedValue: { year: 1961, month: 9, day: 26 },
    eval: true,
  },
]

// "<01-01-1978"
// "<2years (the deceased died within the last two years)"
// "<18years"
// ">=62years"
// ">=60years"
// ">=50years"
// ">18years"

test('correctly accepts and evaluates a date object compared to a specific date of the conditional where the conditional time values are equal in time', () => {
  conditionalsSpecificDate.forEach(conditional =>
    expect(
      apiCalls.UTILS.DateEligibility({
        selectedValue: sameDate,
        conditional: conditional.value,
      })
    ).toBe(conditional.isSame)
  )
})

test('correctly accepts and evaluates a date object compared to a specific date of the conditional where the conditional time values are closer in time', () => {
  conditionalsSpecificDate.forEach(conditional =>
    expect(
      apiCalls.UTILS.DateEligibility({
        selectedValue: closerDate,
        conditional: conditional.value,
      })
    ).toBe(conditional.isCloser)
  )
})

test('correctly accepts and evaluates a date object compared to a specific date of the conditional where the conditional time values are further in time', () => {
  conditionalsSpecificDate.forEach(conditional =>
    expect(
      apiCalls.UTILS.DateEligibility({
        selectedValue: furtherDate,
        conditional: conditional.value,
      })
    ).toBe(conditional.isFurther)
  )
})

test('correctly accepts and evaluates a date object compared to a length of time of the conditional where the conditional time values are the same', () => {
  conditionalsLengthOfTime.forEach(conditional =>
    expect(
      apiCalls.UTILS.DateEligibility({
        selectedValue: same18,
        conditional: conditional.value,
      })
    ).toBe(conditional.isSame)
  )
})

test('correctly accepts and evaluates a date object compared to a length of time of the conditional where the conditional time values are older', () => {
  conditionalsLengthOfTime.forEach(conditional =>
    expect(
      apiCalls.UTILS.DateEligibility({
        selectedValue: older18,
        conditional: conditional.value,
      })
    ).toBe(conditional.isOlder)
  )
})

test('correctly accepts and evaluates a date object compared to a length of time of the conditional where the conditional time values are younger', () => {
  conditionalsLengthOfTime.forEach(conditional =>
    expect(
      apiCalls.UTILS.DateEligibility({
        selectedValue: younger18,
        conditional: conditional.value,
      })
    ).toBe(conditional.isYounger)
  )
})

test('other correctly accepts and evaluates a date object compared to a length of time of the conditional where the conditional time values are younger', () => {
  conditionalsOthers.forEach(conditional =>
    expect(
      apiCalls.UTILS.DateEligibility({
        selectedValue: conditional.selectedValue,
        conditional: conditional.value,
      })
    ).toBe(conditional.eval)
  )
})
