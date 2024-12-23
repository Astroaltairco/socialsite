import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import TokenCard from './TokenCard'

describe('TokenCard', () => {
  const mockToken = {
    name: 'Social Token',
    symbol: 'SOCIAL',
    price: 1.23,
    change: 5.67,
    volume: 500000,
  }

  it('renders token information correctly', () => {
    render(<TokenCard {...mockToken} />)
    
    expect(screen.getByText(mockToken.name)).toBeInTheDocument()
    expect(screen.getByText(mockToken.symbol)).toBeInTheDocument()
    expect(screen.getByText(`$${mockToken.price.toFixed(2)}`)).toBeInTheDocument()
  })

  it('shows positive price change in green', () => {
    render(<TokenCard {...mockToken} />)
    
    const changeElement = screen.getByText(`+${mockToken.change}%`)
    expect(changeElement).toHaveClass('bg-green-100 text-green-800')
  })

  it('shows negative price change in red', () => {
    render(<TokenCard {...mockToken} {...{change: -5.67}} />)
    
    const changeElement = screen.getByText(`-5.67%`)
    expect(changeElement).toHaveClass('bg-red-100 text-red-800')
  })
}) 