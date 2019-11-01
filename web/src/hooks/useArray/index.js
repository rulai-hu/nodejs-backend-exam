/** Hooks ======================================================================================= */
import useValue from '../useValue'

/** useArray ==================================================================================== */
export default (initialValue = []) => {
  const [value, $value] = useValue(initialValue)
  const update = newValue => $value.set(prev => [ ...prev,  ...newValue ])
  const push = item => {
    const items = [ ...value ]
    items.push(item)

    $value.set(items)
  }
  const pop = item => {
    const items = [ ...value ]
    const removedItem = items.pop 

    $value.set(items)

    return removedItem
  }

  const size = () => value.length

  return [
    value, 
    { 
      ...$value,
      length: size,
      pop,
      push,
      size,
      update,
    }
  ]
}