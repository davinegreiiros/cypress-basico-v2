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

    it.only('Campo telefone continua vazio quando preenchido com valor não-númericos', function () {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })
    //exercicio 04
    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Davi')
        cy.get('#lastName').type('Negreiros')
        cy.get('#email').type('davi.negreiiros36@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    //exercicio 05
    it.only('Preenche e limpa os campos nome, sobrenome, email e telefone ', function () {
        cy.get('#firstName').type('Davi').should('have.value', 'Davi').clear().should('have.value', '');
        cy.get('#lastName').type('Negreiros').should('have.value', 'Negreiros').clear().should('have.value', '');
        cy.get('#email').type('davi.negreiiros36@gmail.com').should('have.value', 'davi.negreiiros36@gmail.com').clear().should('have.value', '');
        cy.get('#phone').type('123456789').should('have.value', '123456789').clear().should('have.value', '');

    })
})