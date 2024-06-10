/// <reference types="Cypress" />

const userSeed = require('../../server/seed/users')

context('User setup', () => {
  beforeEach(() => {
    cy.task('clear:db')
    cy.task('seed:db', userSeed.data)
  })

  it('login user', () => {
    cy.visit('http://localhost:3000/login')

    cy.login('example@railstutorial.org', '1234')

    cy.location('pathname').should('eq', '/board')
  })
})
