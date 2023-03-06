const {test, expect} = require("@playwright/test");

test("", async function({browser})
//we need tu use browser as we need to crear different windows/pages to hadleling
//correctly
{
    const context= await browser.newContext();
    const Parentpage= await context.newPage();
    await Parentpage.goto("https://rahulshettyacademy.com/loginpagePractise/");
     
    const [ChildPage]= await Promise.all([ //newPage2 necesita ir en array ya que es
        //arrglo d edatos lo que recibe de la pagina
        context.waitForEvent('page'),
        await Parentpage.locator("[href= 'https://rahulshettyacademy.com/documents-request']").click(),
    ])


    const text= await ChildPage.locator("p.red").textContent();
    const arrayText= text.split("@");
    const domain= arrayText[1].split(".")[0]
    console.log(domain);

    Parentpage.locator("#username").type(domain);
    await Parentpage.pause();
});