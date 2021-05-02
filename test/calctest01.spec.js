const puppeteer = require('puppeteer');
const {expect} = require('chai');

const CalcPage = require('../pages/calcpo')
const config = require('../config')

describe('Test for Angular ', ()=>{
  let browser, page, calcPO;

          before(async()=>{
            browser = await puppeteer.launch(config.local.browserMode);
          })
          
          beforeEach(async()=>{
            page = await browser.newPage();
            await page.setViewport({ width: 1366, height: 768});
            calcPO =  new CalcPage(page, config);

            await calcPO.launchCalc();
           
          })

          it('Should "Divide" 123 for both fields ', async() => {
            await calcPO.typeFirstCalcKey();
            await calcPO.typeSecondCalcKey();
            await calcPO.selectDivisionOperand();
            await calcPO.calculate()
            let res = await calcPO.result();
            expect(res).to.equal("1");
          })

          afterEach(async()=>{
            await page.close();
          })
          after(async()=>{
            await browser.close();
          })  
})
