import {BasePage} from "../pageObjects/BasePage";

describe("Cypress Task Test Cases", () => {

  it("Access the webpage and Select the Goerli network", () => {
    //To get a wallet connected during the test cases , use visitWithMockedWallet() function instead of normal cy.visit()
    //Otherwise you won't be able to automate the steps or see the error messages
    BasePage.visitWithMockedWallet("/")
    BasePage.openNetworkSelectionMenu()
    BasePage.openTestnetsList()
    BasePage.selectGoerliNetwork()
  })

  it("Connect to the Mock wallet", () => {
    BasePage.visitWithMockedWallet("/")
    BasePage.openNetworkSelectionMenu()
    BasePage.openTestnetsList()
    BasePage.selectGoerliNetwork()
    BasePage.connectToWalletFromMainPage()
    BasePage.selectMockWallet()

  })
  it ("Attempt to Claim Tokens from the Dashboard and validate error message", () => {
    BasePage.visitWithMockedWallet("/")
    BasePage.openNetworkSelectionMenu()
    BasePage.openTestnetsList()
    BasePage.selectGoerliNetwork()
    BasePage.connectToWalletFromMainPage()
    BasePage.selectMockWallet()
    BasePage.goToClaim()
    BasePage.attemptToClaimTokens()
    BasePage.validateErrorMessage("Something went wrong, please try again")
  })
})