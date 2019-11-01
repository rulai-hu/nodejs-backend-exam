export const overlap = (array1, array2) => {
  return array1.filter(item => {
    return array2.indexOf(item) > -1
  })
}