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

  it.only('preenche os campos obrigatórios e envia o formulário com menos tempo', () => {
    cy.get('#firstName').type('Denys')
    cy.get('input[name="lastName"]').type('Rogeres')
    cy.get('#email').type('denys@gmail.com')
    cy.get('#phone').type('61991152553')
    cy.get('#open-text-area').type('Nao preciso de ajuda', {delat: 0})
    cy.get('button[type=submit]').click()

    cy.get('.success').should('be.visible')
  })

})