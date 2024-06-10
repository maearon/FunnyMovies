/// <reference types="Cypress" />

it('signup and login user', () => {
  cy.visit('http://localhost:3000/signup')

  cy.get('input[name="name"]').type('Example User')
  cy.get('input[name="email"]').type('example@railstutorial.org')
  cy.get('input[name="password"]').type('foobar')
  cy.get('input[name="password_confirmation"]').type('foobar')
  cy.get('input[name="commit"]').click()
  // cy.get('#signup-button').click()

  cy.location('pathname').should('eq', '/signup')

  // cy.get('input[name="email"]').type('example@railstutorial.org')
  // cy.get('input[name="password"]').type('1234')
  // cy.get('#login-button').click()

  // cy.location('pathname').should('eq', '/board')
})