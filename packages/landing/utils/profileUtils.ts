export interface Profile {
  id: string
  name: string
  handle: string
  type: 'creator' | 'ai'
  followers: string
  engagement: string
  category: string
}

export function generateProfiles(count: number): Profile[] {
  const categories = [
    'Content Creator', 'AI Agent', 'Influencer', 'Artist', 'Developer',
    'Musician', 'Photographer', 'Writer', 'Designer', 'Entrepreneur'
  ]
  
  const names = [
    'Alex Rivers', 'Sarah Chen', 'David Kim', 'Maya Patel', 'James Wilson',
    'Luna AI', 'Nexus', 'Aria', 'Echo', 'Nova',
    'Chris Lee', 'Emma Watson', 'Michael Scott', 'Lisa Su', 'Tom Anderson',
    'Sophie Zhang', 'Marcus Johnson', 'Ava Rodriguez', 'Kai Nakamura', 'Zara Ahmed',
    'Atlas AI', 'Quantum', 'Cipher', 'Aether', 'Prism',
    'Ryan Park', 'Isabella Santos', 'Oliver Chen', 'Nina Patel', 'Leo Martinez'
  ]
  
  return Array.from({ length: count }, (_, i) => {
    const isAI = Math.random() > 0.7
    const type = isAI ? 'ai' : 'creator'
    const name = names[i % names.length]
    const handle = name.toLowerCase().replace(' ', '')
    
    return {
      id: `profile-${i}`,
      name,
      handle: `@${handle}`,
      type,
      category: categories[i % categories.length],
      followers: `${Math.floor(Math.random() * 900 + 100)}K`,
      engagement: `${Math.floor(Math.random() * 30 + 10)}%`
    }
  })
} 