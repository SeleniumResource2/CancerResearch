import BasePage from "../Base/BasePage"

const or = require ("../../locators.json")
const config = require ("../../config.json")

class DetailsPage extends BasePage{  
    
    //Entering addresss details of the donor
    addressDetails(){
        cy.fixture("donor").then(data =>
        {
            const fname = data.firstname
            const lname = data.lastname
            const emailId = data.email
            const phone = data.phone
            const postal = data.homeAddress.postcode  
            
        cy.get(or.detailsPage.title).select('Miss').should('be.visible')          
        this.type(or.detailsPage.foreName, fname)
        this.type(or.detailsPage.surName, lname)
        this.type(or.detailsPage.email, emailId)
        this.type(or.detailsPage.phoneNumber, phone)
        this.type(or.detailsPage.postalCode, postal)        
        this.click(or.detailsPage.findAddress)
        this.selectText(or.detailsPage.selectAddress, config.address)
        this.forceClickXpath(or.detailsPage.emailOption)
        this.forceClickTriggerXpath(or.detailsPage.continueBtn)
        this.info("=====Donor Details entered successfully=====")

    })
    }
    
    //Navigation to next page
    navigateToNext(){
        this.clickXpath(or.detailsPage.backBtn)
        this.minPause()
        cy.contains('Continue').click({force:true})
        this.maxPause()
        this.forceClickTriggerXpath(or.detailsPage.continueBtn)            
    }

}

export default DetailsPage