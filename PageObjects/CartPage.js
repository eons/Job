const {test, expect}= require('@playwright/test');

class CartPage
{
    constructor(page)
    {
        this.page= page;
        this.listOfProducts= page.locator("li.items");
        this.checkoutButton= page.locator("xpath=//button[contains(text(),'Checkout')]");
    }

    async verifyProductIsDisplayed(productName_)
    {
        await this.listOfProducts.waitFor();
        const yesOrNo= await this.getProductLocator(productName_).isVisible();
        expect(yesOrNo).toBeTruthy();
    }

    getProductLocator(productName_)
    {
        return this.page.locator("h3:has-text('"+productName_+"')");
    }

    async moveToOrderCreation()
    {
        await this.checkoutButton.click();
    }
}
module.exports= {CartPage};