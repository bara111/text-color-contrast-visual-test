
describe('Testing text visual "verifyTextReadablity" command ', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo')
  })

  it('verify that Todo header text is visual to the eye with threshhold of "5"', () => {
    cy.verifyTextReadablity("h1","body",10)
  })
})
