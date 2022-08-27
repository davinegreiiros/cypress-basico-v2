/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste teste teste testes teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste'
        cy.get('#firstName').type('Davi')
        cy.get('#lastName').type('Negreiros')
        cy.get('#email').type('davi.negreiiros36@gmail.com')
        cy.get('#open-text-area').type(longText, {
            delay: 0
        })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Davi')
        cy.get('#lastName').type('Negreiros')
        cy.get('#email').type('davi.negreiiros36@gmail,com')
        cy.get('#open-text-area').type('Teste')

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it.only('Campo telefone contin]ua vazio q]uando preenchido com valor não-númericos', function () {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })
})