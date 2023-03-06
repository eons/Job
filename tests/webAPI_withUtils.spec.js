const {test, expect, request}= require('@playwright/test');
const {APIUtils}= require('./Utils/APIUtils');

const loginPayLoad= {userEmail: "eons@gmail.com", userPassword: "adminMx23!"};
const orderPayLoad= {orders: [{country: "Mexico", productOrderedId: "6262e9d9e26b7e1a10e89c04"}]};
let response_;

test.beforeAll( async ()=>
{
    const apiContext= await request.newContext();
    const apiUtils= new APIUtils(apiContext, loginPayLoad);
    response_= await apiUtils.createOrder(orderPayLoad);
});

test("Place the order", async ({page})=>
{
    page.addInitScript(value =>
        {
           window.localStorage.setItem('token', value);
        }, response_.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[routerlink= '/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();
    const rows= page.locator("tbody tr");

    for(let i=0; i< await rows.count(); ++i)
    {
        const rowOrderId= await rows.nth(i).locator("th").textContent();
        if(response_.orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }     
    }
    const orderIdDetails= await page.locator(".col-text").textContent();
    expect(response_.orderId.includes(orderIdDetails)).toBeTruthy(); //we do not need an await here because the textContend
    //currently has an auto-wait read playwright documentation...
    await page.pause();
});