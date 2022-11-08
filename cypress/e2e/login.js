/* eslint-disable spaced-comment */
/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Check the Login Functionality', () => {
  const emailTest = 'jomz.test@gmail.com'
  const passTest = '@cypressTestPass'

  beforeEach(() => {
    cy.visit('/')
    cy.get('.cc-btn').click()
    cy.get('.close-dialog').click()
    cy.get('#navbarAccount').click()
    cy.get('#navbarLoginButton').click()
  })

  it('Check system behavior when valid email id and password is entered', () => {
    cy.get('#email').type(emailTest)
    cy.get('#password').type(passTest)
    cy.get('#loginButton').click()

    cy.url().should('include', '/search')
  })

  it('Check system behavior when invalid email id and valid password is entered', () => {
    cy.get('#email').type(`x${emailTest}`)
    cy.get('#password').type(passTest)
    cy.get('#loginButton').click()

    cy.get('.error').should('contain', 'Invalid email or password.')
  })

  it('Check system behavior when valid email id and invalid password is entered', () => {
    cy.get('#email').type(emailTest)
    cy.get('#password').type(`x${passTest}`)
    cy.get('#loginButton').click()

    cy.get('.error').should('contain', 'Invalid email or password.')
  })

  it('Check system behavior when invalid email id and invalid password is entered', () => {
    cy.get('#email').type(`x${emailTest}`)
    cy.get('#password').type(`x${passTest}`)
    cy.get('#loginButton').click()

    cy.get('.error').should('contain', 'Invalid email or password.')
  })

  it('Check system behavior when email id and password are left blank and Sign in entered', () => {
    cy.get('#email').type(' ')
    cy.get('#password').type(' ')
    cy.get('#loginButton').click()

    cy.get('.error').should('contain', 'Invalid email or password.')
  })

  it('Check system behavior when "Remember me" is checked', () => {
    cy.get('#email').type(emailTest)
    cy.get('#password').type(passTest)
    cy.get('.mat-checkbox-inner-container').click()
    cy.get('input[type="checkbox"]').check({ force: true }).should('be.checked')

    cy.get('#loginButton').click()
  })

  it('Check Forgot your password is working as expected', () => {
    cy.get('a[routerlink="/forgot-password"]').contains('Forgot your password?').click({ force: true })
    cy.get('#email').type(emailTest)
    cy.get('#securityAnswer').type('Perez')
    cy.get('#newPassword').type(passTest)
    cy.get('#newPasswordRepeat').type(passTest) //remain old password

    cy.get('#resetButton').click({ force: true })

    cy.get('.confirmation').should('contain', 'Your password was successfully changed.')
  })

  it.only('Check system behavior when valid/invalid phone number and password is entered', () => {
    cy.get('a[routerlink="/forgot-password"]').contains('Forgot your password?').click({ force: true })
    cy.get('#email').type(`x${emailTest}`)
    cy.get('#securityAnswer').should('be.disabled')
    cy.get('#newPassword').should('be.disabled')
    cy.get('#newPasswordRepeat').should('be.disabled') //remain old password
    cy.get('#resetButton').should('be.disabled')

    //cy.get('.confirmation').should('contain', 'Your password was successfully changed.')
  })
})
