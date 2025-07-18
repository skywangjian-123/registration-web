import { selectOption } from "../utils";

describe('Registration Form Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Normal Process', () => {
        //basic info
        cy.get('#firstName').type('Sky');
        cy.get('#lastName').type('Wang');

        selectOption('#birthYear', '2003');
        selectOption('#birthMonth', 'May');
        cy.get('#birthDay').type('2').type('{enter}');

        cy.get('#btnBasicInfoNext').click();

        //detail
        cy.get('#country').type('ch', { force: true }).type('{enter}');
        cy.get('#gender').type('f', { force: true }).type('{enter}');
        cy.get('#btnDetailNext').click();

        //account
        cy.get('#email').type('skywangjian123@126.com', { force: true });
        cy.get('#password').type('12345678', { force: true });
        cy.get('#confirmPassword').type('12345678', { force: true });
        cy.get('#btnAccountNext').click();

        //confirmation
        cy.get('body').should('contain', 'Name:Wang Sky');
        cy.get('body').should('contain', 'Birthday:2003-05-02');
        cy.get('body').should('contain', 'Country:China');
        cy.get('body').should('contain', 'Gender:Female');
        cy.get('body').should('contain', 'Email Address:skywangjian123@126.com');
        cy.get('body').should('contain', 'Password:••••••••');

        //submit
        cy.get('#btnSubmit').click();
        cy.get('body').should('contain', 'Submit Successfully');
    });
});