import {BasePage} from "../pageObjects/BasePage";
import {SendPage} from "../pageObjects/SendPage";
import {WrapPage} from "../pageObjects/WrapPage";

describe ("Send Page Tests", () => {

    it("Attempt to send and receive from the same wallet", () =>{
        SendPage.visitWithMockedWallet("/send")
        BasePage.openNetworkSelectionMenu()
        BasePage.openTestnetsList()
        BasePage.selectGoerliNetwork()
        SendPage.connectToWalletFromSendPage()
        BasePage.selectMockWallet()
        SendPage.addReceiverAddress("0xD92ea85056AB223a279Cd8dEf240cB4F0F7a24aa")
        SendPage.addFormDetails()
        SendPage.validateSendStreamToYourselfErrorMessage("You can't stream to yourself.")
    })
})
