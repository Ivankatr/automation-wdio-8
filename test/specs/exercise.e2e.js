// //import {username, password} from './fixtures.js'
// // import LoginPage from '../pageobjects/login.page'
// // import ApplicationsPage from '../pageobjects/applications.page'

// ------------------------------------------------------------------------------------------------------------------------------------
// UKOL 1: Program, ktery si nacte URL, prejde na stranku prihlasky, prihlasi se, overi nacteni tabulky a udela nejake ukony v tabulce
/* 

    describe('Czechitas Login Page', async () => {

        it('should open login page', async () => {
    
            await browser.reloadSession();
    
            await browser.url('/prihlaseni'); // .url=odnavigujeme se na baseUrl definovoun v wdio.conf.js, ('/prihlaseni')= konkretne na sekci prohlaseni. Neni-li definovana baseUrl, musime 
                                              //     celou  url zadat.
    
            //await browser.saveScreenshot('screenshot prihlaseni page.png');           
    
            const buttons = await $('.btn');
            console.log(await buttons.getHTML())
            console.log('tlacitko Prihlasit se je aktivni: ' + await buttons.isDisplayed());
            console.log('tlacitko Prihlasit se je viditelne: ' + await buttons.isEnabled());
             
           //najde 1.button na strance, vypise jeho HTML a overi zda je aktivni - neni vysedly- a je viditelny

            const emailLabel = await $('label[for="email"]');
             console.log('Nazev pole email je :' + await emailLabel.getText)

            const emailField = $('#email');
            await emailField.isDisplayed();

            await emailField.setValue('muj-email@czechitas.cz');
            await browser.pause(3000);
            await emailField.clearValue();
            await browser.pause(3000);
            await emailField.setValue('da-app.admin@czechitas.cz');

            const passwordField = $('#password');
            await passwordField.isDisplayed();
            await passwordField.setValue('Czechitas123');


            await buttons.click();
            await browser.pause(3000);

            const linkPrihlasky = $('=Přihlášky');
            await linkPrihlasky.click();
            await browser.pause(3000);

            // const table = $ ('.table').$('tbody');
            // const tableRows = await $$('tr');
            // jak najit vsechny radky rows z tabulky... do const table si ulozit tbody ( telo tabulky); do tableRows si ulozim $$ vsechny tr( = table rows- radky tabulky)
            const tableRows = await $ ('.table').$('tbody').$$('tr'); // jiny zretezeny zpusob zapisu radku 48, 49; v const tableRows mam ted pole radku
            console.log('Pocet radku v tabulce je: ' + await tableRows.length); // nad polem muzu vykonavat dalsi ukony, jako treba zjisti pocet radku
            console.log('text na 4. radku je: ' + await tableRows[3].getText()); // text ze 4. radku tabulky

            await browser.pause(3000);
            for (const row of tableRows){
                console.log(await row.getText())    //for cyklem ziskam text kazdeho radku (get Text) 
            };
            await browser.pause(3000);

            await tableRows[29].waitForExist();    // waitForExist pocka, doku 30. prvek v tabulce tableRows nebude nacteny

            const loadingField = $('#DataTables_Table_0_processing');
            console.log('Policko Lodading je nacteno :' + await loadingField.isExisting()); // isExisting definuje tru nebo false, jestli je prvek na strance
 
            // await loadingField.waitForDisplayed();  // u nacitacich oken pockame az se nam zobrazi( fakt jej vidime) - isDisplayed, nebo vubec az budou existovat ( je v HTML stromu)- wait for Exist
            // // jenze protoze framework WDIO automaticky ceka, az se stranka nacte, vzdycky, kdyz se nam stranka zobrazi, je uz nactena a nejsme tedy schopni tento element videt, protoze pote co se tranka nacte se element schova ( displayed: none)
            // await loadingField.waitForDisplayed({reverse: true}); // u nacitacich oken udelame i oacky krok: system pocka az prvek LoadingField zmizi. a mame tak jistotu ze se stranka nacetla. Musime tedy zjistit, zda je tento prvek jeste i za jineho prikladu nas trance zobrazen-
            // a ano je - pokud vepisu text do vyhledavaci okna na sgtrance Prihlasky- znovu se objevi a muzeme ho chytnout. 

            
            
            // const forgottenPassword = await $('form').$('a');
            // console.log('Odkazy ve formulari jsou:' + await forgottenPassword.getAttribute('href'));
            // await browser.pause(3000);
            // await forgottenPassword.click();
            // await browser.pause(3000);
        })
    }); */ 

    //---------------------------------------------------------------------------------------------------------------------------------------------


