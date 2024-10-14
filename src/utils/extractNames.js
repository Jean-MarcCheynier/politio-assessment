export function extractNames(fullName) {
  const words = fullName.split(' ')

  let lastNameIndex = words.findIndex(word => word === word.toUpperCase())

  if (lastNameIndex === -1) {
    throw new Error('Last name in full capital letters not found')
  }

  const firstName = words.slice(0, lastNameIndex).join(' ')
  const lastName = words.slice(lastNameIndex).join(' ')

  return {
    firstName,
    lastName
  }
}
