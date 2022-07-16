/**
 * this method is used to verify color contrast ratio between Background and forground
 * @param {Locator} selector
 * @param {number} threshold
 */
function verifyBackgroundForgroundColorRatio(selector, threshold){
    let L1 = null
    let L2 = null
  
    cy.get(selector, { timeout: 7000 })
      .should('have.css', 'color').then((color) => {
        color = color.replace(/\s+/g, '')
        color = color.slice(4, -1)
        L1 = color.split(',')
        L1 = luminance(L1)
      })
  
    cy.get(selector, { timeout: 7000 })
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
        expect(ratio).to.be.gte(threshold)
      })
    })

    console.log("hello")
  }
  

module.exports = verifyBackgroundForgroundColorRatio