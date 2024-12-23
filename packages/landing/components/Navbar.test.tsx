import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Navbar } from './Navbar'

describe('Navbar', () => {
  it('renders logo and navigation links', () => {
    render(<Navbar />)
    
    // Check logo
    expect(screen.getByText('$SOCIAL')).toBeInTheDocument()
    
    // Check navigation links
    expect(screen.getByText('Docs')).toBeInTheDocument()
    expect(screen.getByText('Social Staking')).toBeInTheDocument()
    expect(screen.getByText('Community')).toBeInTheDocument()
    
    // Check Launch App button
    expect(screen.getByText('Launch App')).toBeInTheDocument()
  })

  it('has correct link destinations', () => {
    render(<Navbar />)
    
    // Check navigation link hrefs
    expect(screen.getByText('Docs').closest('a')).toHaveAttribute('href', '#docs')
    expect(screen.getByText('Social Staking').closest('a')).toHaveAttribute('href', '#staking')
    expect(screen.getByText('Community').closest('a')).toHaveAttribute('href', '#community')
    
    // Check Launch App button href
    expect(screen.getByText('Launch App').closest('a')).toHaveAttribute('href', 'https://app.social.xyz')
  })
}) 