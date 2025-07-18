import { selectOption } from "../utils";

describe('Registration Form Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Failed Case - Name Required', () => {
        //basic info
        cy.get('#firstName').type('Sky');

        selectOption('#birthYear', '2003');
        selectOption('#birthMonth', 'May');
        cy.get('#birthDay').type('2').type('{enter}');

        cy.get('#btnBasicInfoNext').click();
        cy.get('body').should('contain', 'Please input your last name');
    });

    it('Failed Case - Gender Required', () => {
        //basic info
        cy.get('#firstName').type('Sky');
        cy.get('#lastName').type('Wang');

        selectOption('#birthYear', '2003');
        selectOption('#birthMonth', 'May');
        cy.get('#birthDay').type('2').type('{enter}');

        cy.get('#btnBasicInfoNext').click();

        //detail
        cy.get('#country').type('ch', { force: true }).type('{enter}');
        cy.get('#btnDetailNext').click();
        cy.get('body').should('contain', 'Please select your gender');
    });

    it('Failed Case - Password', () => {
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
        cy.get('#confirmPassword').type('123456789', { force: true });
        cy.get('#btnAccountNext').click();
        cy.get('body').should('contain', 'Password is not the same');
    });
});