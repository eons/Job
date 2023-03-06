const {test, expect}= require("@playwright/test");
const {POManger}= require('../PageObjects/POManager');
//Json -> String -> js object
const dataSet= JSON.parse(JSON.stringify(require('../Utils/TestData/Parameterization_Json_TestData.json')));

for(const data of dataSet)
{
test(`e2e Test for ${data.productName}`, async ({page})=>
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
    await loginPage.validLogin(data.userName, data.password);
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.moveToOrderCreation();
    await orderPage.validateUserName(data.userName);
    await orderPage.selctCoutry(data.country);
    await orderPage.submitOrder();
    const prodId= await thanksPage.validateOrderCreation();
    await thanksPage.navigateToMyOrders();
    await myOrdersPage.validateOrderIdIsDisplayed(prodId);
    await orderDetailsPage.validateOrderDetails(prodId);
});
}