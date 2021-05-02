const config = require('../config')
class CalcPageObject{

  
  constructor(page, config){
    this.page = page;
    this.config = config;
  }

  async launchCalc(){
    return this.page.goto(config.local.baseURL, {waitUntil: "networkidle2"});
  }

  async getTitle(){
    return this.page.title();
  }

  async typeFirstCalcKey(){
    const input =  await this.page.$(`[ng-model="first"]`)
    return input.type("123", {delay: 100})
  }

  async typeSecondCalcKey(){
    const input =  await this.page.$(`[ng-model="second"]`)
    return input.type("123",{delay: 100})
  }

  async selectDivisionOperand(){
    const operandButton = await this.page.$('[ng-model="operator"]');
    return operandButton.select('DIVISION')
  }

  async calculate(){
    await this.page.click('#gobutton')
    return this.page.waitForTimeout(2000);
  }

  async result(){
    const resultPanel = await this.page.$('h2');

    return resultPanel.evaluate(e=>e.innerText)

  }

  async closeFirstTab(){
    if(this.page.length>1){
      return this.page[0].close();
    }
  }

}

module.exports = CalcPageObject;

