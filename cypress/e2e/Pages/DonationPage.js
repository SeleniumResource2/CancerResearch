import BasePage from "../Base/BasePage"

const or = require ("../../locators.json")

export class DonationPage extends BasePage{
    
    //Enter amount and type
    donationDetails(){
        cy.fixture("donor").then(data =>
            {
                const motivationMsg = data.motivation
                const donationTy = data.dontationType
                let amount = data.amount
        
        amount = amount.substring(0,2)        
        const dType = this.getXpathForElementWithValue(amount)
        this.clickXpath(dType);       
        this.forceClickContains(or.donationPage.typeYes)    
        cy.get(or.donationPage.motivation).select(motivationMsg)       
        this.forceClickCss(or.donationPage.fundingSource) 
        this.selectText(or.donationPage.cancerType, 'Bowel cancer')        
        this.forceClickContains(or.donationPage.continue)
        this.click(or.donationPage.manage)  
        this.info("=====Donation Details entered successfully=====")
    })
    }
}
 

export default DonationPage