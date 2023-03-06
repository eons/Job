const {test, expect, request}= require('@playwright/test');

const loginPayLoad= {userEmail: "eons@gmail.com", userPassword: "adminMx23!"};
const orderPayLoad= {orders: [{country: "Mexico", productOrderedId: "6262e9d9e26b7e1a10e89c04"}]};
let sesionToken;
let orderId;

test.beforeAll( async ()=>
{
    // LogIn
    const apiContext= await request.newContext();
    const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: loginPayLoad
    });
    expect((loginResponse).ok()).toBeTruthy();
    const loginResponseJson= await loginResponse.json();
    sesionToken= loginResponseJson.token;
    console.log(sesionToken);

    // Create Order
    const orderResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
    {
        data: orderPayLoad,
        headers:{
                    'Authorization': sesionToken,
                    'Content-type': 'application/json'
                },
    });
    const orderResponseJson= await orderResponse.json();
    orderId= orderResponseJson.orders[0];
    console.log(orderResponseJson);
});

test("Place the order", async ({page})=>
{
    page.addInitScript(value =>
        {
           window.localStorage.setItem('token', value);
        }, sesionToken);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("[routerlink= '/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();
    const rows= page.locator("tbody tr");

    for(let i=0; i< await rows.count(); ++i)
    {
        const rowOrderId= await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }     
    }
    const orderIdDetails= await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy(); //we do not need an await here because the textContend
    //currently has an auto-wait read playwright documentation...
    await page.pause();
});