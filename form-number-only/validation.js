export function validateNumericInput(value) {
  const numericPattern = /^[0-9]*$/
  return numericPattern.test(value)
}
