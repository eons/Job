const {test, expect}= require('@playwright/test');

test("visual testing", async ({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();
    page.goto("https://flightaware.com/");

    expect(await page.screenshot()).toMatchSnapshot('landing.png');
// is expected the first time failed because there is not any previous screenshot to compare with but for second one
// we would get the appropiate result if it pass or fail and the 3 screenshots(in case failed) with the expected screenshot,
// the actual and the differences
});