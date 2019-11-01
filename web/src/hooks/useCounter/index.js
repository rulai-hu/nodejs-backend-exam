/** Hooks ======================================================================================= */
import useValue from '../useValue'

/** useCounter ================================================================================== */
export default (initialValue = 0, min = -Infinity, max = Infinity) => {
  const [value, $value] = useValue(initialValue)
  const increment = () => $value.set(Math.max(Math.min(value + 1, max), min))
  const decrement = () => $value.set(Math.max(Math.min(value - 1, max), min))  

  return [value, { ...$value, increment, decrement }]
}