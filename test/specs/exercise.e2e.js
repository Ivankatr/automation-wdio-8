import {username, password} from './fixtures.js'
// import LoginPage from '../pageobjects/login.page'
// import ApplicationsPage from '../pageobjects/applications.page'

describe('Czechitas Login Page', async () => {

    it('should open login page', async () => {

        await browser.reloadSession();

        await browser.url('/prihlaseni'); // .url=odnavigujeme se na baseUrl definovoun v wdio.conf.js, ('/prihlaseni')= konkretne na sekci prohlaseni. Neni-li definovana baseUrl, musime 
                                          //     celou  url zadat.

        await browser.saveScreenshot('screenshot prihlaseni page.png');           

        await browser.pause(5000);


    });

    it('homework', async () => {

        await browser.reloadSession();

        await browser.url('/pro-rodice');

        await browser.saveScreenshot('homework.png');           

        await browser.pause(5000);
        
    });
});
