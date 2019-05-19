export const utils = {
  titleCase: (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(),
  flip: (array) => array.reduce((accumulator, current) => ([current, ...accumulator]), []),
  color: (value) => {
    const hue = ((value / 200) * 1.1 * 120).toString(10)
    return ['hsl(', hue, ',100%,50%)'].join('')
  }
}
