import {luminance} from './index'

/**
* Command used to verify Text Readablity for the eye based on color contrast ratio
* @param {String} textLoactor 
* @param {String} backgroundLocator 
* @param {Number} threshold 
*/
Cypress.Commands.add('verifyTextReadablity', (textLoactor, backgroundLocator,threshold) => { 
    let L1 = null
    let L2 = null
  
    cy.get(textLoactor, { timeout: 7000 })
      .should('have.css', 'color').then((color) => {
        color = color.replace(/\s+/g, '')
        color = color.slice(4, -1)
        L1 = color.split(',')
        L1 = luminance(L1)
      })
  
    cy.get(backgroundLocator, { timeout: 7000 })
      .should('have.css', 'background-color').then((backgroundColor) => {
        backgroundColor = backgroundColor.replace(/\s+/g, '')
        backgroundColor = backgroundColor.slice(4, -1)
        L2 = backgroundColor.split(',')
        L2 = luminance(L2)
      })
  
    cy.then(() => {
      if (L1 < L2) {
        let temp = L2
  
        L2 = L1
        L1 = temp
      }
  
      let ratio = (L1 + 0.05) / (L2 + 0.05)
  
      cy.then(() => {
        if(threshold >= ratio){
          cy.log(threshold)
          cy.log(ratio)

         throw new Error(`Expected text with Locator: "${textLoactor}" to readable with the threshold greater than ${threshold} but value was ${ratio}`)
        }
      })
    })
 })
