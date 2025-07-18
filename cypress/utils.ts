export const selectOption = (selector:string, value:string, index?:number) =>{
    cy.get(selector).click({force: true});
    cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)').should('be.visible').find('.ant-select-item');
    cy.get('.rc-virtual-list-holder').eq(index || 0)
    //.scrollTo('bottom', {ensureScrollable: false}) // Scroll to bottom
    .get('.ant-select-item') // Target options
    .contains(value)
    .scrollIntoView() // Ensure visibility
    .click({force: true});

    //cy.get('.ant-select-dropdown').invoke('remove');
}