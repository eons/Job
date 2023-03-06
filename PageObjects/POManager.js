const {LoginPage}= require('./LoginPage');
const {DashboardPage}= require('./DashboardPage');
const {CartPage}= require('./CartPage');
const {OrderPage}= require('./OrderPage');
const {ThanksPage}= require('./ThanksPage');
const {MyOrdersPage}= require('./MyOrdersPage');
const {OrderDetailsPage}= require('./OrderDetailsPage');

//https://rahulshettyacademy.com/client

class POManger
{
    constructor(page)
    {
        this.page= page;
        this.loginPage= new LoginPage(this.page);
        this.dashboardPage= new DashboardPage(this.page);
        this.cartPage= new CartPage(this.page);
        this.orderPage= new OrderPage(this.page);
        this.thanksPage= new ThanksPage(this.page);
        this.myOrdersPage= new MyOrdersPage(this.page);
        this.orderDetailsPage= new OrderDetailsPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getOrderPage()
    {
        return this.orderPage;
    }

    getThanksPage()
    {
        return this.thanksPage;
    }

    getMyOrdersPage()
    {
        return this.myOrdersPage;
    }

    getOrderDetailsPage()
    {
        return this.orderDetailsPage;
    }
}
module.exports= {POManger};