//UKOL 2: Pro prepis na assertace muzete pouzit finalni kod z minule lekce ...

describe('Login Page', async () => {

    before(async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
    });

    it('should show login form', async () => {  // awaited once, used result on twice
        const emailField = await $('#email');
        // console.log('Email field is dislayed: ' + await emailField.isDisplayed());
        // console.log('Email field is enabled: ' + await emailField.isEnabled());

        await expect(emailField).toBeDisplayed();   // co je displayed, je videt
        await expect(emailField).toBeEnabled();     // co je enabled je povoleno- aktivni, ALE nemusi to byt viditelne !


        const passwordField = await $('#password');
        // console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
        // console.log('Password field is enabled: ' + await passwordField.isEnabled());

        await expect(passwordField).toBeDisplayed();
        await expect(passwordField).toBeEnabled();

        const loginButton = await $('.btn-primary');
      //  console.log('Login button is dislayed: ' + await loginButton.isDisplayed());
      //  console.log('Login button text is: ' + await loginButton.getText());
    

        await expect(await loginButton).toBeDisplayed();
       // await expect(await loginButton.getText()).toEqual('Přihlásit'); bud zapsat takto, nebo zapisem na radku 119
        await expect(await loginButton).toHaveText('Přihlásit');
    });
              
    it('should login with valid credentials', async () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
        console.log('User currently logged in: ' + await userNameDropdown.getText());
    });

//     it('should not login with invalid credentials', async () => {

//         const emailField = $('#email');
//         const passwordField = $('#password');
//         const loginButton = $('.btn-primary');

//         await emailField.setValue(username);
//         await passwordField.setValue('invalid');
//         await loginButton.click();

//         const toastMessage = $('.toast-message');
//         console.log('Error: ' + await toastMessage.getText());

//         const fieldError = $('.invalid-feedback');
//         console.log('Field error: ' + await fieldError.getText());

//         console.log('Email field is dislayed: ' + await emailField.isDisplayed());
//         console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
//         console.log('Login button is dislayed: ' + await loginButton.isDisplayed());
//     });

//     it('should logout', async () => {
//         const emailField = $('#email');
//         const passwordField = $('#password');
//         const loginButton = $('.btn-primary');
//         const navbarRight = $('.navbar-right')
//         const userNameDropdown = navbarRight.$('[data-toggle="dropdown"]');
//         const logoutLink = $('#logout-link');

//         await emailField.setValue(username);
//         await passwordField.setValue(password);
//         await loginButton.click();

//         console.log('User currently logged in: ' + await userNameDropdown.getText());

//         await userNameDropdown.click();
//         await logoutLink.click();

//         console.log('User is logged in: ' + await userNameDropdown.isDisplayed());
//         console.log('Navbar text: ' + await navbarRight.getText());
//     });
// });

// describe('Applications Page', async () => {

//     beforeEach(async () => {
//         await browser.reloadSession();
//         await browser.url('/prihlaseni');
//         await $('#email').setValue(username);
//         await $('#password').setValue(password);
//         await $('.btn-primary').click();
//         await $('=Přihlášky').click();
//         await browser.pause(1000);
//     });

//     it('should list all applications', async () => {
//         console.log('Page title is: ' + await $('h1').getText());

//         const rows = await $('.dataTable').$('tbody').$$('tr');
//         console.log('There are ' + rows.length + ' rows in the table');
//         for (const row of rows) {
//             const rowText = await row.getText()
//             console.log(rowText);
//         }
//     });

//     it('should filter in applications', async () => {
//         const searchInput = $('input[type="search"]');
//         const loading = $('#DataTables_Table_0_processing');
//         const searchText = 'mar';

//         await searchInput.setValue(searchText);
//         await browser.pause(1000);
//         await loading.waitForDisplayed({ reverse: true});

//         const filteredRows = await $('.dataTable').$('tbody').$$('tr')
//         console.log('There are ' + filteredRows.length + ' filtered rows in the table');
//         for (const row of filteredRows) {
//             console.log(await row.getText());
//         }
//     });
// });






});
