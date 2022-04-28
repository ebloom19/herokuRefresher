import { test } from '@playwright/test';
import { chromium } from 'playwright-chromium';

async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
}


async function reload(refreshCounter) {
    const launchOptions = {
        headless: true,
        chromiumSandbox: false 
    }
    
    const browser = await chromium.launch(launchOptions);
    console.log('Opening Browser')
    const page = await browser.newPage();
    await page.goto('http://ethan-bloom.herokuapp.com/');
    console.log('Loaded Page')
    await page.waitForTimeout(2000); // wait for 2 seconds
    await page.close();
    await browser.close();
    
    console.log('Closing Browser');
    
    return refreshCounter;
}


let run = async ()=>{
    await delay(300);
    console.log('Running every 10 minutes')
    reload();
}

setInterval(run, 600000);


