const {test, expect}= require('@playwright/test');

class OrderDetailsPage
{
    constructor(page)
    {
        this.prodIdText= page.locator(".col-text");
    }

    async validateOrderDetails(prodId_)
    {
        const orderIdDetails= await this.prodIdText.textContent();
        expect(prodId_.includes(orderIdDetails)).toBeTruthy();
    }
}
module.exports= {OrderDetailsPage};