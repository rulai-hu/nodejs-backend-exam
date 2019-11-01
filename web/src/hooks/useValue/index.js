import { useState } from 'react'

/** useValue ==================================================================================== */
export default (initialValue = false) => {
  const [value, set] = useState(initialValue)
  const reset = () => set(initialValue)

  return [value, { set, setValue: set, reset }]
}