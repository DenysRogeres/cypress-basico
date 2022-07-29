/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  this.beforeEach(() => {
    cy.visit('./src/index.html')
  });

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Denys')
    cy.get('input[name="lastName"]').type('Rogeres')
    cy.get('#email').type('denys@gmail.com')
    cy.get('#phone').type('61991152553')
    cy.get('#open-text-area').type('Nao preciso de ajuda')
    cy.get('button[type=submit]').click()

    cy.get('.success').should('be.visible')
  })

  it('preenche os campos obrigatórios e envia o formulário com menos tempo', () => {
    cy.get('#firstName').type('Denys')
    cy.get('input[name="lastName"]').type('Rogeres')
    cy.get('#email').type('denys@gmail.com')
    cy.get('#phone').type('61991152553')
    cy.get('#open-text-area').type('Nao preciso de ajuda', {delat: 0})
    cy.get('button[type=submit]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Denys', {delay: 0})
    cy.get('#lastName').type('Rogeres', {delay: 0})
    cy.get('#email').type('denysgmail.com')
    cy.get('#phone').type('numero')
    cy.get('button[type=submit]').click()

    cy.get('.error').should('be.visible')
  })

  it.only('verifica campo telefone continua vazio quando preenchido com valor nao numerico', () => {
    cy.get('#phone')
      .type('teste')
      .should('have.value', '')
  })
})