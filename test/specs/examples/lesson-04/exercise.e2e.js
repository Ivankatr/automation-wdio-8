/**
 * Lesson 4: Test structure
 */
import {username, password} from '../../fixtures.js'

describe('Login Page', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
    });

    it('should show login form', async () => {
        const emailField = $('#email');
        console.log('Email field is displayed: ' + await emailField.isDisplayed());
        console.log('Email field is displayed: ' + await emailField.isEnabled());

        const passwordField = $('#password');
        console.log('Password field is displayed: ' + await passwordField.isDisplayed());
        console.log('Password field is displayed: ' + await passwordField.isEnabled());

        const loginButton = $('.btn-primary');
        console.log('Login button is displayed: ' + await loginButton.isDisplayed());
        console.log('Login button text is: ' + await loginButton.getText());
    });

    it('should login with valid credentials', async () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]'); // vpravo nahore prihlasen user- Admin Lisak
        console.log('User currently logged in: ' + await userNameDropdown.getText());
    });

    it('should not login with invalid credentials', async () => {

        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue('invalid');
        await loginButton.click();

        const toastMessage = $('.toast-message');         // kontrolujeme error message
        console.log('Error: ' + await toastMessage.getText());

        const fieldError = $('.invalid-feedback');          // kontrolujeme error message
        console.log('Field error: ' + await fieldError.getText());

        console.log('Email field is dislayed: ' + await emailField.isDisplayed());
        console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
        console.log('Login button is dislayed: ' + await loginButton.isDisplayed());
    });

    it('should logout', async () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');
        const navbarRight = $('.navbar-right')
        const userNameDropdown = navbarRight.$('[data-toggle="dropdown"]');
        const logoutLink = $('#logout-link');

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        console.log('User currently logged in: ' + await userNameDropdown.getText());

        await userNameDropdown.click();
        await logoutLink.click();

        console.log('User is logged in: ' + await userNameDropdown.isDisplayed());
        console.log('Navbar text: ' + await navbarRight.getText());           // opet kontrola praveho horniho rohu - ze uz tam nevidim prihlaseneho user Admin Lisak
    });
});

describe('Applications Page', async () => {

    beforeEach(async () => {
        await browser.reloadSession();                     // sada spolecnych akci pro 2 nasledujici It
        await browser.url('/prihlaseni');
        await $('#email').setValue(username);
        await $('#password').setValue(password);
        await $('.btn-primary').click();
        await $('=Přihlášky').click();
        await browser.pause(1000);
    });

    it('should list all applications', async () => {         //overeni nacteni vychoziho stavu
        console.log('Page title is: ' + await $('h1').getText());

        const rows = await $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + rows.length + ' rows in the table');
        for (const row of rows) {
            const rowText = await row.getText()
            console.log(rowText);
        }
    });

    it('should filter in applications', async () => {               // do vyhledavaciho okna se zada text a overime, ze filtruje spravne
        const searchInput = $('input[type="search"]');
        const loading = $('#DataTables_Table_0_processing');
        const searchText = 'mar';
   
        await searchInput.setValue(searchText);                
        await loading.waitForDisplayed({ reverse: true});  
        await browser.pause(1000);

        const filteredRows = await $('.dataTable').$('tbody').$$('tr')
        console.log('There are ' + filteredRows.length + ' filtered rows in the table');
        for (const row of filteredRows) {
            console.log(await row.getText());
        }
    });
});
