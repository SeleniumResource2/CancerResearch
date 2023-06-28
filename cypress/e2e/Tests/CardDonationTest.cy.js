import DonationPage from "../Pages/DonationPage"
import DetailsPage from "../Pages/DetailsPage"
import PaymentPage from "../Pages/PaymentPage"
import ThankyouPage from "../Pages/ThankyouPage"
import 'cypress-iframe'

describe("Donation validation for different types", () => {

  let value;
  const donationPg = new DonationPage()
  const detailsPg = new DetailsPage()
  const paymentPg = new PaymentPage()
  const thankYouPg = new ThankyouPage()
  const config = require("../../config.json")

  before(() => {
    cy.visit("https://app.pws.int.cruk.org/support-us/your-donation", { failOnStatusCode: false })
    cy.viewport(1600, 1200)
    cy.intercept('POST', 'https://api.pws.int.cruk.org/transaction').as('transaction')
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  it("Validation of Donation for Card Payment", () => {

    //Dontation page title validation
    cy.title().should('equal', config.homePageUrl)

    //Enter donation details with amount and type
    donationPg.donationDetails()

    //Details page title validation
    cy.url().should('equal', config.detailsPageUrl)

    //Enter address details of the donor
    detailsPg.addressDetails();
    detailsPg.navigateToNext();

    //Payment page title validation
    cy.url().should('equal', config.paymentsPageUrl)

    //Enter card details
    paymentPg.paymentByCardWithGiftAid()

    //Thank you page title validation
    cy.url().should('equal', config.thankYouPageUrl)

    //Validation of thank you message
    thankYouPg.thankYouMsg()

    //fetching reference id from thank you page
    thankYouPg.getGiftReferenece().then((text1) => {
      value = text1.text()
      expect(value).to.exist
    })

    //validation of reference id on thank you page with transaction api call
    cy.wait('@transaction').then(xhr => {
      console.log(xhr)
      //validation of status code
      expect(xhr.response.statusCode).to.equal(200)
      //validation of reference id
      expect(xhr.response.body.id).equal(value)
    })

  })
})