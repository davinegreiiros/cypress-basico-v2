/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html');
    })
    it('Verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function () {
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

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Davi')
        cy.get('#lastName').type('Negreiros')
        cy.get('#email').type('davi.negreiiros36@gmail,com')
        cy.get('#open-text-area').type('Teste')

        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não-númericos', function () {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })
    //exercicio 04
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Davi')
        cy.get('#lastName').type('Negreiros')
        cy.get('#email').type('davi.negreiiros36@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //exercicio 05
    it('Preenche e limpa os campos nome, sobrenome, email e telefone ', function () {
        cy.get('#firstName').type('Davi').should('have.value', 'Davi').clear().should('have.value', '');
        cy.get('#lastName').type('Negreiros').should('have.value', 'Negreiros').clear().should('have.value', '');
        cy.get('#email').type('davi.negreiiros36@gmail.com').should('have.value', 'davi.negreiiros36@gmail.com').clear().should('have.value', '');
        cy.get('#phone').type('1234567890').should('have.value', '1234567890').clear().should('have.value', '');
    })

    //exercicio 06
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //exercicio 07
    it('Envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    //exercicio 08
   //mudar o comportamento de  cy.get('button[type="submit"]').click() para cy.contains('button', 'Enviar').click()
   

   //lesson 03 - Exercicio 
   it('Seleciona um produto YOUTUBE por seu texto', function (){
    cy.get('select').select('YouTube').should('have.value', 'youtube');
   })

   //Exercicio extra 01
   it('Seleciona um produto MENTORIA por seu texto', function (){
    cy.get('select').select('Mentoria').should('have.value', 'mentoria');
   })

   //Exercicio extra 02
   it('Seleciona um produto BLOG por seu texto', function (){
    cy.get('select').select('Blog').should('have.value', 'blog');
   })

   //Aula 04 - Inputs tipo RADIO | exercicio 
   it('Marca o tipo de atendimento "Feedback"', function (){
    cy.get('input[type="radio"]').last().check();
   })

   //Exercicio extra
   it('Marca cada tipo de atendimento', function (){
    cy.get('input[type="radio"]')
    .should('have.length', 3)  
    .each(function($radio){
    cy.wrap($radio).check();
    cy.wrap($radio).should('be.checked')
    })
   })

   //aula 05 - checkbox | exercicio
    it('Marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('input[type="checkbox"]')
    .check()
    .last()
    .uncheck()
    .should('not.be.checked');
   })

   //aula 06 | exercicio
   it('Seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should( function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    });
   })

    //exercicio extra 1
   it('Seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action:"drag-drop"})
    .should( function($input){
        expect($input[0].files[0].name).to.equal('example.json')
     });
    })

   //exercicio extra 2
   it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
     .selectFile('@sampleFile')
     .should( function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    });
   })

    //AULA 7 - exercicio 
    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function (){
        cy.get('#privacy a').should('have.attr', 'target', '_blank');
    })

      //exercicio extra 1
      it('Acessa a página da política de privacidade removendo o target e então clicando no lin', function (){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click();

        cy.contains('Talking About Testing').should('be.visible');
    })


    //aula 8 - exercicio - ajustar o view para mobile
    
})