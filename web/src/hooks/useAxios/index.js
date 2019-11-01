import axios from 'axios'

/** Hooks ======================================================================================= */
import useObject from '../useObject'

/** Constants =================================================================================== */
const INITIAL_STATE = {
  loading: false,
  error: null,
  data: null
}

const generateCallback = ({ url, $state, callback  }) => {
  return async (_ = {}) => {
    $state.update({ loading: true })
    try {
      const response = await callback(url, _)      
  
      $state.update({
        data: response.data,
        loading: false
      })
    } catch (error) {
      $state.update({
        loading: false,
        error
      })
    }
  }
}

const get = async (url, options = {}) => {
  const response = await axios.get(url, options)
  return response
}

const post = async (url, options) => {
  const response = await axios.post(url, options)
  return response
}

export default url => {
  const [state, $state] = useObject(INITIAL_STATE)
  
  return [
    state, 
    { 
      get: generateCallback({ url, $state, callback: get }),
      post: generateCallback({ url, $state, callback: post })
    }
  ]
}