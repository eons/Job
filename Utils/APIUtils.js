const {expect}= require('@playwright/test')
class APIUtils
{
    constructor(apiContext, loginPayLoad)
    {
        this.apiContext= apiContext;
        this.loginPayLoad= loginPayLoad;
    }

    async getToken()
    {
        // LogIn
        const loginResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: this.loginPayLoad
        });
        expect((loginResponse).ok()).toBeTruthy();
        const loginResponseJson= await loginResponse.json();
        const token= loginResponseJson.token;
        console.log(token);

        return token;
    }

    async createOrder(orderPayLoad)
    {
        // Create Order
        let response= {};
        response.token= await this.getToken();
        const orderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
         {
            data: orderPayLoad,
            headers:
                {
                    'Authorization': response.token,
                    'Content-type': 'application/json'
                },
        });
        expect((orderResponse).ok()).toBeTruthy();
        const orderResponseJson= await orderResponse.json();
        const orderId= orderResponseJson.orders[0];
        console.log(orderResponseJson);
        response.orderId= orderId;

        return response;
    }
}
module.exports= {APIUtils};