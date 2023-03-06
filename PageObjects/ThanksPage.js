const {test, expect}= require('@playwright/test');

class ThanksPage
{
    constructor(page)
    {
        this.thanksLetter= page.locator(".hero-primary");
        this.productIdText= page.locator(".em-spacer-1 .ng-star-inserted");
        this.ordersHyperlink= page.locator(".em-spacer-1 [routerlink= '/dashboard/myorders']");
    }

    async validateOrderCreation()
    {
        await expect(this.thanksLetter).toHaveText(" Thankyou for the order. ");
        let prodId= await this.productIdText.textContent();
        console.log(prodId);
        
        return prodId;
    }

    async navigateToMyOrders()
    {
        await this.ordersHyperlink.click();
    }
}
module.exports= {ThanksPage};