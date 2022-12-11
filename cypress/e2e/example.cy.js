import {BasePage} from "../pageObjects/BasePage";

describe('Add your test cases here', () => {
  it('Example use of the mocked visit function', () => {
    //To get a wallet connected during the test cases , use visitWithMockedWallet() function instead of normal cy.visit()
    //Otherwise you won't be able to automate the steps or see the error messages
    BasePage.visitWithMockedWallet("/")
  })
})