const {test, expect}= require("@playwright/test");
const {POManger}= require('../PageObjects/POManager');
//Json -> String -> js object
const dataSet= JSON.parse(JSON.stringify(require('../Utils/TestData/e2ePractice_PO_withJson_TestData.json')));

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
    await loginPage.validLogin(dataSet.userName, dataSet.password);
    await dashboardPage.searchProductAddCart(dataSet.productName);
    await dashboardPage.navigateToCartPage();
    await cartPage.verifyProductIsDisplayed(dataSet.productName);
    await cartPage.moveToOrderCreation();
    await orderPage.validateUserName(dataSet.userName);
    await orderPage.selctCoutry(dataSet.country);
    await orderPage.submitOrder();
    const prodId= await thanksPage.validateOrderCreation();
    await thanksPage.navigateToMyOrders();
    await myOrdersPage.validateOrderIdIsDisplayed(prodId);
    await orderDetailsPage.validateOrderDetails(prodId);
});