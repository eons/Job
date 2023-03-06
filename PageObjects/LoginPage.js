class LoginPage
{
    constructor(page)
    {
        this.page= page;
        this.signInbutton= page.locator("#login")
        this.userName= page.locator("#userEmail");
        this.password= page.locator("#userPassword")
    }

    async goto()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(email_, password_)
    {
        await this.userName.type(email_);
        await this.password.type(password_);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports= {LoginPage};