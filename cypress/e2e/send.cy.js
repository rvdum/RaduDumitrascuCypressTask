import {BasePage} from "../pageObjects/BasePage";
import {SendPage} from "../pageObjects/SendPage";
import * as testData from "../fixtures/stored_values"

describe ("Send Page Tests", () => {

    it("Attempt to send and receive from the same wallet", () =>{
        SendPage.visitWithMockedWallet("/send")
        BasePage.openNetworkSelectionMenu()
        BasePage.openTestnetsList()
        BasePage.selectGoerliNetwork()
        SendPage.connectToWalletFromSendPage()
        BasePage.selectMockWallet()
        SendPage.addReceiverAddress(testData.receiver_address)
        SendPage.addFormDetails()
        SendPage.validateSendStreamToYourselfErrorMessage("You can't stream to yourself.")
    })
})
