const {test, expect}= require('@playwright/test');

test("additional Validations", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com"); //CTRL + k  &  CTRL + C  (to comment the line)
    // await page.goBack();                  //CTRL + k  &  CTRL + u  (to uncomment the line)
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on('dialog', dialog=> dialog.accept()); //positive
    //page.on('dialog', dialog=> dialog.dismiss(); //negative
    // keep im mind that you need to declare page.on before to be listening for the dialog event since before
    // it happens then you can call the action that goint to trigger the dialog
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();

    const framePage= page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href= 'lifetime-access']:visible").click();
    const textCheck= await framePage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

    expect(textCheck.includes(textCheck.split(" ")[1])).toBeTruthy();
    await page.pause();

})