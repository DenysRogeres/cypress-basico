/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  this.beforeEach(() => {
    cy.visit('./src/index.html')
  });

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it.only('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock();

    cy.get('#firstName').type('Denys')
    cy.get('input[name="lastName"]').type('Rogeres')
    cy.get('#email').type('denys@gmail.com')
    cy.get('#phone').type('61991152553')
    cy.get('#open-text-area').type('Nao preciso de ajuda')
    cy.get('button[type=submit]').click()

    cy.get('.success').should('be.visible');

    cy.tick(3000);

    cy.get('.success').should('not.be.visible');

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
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Não preciso de ajuda', {delay: 0})
    cy.contains('button', 'Enviar').click()

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

      cy.get('#phone')
        .type('999996661')
        .should('have.value', '999996661')
        .clear()
        .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', ()=> {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select').select('Mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select').select('Blog').should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(($input) => {
          expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')

    cy.get('input[type="file"')
    .should('not.have.value')
    .selectFile('@sampleFile')
    .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.get('#title').should('be.visible', 'CAT TAT - Política de privacidade')
    cy.contains('Talking About Testing').should('be.visible')
  })
})