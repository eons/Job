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
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63e53a2c568c3e9fb111cede",
    async route=>
    {
        //intercepting response - API response -> {playwright fakerepsonse}-> sent to browser -> render data on front end
        const response= await page.request.fetch(route.request());
        let body= fakePayLoadOrders;
        route.fulfill(
            {
                response,
                body,
            });
    });

    await page.pause();
    await page.locator("[routerlink= '/dashboard/myorders']").click();

    console.log(await page.locator(".mt-4").textContent());

    //await page.pause();
});