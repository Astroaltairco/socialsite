import { createContext, useContext, ReactNode } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage'

// Type definitions for profile data structure
interface OpenProfile {
  handle: string  // Unique identifier for the profile
  name: string    // Display name
  initial: string // Single character for avatar
}

interface ProfilesContextType {
  openProfiles: OpenProfile[]
  addProfile: (profile: OpenProfile) => void
  removeProfile: (handle: string) => void
  isProfileOpen: (handle: string) => boolean
}

// Validation functions
const validateProfile = (profile: OpenProfile): boolean => {
  if (!profile.handle || typeof profile.handle !== 'string') {
    console.error('Invalid profile handle:', profile)
    return false
  }
  if (!profile.name || typeof profile.name !== 'string') {
    console.error('Invalid profile name:', profile)
    return false
  }
  if (!profile.initial || typeof profile.initial !== 'string' || profile.initial.length !== 1) {
    console.error('Invalid profile initial:', profile)
    return false
  }
  return true
}

// Create context with undefined default value
const ProfilesContext = createContext<ProfilesContextType | undefined>(undefined)

/**
 * Provider component that manages open profiles state
 * Uses local storage for persistence across page reloads
 */
export function ProfilesProvider({ children }: { children: ReactNode }) {
  const [openProfiles, setOpenProfiles] = useLocalStorage<OpenProfile[]>('openProfiles', [])

  /**
   * Add a profile to the list of open profiles
   * If profile already exists, moves it to the top
   * Validates profile data before adding
   */
  const addProfile = (profile: OpenProfile) => {
    try {
      if (!validateProfile(profile)) {
        throw new Error('Invalid profile data')
      }

      setOpenProfiles(prev => {
        // If profile is already open, move it to the top
        if (prev.some(p => p.handle === profile.handle)) {
          return [profile, ...prev.filter(p => p.handle !== profile.handle)]
        }
        // Add new profile at the top
        return [profile, ...prev]
      })
    } catch (error) {
      console.error('Error adding profile:', error)
      // TODO: Add user notification for error
    }
  }

  /**
   * Remove a profile from the list of open profiles
   * Safely handles non-existent profiles
   */
  const removeProfile = (handle: string) => {
    try {
      if (!handle || typeof handle !== 'string') {
        throw new Error('Invalid handle provided')
      }

      setOpenProfiles(prev => prev.filter(p => p.handle !== handle))
    } catch (error) {
      console.error('Error removing profile:', error)
      // TODO: Add user notification for error
    }
  }

  /**
   * Check if a profile is currently open
   * Returns false for invalid handles
   */
  const isProfileOpen = (handle: string): boolean => {
    try {
      if (!handle || typeof handle !== 'string') {
        throw new Error('Invalid handle provided')
      }
      return openProfiles.some(p => p.handle === handle)
    } catch (error) {
      console.error('Error checking profile status:', error)
      return false
    }
  }

  return (
    <ProfilesContext.Provider
      value={{
        openProfiles,
        addProfile,
        removeProfile,
        isProfileOpen,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  )
}

/**
 * Hook to access profiles context
 * Must be used within a ProfilesProvider
 * @throws {Error} If used outside of a ProfilesProvider
 */
export function useProfiles() {
  const context = useContext(ProfilesContext)
  if (context === undefined) {
    throw new Error('useProfiles must be used within a ProfilesProvider')
  }
  return context
}
