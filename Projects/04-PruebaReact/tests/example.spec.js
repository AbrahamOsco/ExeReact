// @ts-check
import { test, expect } from '@playwright/test';
const LOCAL_HOST_URL = 'http://localhost:5173'
const CAT_PREFIX = "https://cataas.com/cat/says/"

test('app show random fact and img', async ({ page }) => {
  await page.goto(LOCAL_HOST_URL);
  const text = await page.getByRole('paragraph')
  const aImg = await page.getByRole('img')
  // Porque la pagina es sencilla sino tendriamos q recupear dentro del selector tal recupera el rol parrafo. 
  
  const textContent = await text.textContent()
  const imgSrc = await aImg.getAttribute('src')
  
  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imgSrc?.startsWith(CAT_PREFIX)).toBeTruthy()
});
