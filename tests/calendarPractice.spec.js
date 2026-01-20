const {test, expect} = require('@playwright/test');

test.only('Playwright Special Locators', async ({page})=> {

    const datePickerButton = page.locator("[class='react-date-picker__calendar-button react-date-picker__button']");
    const dateYearButton = page.locator("[class='react-calendar__navigation__label']");
    const yearSelection = page.locator("[class='react-calendar__tile react-calendar__decade-view__years__year']");
    const monthSelection = page.locator("[class='react-calendar__tile react-calendar__year-view__months__month']");
    const daySelection = page.locator("[class='react-calendar__tile react-calendar__month-view__days__day']");
    const deliveryDate = page.locator("//input[@inputmode='numeric']");

    const dayToSelect = "6";  
    const monthToSelect = "6"; 
    const yearToSelect = "2025";
   
   //Land on Webpage
   await page.goto("http://rahulshettyacademy.com/seleniumPractise/#/offers");
   await datePickerButton.click();
   await dateYearButton.click();
   await dateYearButton.click();
   await yearSelection.filter({hasText: yearToSelect}).click();
   await monthSelection.nth(Number(monthToSelect)-1).click();
   await page.pause();
   await daySelection.filter({ hasText: new RegExp(`^${dayToSelect}$`) }).click();

     await deliveryDate.count().then(async count => {
    for(let i=0; i<count; i++) {
        const dateValue = await deliveryDate.nth(i).inputValue();
        if (dateValue === `${dayToSelect}/${monthToSelect}/${yearToSelect}`) {
            console.log(`Date selected correctly for input index ${i}: ${dateValue}`);
        } else {
            console.error(`Date selection mismatch for input index ${i}: expected ${dayToSelect}/${monthToSelect}/${yearToSelect}, but got ${dateValue}`);
        }
    }
   
});
});
   

