const {test, expect} = require('@playwright/test');

test.only('Browser Context-validating Error login', async ({page})=> {


    const CardTitles = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client/auth/login");
    await page.waitForLoadState('networkidle');
    await page.locator('#userEmail').fill("anshika@gmail.com");
    await page.locator('#userPassword').fill("Iamking@000");
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    console.log( await CardTitles.nth(0).textContent());
    const titles = await CardTitles.allTextContents();
    console.log(titles);
    await page.pause();

});

 