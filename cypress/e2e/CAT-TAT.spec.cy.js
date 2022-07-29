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
    cy.get('#open-text-area').type('Nao preciso de ajuda', {delay: 0})
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

  it('verifica campo telefone continua vazio quando preenchido com valor nao numerico', () => {
    cy.get('#phone')
      .type('teste')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Denys')
    cy.get('#lastName').type('Rogeres')
    cy.get('#email').type('denys@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Não preciso de ajuda', {delay: 0})

    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
      
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Denys')
      .should('have.value', 'Denys')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Rogeres')
      .should('have.value', 'Rogeres')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('denys@gmail.com')
      .should('have.value', 'denys@gmail.com')
      .clear()
      .should('have.value', '')

  })
})