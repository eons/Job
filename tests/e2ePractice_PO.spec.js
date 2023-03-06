const {test, expect}= require("@playwright/test");
const {POManger}= require('../PageObjects/POManager');

const userName=  "eons@gmail.com";
const password= "adminMx23!";
const productName= 'iphone 13 pro';
const country= "Mexico";

test("E2E testing", async ({page})=>
{
    const poManager= new POManger(page);
    
    const loginPage= poManager.getLoginPage();
    const dashboardPage= poManager.getDashboardPage();
    const cartPage= poManager.getCartPage();
    const orderPage= poManager.getOrderPage();
    const thanksPage= poManager.getThanksPage();
    const myOrdersPage= poManager.getMyOrdersPage();
    const orderDetailsPage= poManager.getOrderDetailsPage();

    await loginPage.goto();
    await loginPage.validLogin(userName, password);
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.moveToOrderCreation();
    await orderPage.validateUserName(userName);
    await orderPage.selctCoutry(country);
    await orderPage.submitOrder();
    const prodId= await thanksPage.validateOrderCreation();
    await thanksPage.navigateToMyOrders();
    await myOrdersPage.validateOrderIdIsDisplayed(prodId);
    await orderDetailsPage.validateOrderDetails(prodId);
});