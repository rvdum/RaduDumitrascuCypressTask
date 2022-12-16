
import HDWalletProvider from "@truffle/hdwallet-provider";
import {ethers} from "ethers";
import * as testData from "../fixtures/stored_values"

const CONNECT_TO_WALLET_FROM_SEND_PAGE = "[data-cy=connect-wallet-button]"
const RECEIVER_FIELD = "[data-cy=address-button]"
const ADDRESS_INPUT_FIELD = "[data-cy=address-dialog-input]"
const SELECT_TOKEN_BUTTON = "[data-cy=select-token-button]"
const TOKEN_SEARCH_FIELD = "[data-cy=token-search-input]"
const TOKEN_SELECTION_INPUT = ".MuiDialogContent-root > .MuiList-root"
const FLOW_RATE_INPUT = "[data-cy=flow-rate-input]"
const SEND_CARD = "[data-cy=send-card]"




export class SendPage {
    static visitWithMockedWallet(page) {
        cy.visit(page, {
            onBeforeLoad: (win) => {
                const hdwallet = new HDWalletProvider({
                    privateKeys: ["4096b4d75e5351653841c31068644742c63f947382461748c2b7823ca971c237"],
                    url: "https://rpc-endpoints.superfluid.dev/eth-goerli",
                    chainId: 5,
                    pollingInterval: 1000,
                });
                win.mockSigner = new ethers.providers.Web3Provider(hdwallet).getSigner();
            }
        })
    }

    // Making my life easier
    static click(selector) {
        cy.get(selector).click()
    }

    static type(selector, message) {
        cy.get(selector).type(message)
    }

// Making my life easier ^

    static connectToWalletFromSendPage() {
        this.click(CONNECT_TO_WALLET_FROM_SEND_PAGE)
    }

    static addReceiverAddress(text) {
        this.click(RECEIVER_FIELD)
        this.click(ADDRESS_INPUT_FIELD)
        this.type(ADDRESS_INPUT_FIELD, text)
    }

    static addFormDetails() {
        this.click(SELECT_TOKEN_BUTTON)
        const tokens = testData.token_list;
        const randomToken = tokens[Math.floor(Math.random() * testData.token_list.length)]

        this.type(TOKEN_SEARCH_FIELD, randomToken)
        this.click(TOKEN_SELECTION_INPUT)
        this.click(FLOW_RATE_INPUT)

        function generateNumber() {
            let randomInt = Math.floor((Math.random() * 100) + 1)
            return randomInt
        }
        let randomInt = generateNumber()
        this.type(FLOW_RATE_INPUT, randomInt)
    }

    static validateSendStreamToYourselfErrorMessage(message) {
        cy.get(SEND_CARD).contains(message).should("be.visible")
    }
}