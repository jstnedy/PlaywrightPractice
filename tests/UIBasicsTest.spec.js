const {test, expect} = require('@playwright/test');
//Page fixture approach
//Playwright automatically:
//creates a browser context
//creates a page

test.only('Page Playwright Test', async ({page})=> {
   ///////////////// P A G E O B J E C T M O D E L  A P P R O A C H //////////////////////
   //Login
   const UserName = page.locator('#userEmail');
   const Password = page.locator('#userPassword');
   const LoginBtn = page.locator('#login');
   const CardTitles = page.locator(".card-body");
   //Register
   const registerLink = page.locator(".text-reset");
   const firstName = page.locator("#firstName");
   const lastName = page.locator("#lastName");
   const email = page.locator("#userEmail");
   const phoneNumber = page.locator("#userMobile");
   const password = page.locator("#userPassword");
   const confirmPassword = page.locator("#confirmPassword");
   const checkBox = page.locator(".col-md-1");
   const registerBtn = page.locator("#login");
   const accountCreatedLoginBUtton = page.locator("[class='btn btn-primary']");   
   //Shopping Items
   const cartItems = page.locator(".card-body");
   const cartItemsButton = page.locator("//button[@routerlink='/dashboard/cart']");
   const checkOut = page.locator("text=Checkout");
   const cvvCode = page.locator("//div[@class='payment__cc']//div[2]//input[1]");
   const nameOnCard = page.locator("//div[@class='payment__info']//div[3]//div[1]//input[1]");
   const selectCountry = page.locator("//input[@placeholder='Select Country']");
   const confirmCountry = page.locator("//span[@class='ng-star-inserted']");
   const placeOrder = page.locator(".btnn.action__submit.ng-star-inserted");
   const orderReferenceNumber = page.locator("//tr[@class='ng-star-inserted']");
   const couponCode = page.locator("//input[@name='coupon']");
   const applyCouponButton = page.locator("[class='btn btn-primary mt-1']");
   const couponResultMessage = page.locator(".mt-1.ng-star-inserted");
   const orderHistoryPage = page.locator("//label[@routerlink='/dashboard/myorders']");
   const orderReferenceID = page.locator("//th[@scope='row']");
   ///////////////// P A G E O B J E C T M O D E L  A P P R O A C H //////////////////////

   page.goto("https://rahulshettyacademy.com/client/auth/login", {waitUntil: 'domcontentloaded'});
   registerLink.click();
   
   //Register Account
   const randomEmail = `user${Math.random().toString(36).substring(2, 9)}@gmail.com`;
   await firstName.fill("rahul");
   await lastName.fill("shetty");
   await email.fill(randomEmail);
   await phoneNumber.fill("9876543210");
   await password.fill("Es11k@wawawa");
   await confirmPassword.fill("Es11k@wawawa");
   await checkBox.click();
   await registerBtn.click();
  

   //Get registered email and password
   const registeredEmail = await email.inputValue();
   const registeredPassword = await password.inputValue();
   console.log("Registered Email: " + registeredEmail);
   console.log("Registered Password: " + registeredPassword);
   
   //Login with registered account
   await accountCreatedLoginBUtton.click();
   await UserName.fill(registeredEmail);
   await Password.fill(registeredPassword);
   await LoginBtn.click();
   // Keep the page open without closing
   await page.waitForTimeout(2000);
   await page.pause();
   //Find and add "Zara Coat 3" to cart
   async function addItemToCart(page, itemName) {
   const itemCount = await cartItems.count();
      
      for(let i = 0; i < itemCount; i++) {
         const itemTitle = await cartItems.nth(i).locator("b").textContent();
         
         if(itemTitle.trim() === itemName) {
            await cartItems.nth(i).locator("text=Add to Cart").click();
            console.log(`${itemName} has been added to cart`);
            return;
         }
      }
   }

await addItemToCart(page, "ZARA COAT 3");
await addItemToCart(page, "ADIDAS ORIGINAL");

await cartItemsButton.click();
await checkOut.click();
await cvvCode.fill("123");
await nameOnCard.fill("Rahul Shetty"); 

// Coupon Code Application and Verification //
await couponCode.fill("Invalid Coupon");
await applyCouponButton.click();
await page.waitForTimeout(5000);

if (await couponResultMessage.textContent() === "* Invalid Coupon") {
   console.log("Invalid coupon code message is displayed as expected.");
} else {
   console.log("Unexpected message for invalid coupon code.");
}

await couponCode.fill("rahulshettyacademy");
await applyCouponButton.click();
if (await couponResultMessage.textContent() === "* Coupon Applied") {
   console.log("Coupon code entered correctly.");
} else {
   console.log("Coupon code entry failed.");
}

await page.waitForTimeout(5000);

await selectCountry.type("Philippines");
await confirmCountry.click();
await placeOrder.click();
const orderRefNumber = await orderReferenceNumber.textContent().then( text => text.split("|")[1].trim());
console.log("Order Reference Number: " + orderRefNumber);

// Verify Order in Order History //
await orderHistoryPage.click();
const orderRefText = await orderReferenceID.textContent();
console.log("Order Reference ID in Order History: " + orderRefText);

// Verify Order Reference Number matches Order Reference ID
if (orderRefText === orderRefNumber) {
   console.log("Order reference number matches in order history.");
} else {
   console.log("Order reference number does not match in order history.");
}
await page.pause();

const orderReferenceIDCount = await orderReferenceID.count();
for (let i = 0; i < orderReferenceIDCount; ++i) {

  if(await orderReferenceID.textContent() === orderRefNumber) {
   console.log("Order found in order history: " + await orderReferenceID.nth(i).textContent());
   await orderReferenceID.nth(i).locator('..').locator('button', { hasText: 'View' }).click();
   break;
}
}
   
});




