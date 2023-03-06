class DashboardPage
{
    constructor(page)
    {
        this.products= page.locator(".card-body");
        this.productTitles= page.locator(".card-body b");
        this.cart= page.locator("button[routerlink= '/dashboard/cart']");
    }

    async searchProductAddCart(productName_)
    {
    const titles= await this.productTitles.allTextContents();
    
    const countProducts= await this.products.count();
    
    for(let i=0; i<countProducts; ++i)
    {
        if(await this.products.nth(i).locator("b").textContent() === productName_)
        {
            await this.products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    }

    async navigateToCartPage()
    {
        await this.cart.click();
    }
}
module.exports= {DashboardPage};