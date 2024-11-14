export const sliceAddress = (address: string, visibleLetters = 5) => {
  return (
    address.slice(0, visibleLetters) +
    '...' +
    address.slice(address.length - visibleLetters, address.length)
  )
}