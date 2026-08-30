import { useEffect, useState } from 'react'

const PREFIX = 'kenzie-dashboard:'

/**
 * Drop-in replacement for useState that persists to localStorage.
 * Swap this out (or point it at a real API) once a backend exists —
 * everything that reads/writes app data goes through AppDataContext,
 * which is the only place that needs to change.
 */
export function useLocalStorage(key, initialValue) {
  const storageKey = PREFIX + key

  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : initialValue
    } catch (err) {
      console.warn(`Could not read localStorage key "${storageKey}"`, err)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value))
    } catch (err) {
      console.warn(`Could not write localStorage key "${storageKey}"`, err)
    }
  }, [storageKey, value])

  return [value, setValue]
}
