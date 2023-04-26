describe('Homework', async () => {

    it('should open page and create screenshot', async () => {

        await browser.url('/registrace');

        await browser.saveScreenshot ('homework screenshot Registrace.png');

        console.log("mas hotovy screenshot Ivi");
           // sem vypracuj domácí úkol-hotovo

    });

});
