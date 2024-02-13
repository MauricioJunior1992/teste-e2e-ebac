/// <reference types="cypress" />
const perfil = require('../../fixtures/perfil.json')
import produtosPage from '../../support/page-objects/produtos.page';


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    before(() => {
        //entrar em conta usando URL Base e Fixture
        cy.visit('minha-conta')
        cy.login(perfil.usuario, perfil.senha)
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        //escolher produto 'Ajax Full-Zip Sweatshit' usando lista
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('.product-block').eq(3).click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type('2')
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', '2 × “Ajax Full-Zip Sweatshirt” foram adicionados no seu carrinho.')

        //escolher produto 'Aether Gym Pant' com Page Objects
        produtosPage.buscarProduto('Aether Gym Pant')
        cy.get('.button-variable-item-33').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type(3)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', '3 × “Aether Gym Pant” foram adicionados no seu carrinho.')

        ///escolher produto 'Stellar Solar Jacket' com Page Objects e variáveis
        produtosPage.visitarProduto('Stellar Solar Jacket')
        var qnt = '5'
        var tamanho = 'M'
        var cor = 'Blue'

        cy.get('.button-variable-item-' + tamanho).click()
        cy.get('.button-variable-item-' + cor).click()
        cy.get('.input-text').clear().type(qnt)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', qnt + ' × “Stellar Solar Jacket” foram adicionados no seu carrinho.')

        //escolher produto 'Ariel Roll Sleeve Sweatshirt' com Comandos Customizados
        cy.addProduto('Ariel Roll Sleeve Sweatshirt', 'L', 'Purple', '4')
        cy.get('.woocommerce-message').should('contain', '4 × “Ariel Roll Sleeve Sweatshirt” foram adicionados no seu carrinho.')

        //preencher informações de checkout com Comandos Customizados
        cy.get('[class="mini-cart-items"]').click()
        cy.get('[class="button checkout wc-forward"]').eq(1).click()
        cy.preencherCheckout('Mauricio', 'Junior', 'Brasil', 'R. José da Silva', 'Sorocaba', 'São Paulo', '18056590', '01123456789')

        //finalizar a compra
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain','Obrigado. Seu pedido foi recebido.')
    });
})