const {test, expect} = require('@playwright/test');

test('Playwright Special Locators', async ({page})=> {
   
   //Land on Webpage
   await page.goto("http://rahulshettyacademy.com/angularpractice/");
   await page.getByLabel("Check me out if you Love IceCreams!").check();
   await page.getByLabel("Employed").check();
   await page.getByLabel("Gender").selectOption("Female");
   await page.getByPlaceholder("Password").fill("Hello123");
   await page.getByRole('button', {name: 'Submit'}).click();
   await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
   await page.getByRole('link', {name: 'Shop'}).click();
   await page.locator("app-card").filter({hasText: 'Blackberry'}).getByRole("Button").click();
   await page.pause();
   

   
});
