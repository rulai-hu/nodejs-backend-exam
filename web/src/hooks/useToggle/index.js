/** Hooks ======================================================================================= */
import useValue from '../useValue'

/** useToggle =================================================================================== */
export default (initialValue = false) => {
  const [value, $value] = useValue(initialValue)
  const toggle = () => $value.set(!value)

  return [value, { ...$value, toggle  }]
}