import BasePage from "../Base/BasePage"

const or = require ("../../locators.json")
const config = require ("../../config.json")

class ThankyouPage extends BasePage{

    thankYouMsg(){
        cy.xpath(or.thankYouPage.thankYou).should('contain', config.thankYouMessage)
        this.info("=====Donation made successfully=====")
    }

    getGiftReferenece(){
        return cy.get(or.thankYouPage.giftReference)        
    }

}

export default ThankyouPage