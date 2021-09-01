import { useState } from 'react'


const useTrait = (initialValue) => {
  const [trait, updateTrait] = useState(initialValue)

  let current = trait

  const get = () => current

  const set = (newValue) => {
    current = newValue
    updateTrait(newValue)
    return current
  }

  return {
    get,
    set,
  }
}

export default useTrait
