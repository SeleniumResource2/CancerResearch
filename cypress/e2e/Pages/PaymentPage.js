import BasePage from "../Base/BasePage"

const or = require ("../../locators.json")

class PaymentPage extends BasePage{
    
    //Enter Payment details when card is selected
    paymentByCardWithGiftAid(){

         cy.fixture("donor").then(data =>
        {
            const fname = data.firstname
            const cardNo = data.cardNumber
            const expiryNo = data.cardExpiry
            const cvvNo = data.cvv        
        
        this.forceCheck(or.paymentsPage.card)        
        this.type(or.paymentsPage.cardHolderName, fname)
        this.iframeInput(or.paymentsPage.frameCardNumber, or.paymentsPage.cardNumber, cardNo)
        this.iframeInput(or.paymentsPage.frameCardExpiration, or.paymentsPage.expiry, expiryNo)
        this.iframeInput(or.paymentsPage.frameCardCvv, or.paymentsPage.cvv, cvvNo)
        this.forceCheck(or.paymentsPage.optInGiftAided)
        this.minPause()
        this.forceClickContains(or.paymentsPage.completeBtn)
        this.maxPause()
        this.info("=====Payment Details entered successfully=====")
    })
    }
}

export default PaymentPage