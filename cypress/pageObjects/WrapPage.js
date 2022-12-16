
import HDWalletProvider from "@truffle/hdwallet-provider";
import {ethers} from "ethers";

const CONNECT_WALLET_BUTTON_FROM_WRAP_PAGE = "[data-cy=connect-wallet-button]"
const TOKEN_SELECTION_MENU = "[data-cy=select-token-button]"
const TOKEN_SEARCH_FIELD = "[data-cy=token-search-input]"
const ETH_TOKEN = "[data-cy=ETH-list-item]"
const SELECT_MAX_AMOUNT = "[data-cy=max-button]"
const ERROR_MESSAGE_WRAP_MAX_ETH_AMOUNT = ".MuiAlert-message"
const TOKEN_BALANCE_INPUT_FIELD = "[data-cy=wrap-input] > .MuiInputBase-input"
const ERROR_MESSAGE_WRAP_AMOUNT_HIGHER_THAN_OWNED = ".MuiAlert-message"

export class WrapPage {
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

    static isVisible(selector) {
        cy.get(selector).should("be.visible")
    }

    static hasText(selector, text) {
        cy.get(selector).should('have.text', text).and('be.visible')
    }

    // Making my life easier ^
    static connectToWalletFromWrapPage() {
        this.click(CONNECT_WALLET_BUTTON_FROM_WRAP_PAGE)
    }

    static selectEthToken(text) {
        this.click(TOKEN_SELECTION_MENU)
        this.type(TOKEN_SEARCH_FIELD, text)
        this.click(ETH_TOKEN)
    }

    static validateErrorMessageWhenUsingMaxEthAmount(message) {
        cy.get(SELECT_MAX_AMOUNT).should("be.visible")
        this.click(SELECT_MAX_AMOUNT)
        this.hasText(ERROR_MESSAGE_WRAP_MAX_ETH_AMOUNT,message)
    }

    static inputLargerEthAmount() {
        function generateRandomFloat(min,max, places){
            let randomValue = (Math.random() * (max - min + 1)) + min;
            return Number.parseFloat(randomValue).toFixed(places)
        }
        let randomValue = generateRandomFloat(0.1, 100,2)
        this.click(TOKEN_BALANCE_INPUT_FIELD)
        this.type(TOKEN_BALANCE_INPUT_FIELD,randomValue)
    }

    static validateErrorMessageWhenUsingMoreEthThanOwned(message) {
        cy.get(ERROR_MESSAGE_WRAP_AMOUNT_HIGHER_THAN_OWNED).should("be.visible")
        this.hasText(ERROR_MESSAGE_WRAP_AMOUNT_HIGHER_THAN_OWNED, message)
    }
}