/** Hooks ======================================================================================= */
import useValue from '../useValue'

/** useObject =================================================================================== */
export default (initialValue = {}) => {
  const [value, $value] = useValue(initialValue)
  const update = (newValue) => $value.set(prev => ({ ...prev,  ...newValue }))

  return [
    value, 
    { 
      ...$value,
      update,
    }
  ]
}