/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  this.beforeEach(() => {
    cy.visit('./src/index.html')
  });

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').click().type('Denys')
    cy.get('input[name="lastName"]').click().type('Rogeres')
    cy.get('#email').click().type('denys@gmail.com')
    cy.get('#phone').click().type('61991152553')
    cy.get('#open-text-area').click().type('Nao preciso de ajuda')
    cy.get('button[type=submit]').click()

    cy.get('.success').should('be.visible')
  })

})