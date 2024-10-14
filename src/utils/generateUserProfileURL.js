export function generateUserProfileURL(baseUrl, fullName) {
  return baseUrl.concat(`/${fullName.toUpperCase().split(' ').join('_')}/home`)
}