test('Page Playwright Tests', async ({page})=> {
   //Login
   const UserName = page.locator('#username');
   const Password = page.locator('#password');
   const LoginBtn = page.locator('#login');
   const CardTitles = page.locator(".card-body");
   const loginDropdown = page.locator("select.form-control");
   const popupMessage = page.locator("div[class='modal-body'] p");
   const popupOkayButton = page.locator("#okayBtn");
   const loginButton = page.locator("#signInBtn");
   const iAgreeCheckbox = page.locator("#terms");
   const documentLink = page.locator("[href*='documents-request']");

   //Register
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await UserName.fill("rahulshettyacademy");
   await Password.fill("learning");
   await page.locator(".radiotextsty").last().click();
   

   //Verify if the pop up message is visible
   await expect(popupMessage).toBeVisible();
   const popupMessageText = await popupMessage.textContent();
   console.log("Popup Message: " + popupMessageText);
   
   //Verify if the radio button has been clicked correctly
   await expect(page.locator(".radiotextsty").last()).toBeChecked();
   console.log(await page.locator(".radiotextsty").last().isChecked());

   await popupOkayButton.click();
   await loginDropdown.selectOption("consult");
   await iAgreeCheckbox.click();
   await expect(iAgreeCheckbox).toBeChecked();
   await iAgreeCheckbox.uncheck();
   await expect(iAgreeCheckbox).not.toBeChecked();
   await expect(documentLink).toHaveAttribute("class", "blinkingText");
   await documentLink.textContent().then( text => console.log("Document Link Text: " + text));
   await loginButton.click();
   await page.pause();
  
});
test('Verify blinking text', async ({browser})=> {

  
   const context = await browser.newContext();
   const page = await context.newPage();
   const documentLink = page.locator("[href*='documents-request']");
   const userName = page.locator('#username');
   const password = page.locator('#password');
   const loginButton = page.locator("#signInBtn");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await expect(documentLink).toHaveAttribute("class", "blinkingText");
   await documentLink.textContent().then( text => console.log("Document Link Text: " + text));


   const [newPage, newPage2] = await Promise.all(
   [
   context.waitForEvent('page'), //listen for any new page to open
   await documentLink.click(), //New page is opoened
   ]) 

   const newPageText = await newPage.locator(".red").textContent();
   const arrayText = newPageText.split("@");
   const domain = arrayText[1].split(" ")[0];
   console.log(("Grabbed value from the link:"), domain);
   await userName.fill(domain);
   await password.fill("learning");
   console.log(("Grabbed username Value:"), await userName.inputValue());
   await loginButton.click();
   await page.pause();
   
  
});
 