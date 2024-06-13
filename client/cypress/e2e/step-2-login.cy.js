/// <reference types="Cypress" />

// const userSeed = require('../../server/seed/users')

context('User setup', () => {
  // beforeEach(() => {
  //   cy.task('clear:db')
  //   cy.task('seed:db', userSeed.data)
  // })

  it('login user', () => {
    cy.visit('http://localhost:3000/login')

    cy.loginWithUI('someone@gmail.com', 'foobar')

    cy.location('pathname').should('eq', '/')

    cy.get('input[name="commit"]').click()
    cy.wait(2000)
    // cy.get(`[aria-label="Go to next page"]`).click()
    // cy.wait(2000)
    // cy.get(`[aria-label="Go to last page"]`).click()
    // cy.wait(2000)
    // cy.get(`[aria-label="Go to previous page"]`).click()
    // cy.wait(2000)
    // cy.get(`[aria-label="Go to first page"]`).click()
  })
})
