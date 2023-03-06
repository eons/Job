const {test, expect} = require('@playwright/test');
//playwriht code-
    //step1 - open browser
    //step2 -enter user/password (2 seconds)
    //step3 -click
    //******* asJS is asincronus that means that there is not garantee that the steps
    // runs in the sequence you are looking for, we can say that all steps should be
    // trying to run at the same time that what asincronus means... then in order the steps
    // are execute in the correct order then you need to request explicitly that how many
    // time needs to wait each step to start running... with "await" keyword
    // but in order to use the await keyword you must declear the finction as async
    // otherwize await does not work

test('Browser PLeaywright test', async function({browser})
{
    //chrome - plugins/ cookies
    const context = await browser.newContext(); // it's taking the defult browser
    // the configuration of which browser select is in playwright.config.js
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const username= page.locator('#username');
    const signin= page.locator('#signInBtn');
    const cardTitle= page.locator(".card-body a");

    //css
    await username.type("rahulshetty")
    await page.locator("[type='password']").type("learning")
    await signin.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    //type - fill
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signin.click();
    //console.log(await page.locator(".card-body a").textContent());
    console.log(await cardTitle.first().textContent()); //gets back with the first text 
    console.log(await cardTitle.nth(1).textContent()); // gets back with second text
    const allTitles= await cardTitle.allTextContents(); // check documentation for Auto-Wait there isn't any wait for
    //allTextContents method, so if we comment the 2 line above that should displayed the array is empty
    console.log(allTitles);

});

test('Page PLeaywright test', async function({page})
{
    //it's the same as the test above but with less code lines because we are
    // using page feature, but only keep in mind that it is possible if we do not
    // need to take care about any cookie or plugin
    await page.goto("https://www.google.com");
    // get the title
    console.log(await page.title());
    await expect(page).toHaveTitle("Google")
});

test.only('Practice', async function({browser})
{
    //chrome - plugins/ cookies
    const context = await browser.newContext(); // it's taking the defult browser
    // the ocnfiguration of which browser select is in playwright.config.js
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("#username").type("Josue");
    await page.locator("#password").fill("abc1234");
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
    await page.pause();

    await page.locator("#signInBtn").click();

});