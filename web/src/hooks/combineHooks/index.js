/** Utils ======================================================================================= */
import { overlap } from '../utils/overlap'

/** combineHooks ================================================================================ */
export default hooks => {
  const hooksCopy = [...hooks]
  const combinedHooks = {}

  /** Overlapped key values between hooks */
  let keys = overlap(Object.keys(hooks.pop()), Object.keys(hooks.pop()))
  
  while (hooks.length > 0) {
    keys = overlap(keys, Object.keys(hooks.pop()))
  }

  /** Combining overlapped hooks to a single callback */
  keys.map((key) => {
    combinedHooks[key] = () => {
      hooksCopy.map(hook => {
        hook[key]()
      })
    }
  })
  
  return combinedHooks
}