import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

interface VirtualProfile {
  id: string;
  name: string;
  handle: string;
  type: 'ai';
  category: string;
  followers: string;
  apy: string;
}

async function scrapeVirtuals() {
  console.log('Starting browser...');
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  console.log('Navigating to virtuals.io...');
  await page.goto('https://app.virtuals.io/');

  // Wait for the content to load
  await page.waitForSelector('.virtuals-list', { timeout: 10000 });

  console.log('Scraping profiles...');
  const profiles = await page.evaluate(() => {
    const profileElements = document.querySelectorAll('.virtual-item');
    return Array.from(profileElements).slice(0, 20).map((el, index) => {
      const mcap = el.querySelector('.mcap')?.textContent || '0';
      const followers = el.querySelector('.followers')?.textContent || '0';
      const name = el.querySelector('.name')?.textContent || `Virtual ${index + 1}`;
      
      return {
        id: `virtual-${index + 1}`,
        name: name,
        handle: `@${name.toLowerCase().replace(/\s+/g, '')}`,
        type: 'ai' as const,
        category: 'AI Agent',
        followers: followers,
        apy: `${Math.floor(Math.random() * 10 + 15)}%` // Random APY between 15-25%
      };
    });
  });

  await browser.close();
  console.log('Browser closed.');

  // Save the scraped data
  const outputPath = path.join(__dirname, '../data/virtualProfiles.ts');
  const fileContent = `
export const virtualProfiles = ${JSON.stringify(profiles, null, 2)} as const;
`;

  fs.writeFileSync(outputPath, fileContent);
  console.log('Data saved to virtualProfiles.ts');

  return profiles;
}

scrapeVirtuals().catch(console.error); 