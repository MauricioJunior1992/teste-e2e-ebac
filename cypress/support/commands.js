 
 Cypress.Commands.add('login', (usuario, senha) => { 
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
 })

 Cypress.Commands.add('addProduto', (nomeProduto, tamanho, cor, quantidade) => {
    cy.get('[type="text"]').eq(1).type(nomeProduto)
    cy.get('[class="button-search btn btn-sm"]').eq(1).click()
    cy.get('.button-variable-item-' + tamanho).click()
    cy.get('.button-variable-item-' + cor).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
 })
