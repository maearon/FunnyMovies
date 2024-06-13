/// <reference types="Cypress" />


context('User setup', () => {
  beforeEach(() => {
    cy.task('clear:db')
  })

  it('signup and login user', () => {
    cy.visit('http://localhost:3000/signup')

    cy.get('input[name="email"]').type('example@railstutorial.org')
    cy.get('input[name="password"]').type('1234')
    cy.get('input[name="confirm-password"]').type('1234')
    cy.get('#signup-button').click()

    cy.location('pathname').should('eq', '/login')

    cy.get('input[name="email"]').type('example@railstutorial.org')
    cy.get('input[name="password"]').type('1234')
    cy.get('#login-button').click()

    cy.location('pathname').should('eq', '/board')
  })
})
