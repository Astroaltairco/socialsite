// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    }
  }
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    nav: jest.fn().mockImplementation(({ children }) => <nav>{children}</nav>),
    div: jest.fn().mockImplementation(({ children }) => <div>{children}</div>)
  },
  AnimatePresence: jest.fn().mockImplementation(({ children }) => <>{children}</>)
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />
  },
})) 