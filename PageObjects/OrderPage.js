
const {test, expect}= require('@playwright/test');
class OrderPage
{
    constructor(page)
    {
        this.userNameText= page.locator(".user__name label[type= 'text']");
        this.selectCountryDropdown= page.locator("[placeholder= 'Select Country']");
        this.listOfResults= page.locator(".ta-results");
        this.ItemsInResults= page.locator("button");
        this.placeOrderButton= page.locator(".action__submit");
    }

    async validateUserName(userName_)
    {
        await expect(this.userNameText).toHaveText(userName_);
    }

    async selctCoutry(country_)
    {
        await this.selectCountryDropdown.type(country_, {delay:250});
        const dropdownListOfItems= this.listOfResults;
        await dropdownListOfItems.waitFor();
        const ItemsInDropdown= await this.ItemsInResults.count();
        console.log(ItemsInDropdown);
    
        for(let i=0; i<ItemsInDropdown; ++i)
            {
                let textInOption= await dropdownListOfItems.locator("button").nth(i).textContent();
                if(textInOption === " " + country_)
                {
                    await dropdownListOfItems.locator("button").nth(i).click();
                    break;
                }
             }
    }

    async submitOrder()
    {
        await this.placeOrderButton.click();
    }
}
module.exports= {OrderPage};