describe('Homework', async () => {

    it('should open page and create screenshot', async () => {

        await browser.url('/kontakt');

        await browser.savescreenshot('homework screenshot.png');

        console.log("mas hotovy screenshot");
          // sem vypracuj domácí úkol

    });

});
