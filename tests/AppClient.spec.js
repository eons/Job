const {test, expect} = require('@playwright/test');

//test.describe.configure({mode: 'parallel'}); //it helps to run in parallel the test cases in this file
//test.describe.configure({mode: 'serial'}); //by default playwright runs the test cases into any file in
// sequence, but if you explicitly request this mode you are activating interdependency mode... that means
//that the second test case depends on teh first test case and if the first test case does not pass then
//the second and the others won't be executed because of this...

test.only('Login amd card-body practice', async function({page})
{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value= 'Login']").click();

    await page.waitForLoadState('networkidle'); //this helps if th eapp is service oriented
    const titles= await page.locator(".card-body b").allTextContents();
    console.log(titles);

});

 // in case it's not service oriented you can use the following way:
    //await Promise.all(
    //    [
      //      page.waitForNavigation(),
      //      signin.click(),
      //  ]
       // );

       ///By default if you only selecets the folder where your test files are contained they are run in parallel
       //but if you select one of them the test cases insdide this file are run in sequence
       
       //by default playwright provide 5 workers/browsers/threads to execute the test cases in parallel but it can be
       //modified and once one of the is free can be used for the next test case keeping all time the 5 workers in use

       //test.skip('Login amd card-body practice', async function({page}) //to skip a test case


       //test(' @web Login amd card-body practice', async function({page}) //@ is taggin the test with teh name web
       //it helps becasue with the following command you can runt all teh test cases with the same tag
       //npx playwright test --grep @web           // into the same folder/project