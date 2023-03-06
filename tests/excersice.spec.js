//https://rahulshettyacademy.com/client/auth/login
const {test, expect} = require('@playwright/test');

test('Loging client', async function({page})
{
    await page.goto("https://rahulshettyacademy.com/client/");

    //CSS Locators
    await page.locator("[routerlink='/auth/register']").click();
    await page.locator("#firstName").type("Fname");
    await page.locator("#lastName").type("Lname");
    await page.locator("#userEmail").type("myEmail@test.com");
    await page.locator("#userMobile").type("0121212121");

    const ocuppationDropdown= page.locator("select.custom-select");
    await ocuppationDropdown.selectOption("3: Engineer");

    await page.locator("[value='Male']").click();

    await page.locator("#userPassword").type("Fname");
    await page.locator("#confirmPassword").type("Fname");

    await page.locator("[type='checkbox']").click();
    await page.pause();

    await page.locator("#login").click();

});