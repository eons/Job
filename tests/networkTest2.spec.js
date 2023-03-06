const {test, expect, request}= require('@playwright/test');
const {APIUtils}= require('./Utils/APIUtils');

const loginPayLoad= {userEmail: "eons@gmail.com", userPassword: "adminMx23!"};
const orderPayLoad= {orders: [{country: "Mexico", productOrderedId: "6262e9d9e26b7e1a10e89c04"}]};
const fakePayLoadOrders= {data: [], message: "No Orders"};
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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63ea755c568c3e9fb114f0e2",
     route=> route.continue(
    {
        url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63ea7794568c3e9fb114f388'
    }));

    await page.locator("button:has-text('View')").first().click();
    await page.pause();
});