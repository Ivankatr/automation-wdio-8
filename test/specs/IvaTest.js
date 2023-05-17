/**
 * Lesson 4: Test structure
 */
import { username, password } from './fixtures.js'

describe('Login And Applications Page', async () => {

    it('Login and filter applications', async () => {

        await browser.reloadSession();
        await browser.url('/prihlaseni');

        const emailField = $('#email');
        console.log('Email field is dislayed: ' + await emailField.isDisplayed());
        console.log('Email field is dislayed: ' + await emailField.isEnabled());

        const passwordField = $('#password');
        console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
        console.log('Password field is dislayed: ' + await passwordField.isEnabled());

        const loginButton = $('.btn-primary');
        console.log('Login button is dislayed: ' + await loginButton.isDisplayed());
        console.log('Login button text is: ' + await loginButton.getText());

        await loginButton.click();
        console.log('Email field is dislayed: ' + await emailField.isDisplayed());
        console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
        console.log('Login button is dislayed: ' + await loginButton.isDisplayed());


        const toastMessage = $('.toast-message');
        const fieldError = $('.invalid-feedback');

        await emailField.setValue(username);
        await passwordField.setValue('invalid');
        await loginButton.click();
        console.log('Error: ' + await toastMessage.getText());
        console.log('Field error: ' + await fieldError.getText());

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        console.log('Email field is dislayed: ' + await emailField.isDisplayed());
        console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
        console.log('Login button is dislayed: ' + await loginButton.isDisplayed());

        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
        const navbarRight = $('.navbar-right')
        console.log('User currently logged in: ' + await userNameDropdown.getText());
        console.log('User is logged in: ' + await userNameDropdown.isDisplayed());
        console.log('Navbar text: ' + await navbarRight.getText());
        console.log('Page title is: ' + await $('h1').getText());

        await $('=Přihlášky').click();
        
        const rows = await $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + rows.length + ' rows in the table');
        for (const row of rows) {
            const rowText = await row.getText()
            console.log(rowText);
        }

        const searchInput = $('input[type="search"]');
        const loading = $('#DataTables_Table_0_processing');
        const searchText = 'mar';

        await searchInput.setValue(searchText);
        await loading.waitForDisplayed();
        await loading.waitForDisplayed({ reverse: true });

        const filteredRows = await $('.dataTable').$('tbody').$$('tr')
        console.log('There are ' + filteredRows.length + ' filtered rows in the table');
        for (const row of filteredRows) {
            console.log(await row.getText());
        }

        const logoutLink = $('#logout-link');

        await userNameDropdown.click();
        await logoutLink.click();

        console.log('User is logged in: ' + await userNameDropdown.isDisplayed());
        console.log('Navbar text: ' + await navbarRight.getText());
    });
});