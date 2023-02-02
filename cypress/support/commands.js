Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Davi')
        cy.get('#lastName').type('Negreiros')
        cy.get('#email').type('davi.negreiiros36@gmail.com')
        cy.get('#open-text-area').type('Test')
       cy.contains('button', 'Enviar').click()
})