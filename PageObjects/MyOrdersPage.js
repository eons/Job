class MyOrdersPage
{
    constructor(page)
    {
        this.orderIdsTable= page.locator("tbody");
        this.tableRows= page.locator("tbody tr");
    }

    async validateOrderIdIsDisplayed(prodId_)
    {
        await this.orderIdsTable.waitFor();
        const rows= this.tableRows;

        for(let i=0; i< await rows.count(); ++i)
        {
            const rowOrderId= await rows.nth(i).locator("th").textContent();
            if(prodId_.includes(rowOrderId))
            {
                await rows.nth(i).locator("button").first().click();
                break;
            }     
        }
    }
}
module.exports= {MyOrdersPage};