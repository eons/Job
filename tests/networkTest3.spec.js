const {test, expect} = require('@playwright/test');


test('Practice', async function({browser})
{
    //chrome - plugins/ cookies
    const context = await browser.newContext(); // it's taking the defult browser
    // the ocnfiguration of which browser select is in playwright.config.js
    const page = await context.newPage();
    await page.route('**/*.{jpg,png,jpeg}', route=> route.abort());
    await page.route('**/*.css', route=> route.abort());
    await page.on('request', request=> console.log(request.url()));
    await page.on('response', response=> console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("#username").type("rahulshettyacademy");
    await page.locator("#password").fill("learning");
    await page.locator(".checkmark").nth(1).click();
    //await page.locator(".checkmark").nth(1).uncheck(); uncheck method we do not need to clieck again...
    console.log(await page.locator(".checkmark").nth(1).isChecked()); //boolean
    await expect(page.locator(".checkmark").nth(1)).toBeChecked(); //boolean

    await page.locator("#okayBtn").click();
    

    const OcuppationDd= page.locator("[data-style= 'btn-info']");
    OcuppationDd.selectOption("Consultant");

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    //expect(await page.locator("#terms").isChecked()).toBeFalsy(); para alidar en negativo(false)
    //if action is perform inside the brackerts then the await is inside (actions is ischecked - line 79)
    //otehrwizi is outside as line numer 78
    await expect(page.locator("[href= 'https://rahulshettyacademy.com/documents-request']")).toHaveAttribute("class", "blinkingText");
   

    await page.locator("#signInBtn").click();
    await page.pause();

});