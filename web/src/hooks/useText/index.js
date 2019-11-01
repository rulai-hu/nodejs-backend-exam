/** Hooks ======================================================================================= */
import useValue from '../useValue'

/** useToggle =================================================================================== */
export default (initialValue = false) => {
  const [value, $value] = useValue(initialValue)
  const toUpperCase = () => $value.set(value.toUpperCase())
  const toLowerCase = () => $value.set(value.toLowerCase())

  return [value, { ...$value, toUpperCase, toLowerCase }]
}