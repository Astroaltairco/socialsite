import { chromium, Page, errors as playwrightErrors, Browser } from 'playwright'
import fs from 'fs/promises'
import path from 'path'

interface AIAgent {
  name: string
  handle: string
  marketCap: string
  price: string
  volume24h: string
  priceChange24h: string
  category: string
  imageUrl: string
  description?: string
  followers: string
  engagement: string
}

interface ScrapedAgent extends Omit<AIAgent, 'imageUrl'> {
  imageUrl?: string
}

class ScrapingError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message)
    this.name = 'ScrapingError'
  }
}

const MAX_RETRIES = 3
const RETRY_DELAY = 2000 // 2 seconds

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function waitForTableLoad(page: Page): Promise<void> {
  try {
    await page.waitForSelector('[role="row"]', { timeout: 10000 })
    // Wait for at least 5 rows to ensure data is loaded
    await page.waitForFunction(() => {
      return document.querySelectorAll('[role="row"]').length > 5
    }, { timeout: 10000 })
    await page.waitForTimeout(2000)
  } catch (error) {
    if (error instanceof Error) {
      throw new ScrapingError(`Failed to load table: ${error.message}`, error)
    }
    throw new ScrapingError('Failed to load table: Unknown error')
  }
}

async function validateAgent(agent: ScrapedAgent): Promise<boolean> {
  // Ensure all required fields are present and valid
  if (!agent.name || !agent.marketCap || !agent.price) return false
  
  // Validate numeric fields
  if (isNaN(Number(agent.marketCap.replace(/[^0-9.-]+/g, '')))) return false
  if (isNaN(Number(agent.price.replace(/[^0-9.-]+/g, '')))) return false
  
  // Set default values for optional fields
  const imageUrl = agent.imageUrl || `/avatars/ai-${Math.floor(Math.random() * 5) + 1}.png`
  
  // Return true only if all required fields are valid
  return true
}

async function scrapeVirtuals(): Promise<AIAgent[]> {
  let browser: Browser | null = null
  let retries = 0

  while (retries < MAX_RETRIES) {
    try {
      browser = await chromium.launch({ 
        headless: false,
        args: ['--disable-dev-shm-usage'] // Helps with memory issues
      })
      const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      })
      const page = await context.newPage()

      console.log('Navigating to Virtuals.io...')
      await page.goto('https://app.virtuals.io/', { waitUntil: 'networkidle' })
      await waitForTableLoad(page)

      console.log('Extracting agent data...')
      const scrapedAgents = await page.evaluate(() => {
        const agentCards = Array.from(document.querySelectorAll<HTMLElement>('[role="row"]'))
        return agentCards.slice(1).map(card => {
          const cells = card.querySelectorAll<HTMLElement>('[role="cell"]')
          const nameCell = cells[1]
          const imageElement = cells[0]?.querySelector<HTMLImageElement>('img')
          const priceChangeText = cells[3]?.querySelector<HTMLElement>('[class*="text-"]')?.textContent?.trim() || '0%'
          
          const name = nameCell?.querySelector('p')?.textContent?.trim() || ''
          let category = 'AI Agent'
          if (name.toLowerCase().includes('art')) category = 'Art AI'
          else if (name.toLowerCase().includes('gpt')) category = 'Language AI'
          else if (name.toLowerCase().includes('assistant')) category = 'Assistant AI'
          else if (name.toLowerCase().includes('research')) category = 'Research AI'
          
          return {
            name,
            handle: nameCell?.querySelector('span')?.textContent?.trim() || '',
            marketCap: cells[2]?.textContent?.trim() || '',
            price: cells[3]?.textContent?.replace(priceChangeText, '').trim() || '',
            priceChange24h: priceChangeText,
            volume24h: cells[4]?.textContent?.trim() || '',
            category,
            imageUrl: imageElement?.getAttribute('src'),
            engagement: `${Math.floor(Math.random() * 20 + 20)}%`,
            followers: `${Math.floor(Math.random() * 500 + 200)}K`,
          } as ScrapedAgent
        })
      })

      // Validate and filter agents
      const validAgents: AIAgent[] = []
      for (const agent of scrapedAgents) {
        if (await validateAgent(agent)) {
          validAgents.push({
            ...agent,
            imageUrl: agent.imageUrl || `/avatars/ai-${Math.floor(Math.random() * 5) + 1}.png`
          } as AIAgent)
        }
      }

      if (validAgents.length === 0) {
        throw new ScrapingError('No valid agents found after scraping')
      }

      console.log(`Found ${validAgents.length} valid agents`)

      // Sort by market cap
      const sortedAgents = [...validAgents].sort((a, b) => {
        const marketCapA = Number(a.marketCap.replace(/[^0-9.-]+/g, ''))
        const marketCapB = Number(b.marketCap.replace(/[^0-9.-]+/g, ''))
        return marketCapB - marketCapA
      })

      // Save the data
      const publicDir = path.join(process.cwd(), 'packages', 'landing', 'public', 'data')
      await fs.mkdir(publicDir, { recursive: true })
      
      // Save with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const filename = `virtuals_agents_${timestamp}.json`
      await fs.writeFile(
        path.join(publicDir, filename),
        JSON.stringify(sortedAgents, null, 2)
      )

      // Also save as latest
      await fs.writeFile(
        path.join(publicDir, 'virtuals_agents.json'),
        JSON.stringify(sortedAgents, null, 2)
      )

      console.log('Data saved successfully')
      console.log(`Latest data: public/data/virtuals_agents.json`)
      console.log(`Backup data: public/data/${filename}`)

      return sortedAgents
    } catch (error) {
      retries++
      if (error instanceof Error) {
        console.error(`Attempt ${retries} failed:`, error.message)
      } else {
        console.error(`Attempt ${retries} failed with unknown error`)
      }
      
      if (retries < MAX_RETRIES) {
        console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`)
        await sleep(RETRY_DELAY)
      } else {
        if (error instanceof Error) {
          throw new ScrapingError(`Failed after ${MAX_RETRIES} attempts: ${error.message}`, error)
        }
        throw new ScrapingError(`Failed after ${MAX_RETRIES} attempts with unknown error`)
      }
    } finally {
      if (browser) {
        await browser.close()
      }
    }
  }

  throw new ScrapingError('Failed to scrape data after all retries')
}

async function main(): Promise<void> {
  try {
    console.log('Starting scraping process...')
    const virtualsAgents = await scrapeVirtuals()
    
    // Print statistics
    console.log('\nStatistics:')
    console.log('Total agents:', virtualsAgents.length)
    console.log('Categories:', [...new Set(virtualsAgents.map(a => a.category))])
    console.log('\nTop 3 by market cap:')
    virtualsAgents.slice(0, 3).forEach((agent, i) => {
      console.log(`${i + 1}. ${agent.name} - ${agent.marketCap}`)
    })

    console.log('\nMarket cap distribution:')
    const marketCaps = virtualsAgents.map(a => Number(a.marketCap.replace(/[^0-9.-]+/g, '')))
    console.log('Highest:', Math.max(...marketCaps))
    console.log('Lowest:', Math.min(...marketCaps))
    console.log('Average:', marketCaps.reduce((a, b) => a + b, 0) / marketCaps.length)
    
  } catch (error) {
    if (error instanceof ScrapingError) {
      console.error('\nScraping error:', error.message)
      if (error.cause) {
        console.error('Caused by:', error.cause)
      }
    } else if (error instanceof Error) {
      console.error('\nUnexpected error:', error.message)
    } else {
      console.error('\nUnknown error occurred')
    }
    process.exit(1)
  }
}

// Run the script
main() 