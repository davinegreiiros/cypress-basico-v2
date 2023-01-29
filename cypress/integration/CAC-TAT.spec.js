/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html');
    })
    it('Verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('Preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste teste teste testes teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste'
        
        cy.get('#firstName').type('Davi')
        cy.get('#lastName').type('Negreiros')
        cy.get('#email').type('davi.negreiiros36@gmail.com')
        cy.get('#open-text-area').type(longText, {
            delay: 0
        })
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it.only('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Davi')
        cy.get('#lastName').type('Negreiros')
        cy.get('#email').type('davi.negreiiros36@gmail,com')
        cy.get('#open-text-area').type('Teste')

        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it.only('Campo telefone continua vazio quando preenchido com valor não-númericos', function () {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })
    //exercicio 04
    it.only('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Davi')
        cy.get('#lastName').type('Negreiros')
        cy.get('#email').type('davi.negreiiros36@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //exercicio 05
    it.only('Preenche e limpa os campos nome, sobrenome, email e telefone ', function () {
        cy.get('#firstName').type('Davi').should('have.value', 'Davi').clear().should('have.value', '');
        cy.get('#lastName').type('Negreiros').should('have.value', 'Negreiros').clear().should('have.value', '');
        cy.get('#email').type('davi.negreiiros36@gmail.com').should('have.value', 'davi.negreiiros36@gmail.com').clear().should('have.value', '');
        cy.get('#phone').type('1234567890').should('have.value', '1234567890').clear().should('have.value', '');
    })

    //exercicio 06
    it.only('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //exercicio 07
    it.only('Envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    //exercicio 08
   //mudar o comportamento de  cy.get('button[type="submit"]').click() para cy.contains('button', 'Enviar').click()
   



})