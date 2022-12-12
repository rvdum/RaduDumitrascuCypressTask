import {WrapPage} from "../pageObjects/WrapPage";
import {BasePage} from "../pageObjects/BasePage";

describe ("Wrap Page Tests", () => {

    it("Running the initial setup", () =>{
        BasePage.visitWithMockedWallet("/")
        BasePage.openNetworkSelectionMenu()
        BasePage.openTestnetsList()
        BasePage.selectGoerliNetwork()
        WrapPage.connectToWalletFromWrapPage()
        BasePage.selectMockWallet()
})
    it("Attempt to use the max button with ETH as the selected token and validate the error message", () =>{
        WrapPage.visitWithMockedWallet("/wrap?upgrade")
        BasePage.openNetworkSelectionMenu()
        BasePage.openTestnetsList()
        BasePage.selectGoerliNetwork()
        WrapPage.connectToWalletFromWrapPage()
        BasePage.selectMockWallet()
        WrapPage.selectEthToken()
        WrapPage.validateErrorMessageWhenUsingMaxEthAmount("You are wrapping out of native asset used for gas. You need to leave some gas tokens for the transaction to succeed.")
    })
    })


