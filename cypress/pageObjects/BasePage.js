import HDWalletProvider from "@truffle/hdwallet-provider";
import {ethers} from "ethers";

const NETWORK_SELECTION_BUTTON ="[data-cy=top-bar-network-button]"
const TESTNETS_LIST_BUTTON ="[data-cy=testnets-button]"
const GOERLI_BUTTON ="[data-cy=goerli-button]"
const CONNECT_WALLET_BUTTON_FROM_MAIN_PAGE = ".css-xhnfv3 > [data-cy=connect-wallet-button]"
const MOCK_WALLET = "[data-testid=rk-wallet-option-mock]"
const CONNECTED_MESSAGE = ".MuiTypography-body2"
const OPEN_CLAIM_SECTION = ".MuiListItemSecondaryAction-root > .MuiButtonBase-root"
const ERROR_MESSAGE_CLAIM_TOKENS = ".MuiAlert-message > .MuiTypography-root"

export class BasePage {

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

    static openNetworkSelectionMenu() {
        this.click(NETWORK_SELECTION_BUTTON)

    }

    static openTestnetsList() {
       this.click(TESTNETS_LIST_BUTTON)

    }

   static selectGoerliNetwork() {
        this.click(GOERLI_BUTTON)
    }

    static connectToWalletFromMainPage() {
        this.click(CONNECT_WALLET_BUTTON_FROM_MAIN_PAGE)
    }

    static selectMockWallet() {
        this.click(MOCK_WALLET)
        cy.get(CONNECTED_MESSAGE).should("be.visible")
    }

    static goToClaim() {
        this.click(OPEN_CLAIM_SECTION)
    }

    static attemptToClaimTokens() {
        cy.wait(5000)
        cy.get(".MuiDialogContent-root").contains("Claim").click()
    }

    static validateErrorMessage(message) {
        this.hasText(ERROR_MESSAGE_CLAIM_TOKENS,message)
    }
}

