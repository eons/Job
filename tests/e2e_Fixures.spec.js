const {test, expect}= require("@playwright/test");
const {customeTestData}= require("../Utils/TestData/test-base");
const {POManger}= require('../PageObjects/POManager');


customeTestData(`e2e Test`, async ({page, testDataForOrders})=>
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
    await loginPage.validLogin(testDataForOrders.userName, testDataForOrders.password);
    await dashboardPage.searchProductAddCart(testDataForOrders.productName);
    await dashboardPage.navigateToCartPage();
    await cartPage.verifyProductIsDisplayed(testDataForOrders.productName);
    await cartPage.moveToOrderCreation();
    await orderPage.validateUserName(testDataForOrders.userName);
    await orderPage.selctCoutry(testDataForOrders.country);
    await orderPage.submitOrder();
    const prodId= await thanksPage.validateOrderCreation();
    await thanksPage.navigateToMyOrders();
    await myOrdersPage.validateOrderIdIsDisplayed(prodId);
    await orderDetailsPage.validateOrderDetails(prodId);
});
