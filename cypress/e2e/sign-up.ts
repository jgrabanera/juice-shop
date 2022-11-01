/// <reference types="cypress" />

describe('Sign Up Test', () => {
  let randomString = Math.random().toString(36).substring(2);
  //let username = `auto ${randomString}`;
  let emailTest = `auto-${randomString}@gmail.com`;
  let passTest = `autoPass${randomString}`;

  it('sign up validation', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.cc-btn').click();
    cy.get('.close-dialog').click();
    cy.get('#navbarAccount').click();
    cy.get('#navbarLoginButton').click();

    cy.get('#newCustomerLink').click();
    cy.url().should('include', '/register'); //assert url

    //registration
    cy.get('#emailControl').type(emailTest); //jomz.test@gmail.com
    cy.get('#passwordControl').type(passTest); //@cypressTestPass
    cy.get('#repeatPasswordControl').type(passTest);
    //dropdown
    cy.get('.mat-select-arrow-wrapper').click();
    cy.get('#mat-option-4 > .mat-option-text').contains("Mother's maiden name?").click();
    cy.get('#securityAnswerControl').type('Perez');
    cy.get('#registerButton').click();

    //successfull registration assertion
    cy.get('.mat-snack-bar-container').should('contain', 'Registration completed successfully. You can now log in.');
  });
});
