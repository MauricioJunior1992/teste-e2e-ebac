
Cypress.Commands.add('login', (usuario, senha) => {
   cy.get('#username').type(usuario)
   cy.get('#password').type(senha, { log: false })
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

Cypress.Commands.add('preencherCheckout', (nome, sobrenome, pais, endereco, cidade, estado, cep, telefone) => {
   cy.get('#billing_first_name').clear().type(nome)
   cy.get('#billing_last_name').clear().type(sobrenome)
   cy.get('#select2-billing_country-container').click()
   cy.get('.select2-search__field').type(pais).type("{enter}")
   cy.get('#billing_address_1').clear().type(endereco)
   cy.get('#billing_city').clear().type(cidade)
   cy.get('#select2-billing_state-container').click()
   cy.get('.select2-search__field').type(estado).type("{enter}")
   cy.get('#billing_postcode').clear().type(cep)
   cy.get('#billing_phone').clear().type(telefone)
})
