//login UI -> .jason
//test browser -> .json, car, order, order detail, order history

const {test, expect} = require('@playwright/test');

let webContext;

test.beforeAll(async ({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("eons@gmail.com");
    await page.locator("#userPassword").type("adminMx23!");
    await page.locator("[value= 'Login']").click();
    await page.waitForLoadState('networkidle'); //this helps if the app is service oriented

    await context.storageState({path: 'state.json'});

    webContext= await browser.newContext({storageState: 'state.json'});
})

test('Login amd card-body practice', async function()
{
    const page= await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    await page.waitForLoadState('networkidle');

    const expectedProduct= 'iphone 13 pro';
    const products= page.locator(".card-body");
    
    
    const titles= await page.locator(".card-body b").allTextContents();//not required
    console.log(titles);//not required
    const countProducts= await products.count();
    console.log(countProducts);//not required
    for(let i=0; i<countProducts; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === expectedProduct)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("button[routerlink= '/dashboard/cart']").click();
    await page.locator("li.items").waitFor();
    const yesOrNo= await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(yesOrNo).toBeTruthy();
    //await page.pause();

});

test('Second test case', async function()
{
    const page= await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    await page.waitForLoadState('networkidle');

    const expectedProduct= 'iphone 13 pro';
    const products= page.locator(".card-body");
    
    
    const titles= await page.locator(".card-body b").allTextContents();//not required
    console.log(titles);//not required
    const countProducts= await products.count();
    console.log(countProducts);//not required
    for(let i=0; i<countProducts; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === expectedProduct)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("button[routerlink= '/dashboard/cart']").click();
    await page.locator("li.items").waitFor();
    const yesOrNo= await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(yesOrNo).toBeTruthy();
    //await page.pause();

});