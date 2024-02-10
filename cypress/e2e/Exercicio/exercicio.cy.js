/// <reference types="cypress" />
const perfil = require('../../fixtures/perfil.json')
import { faker } from '@faker-js/faker'
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
        cy.visit('minha-conta')
        cy.login(perfil.usuario, perfil.senha)
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('.product-block').eq(3).click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type('2')
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain','2 × “Ajax Full-Zip Sweatshirt” foram adicionados no seu carrinho.')

        //escolher produto 'Aether Gym Pant', tamanho 33, cor marrom e 3 unidades
        var nomeProduto = 'Aether Gym Pant'

        produtosPage.buscarProduto(nomeProduto)
        cy.get('.button-variable-item-33').click()
        cy.get('.button-variable-item-Brown').click()
        cy.get('.input-text').clear().type(3)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain','3 × “Aether Gym Pant” foram adicionados no seu carrinho.')
    
        ///escolher produto 'Stellar Solar Jacket', tamanho M, cor Vermelha e 5 unidades
        produtosPage.visitarProduto('Stellar Solar Jacket')
        var qnt = '5'
        var tamanho = 'M'
        var cor = 'Red'

        cy.get('.button-variable-item-' + tamanho).click()
        cy.get('.button-variable-item-' + cor).click()
        cy.get('.input-text').clear().type(qnt)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', qnt + ' × “Stellar Solar Jacket” foram adicionados no seu carrinho.')
        
        //escolher produto 'Ariel Roll Sleeve Sweatshirt', tamanho L, cor Roxa e 4 unidades
        cy.addProduto('Ariel Roll Sleeve Sweatshirt','L','Purple','4')
        cy.get('.woocommerce-message').should('contain','4 × “Ariel Roll Sleeve Sweatshirt” foram adicionados no seu carrinho.')
    
        //preencher informações de checkout e finalizar a compra
        cy.get('[class="mini-cart-items"]').click()
        cy.get('[class="button checkout wc-forward"]').eq(1).click()

        let nome = faker.person.firstName()
        let sobrenome = faker.person.lastName()
        let pais = 'Brasil'
        let endereco = 'R José'
        let cidade = 'Sorocaba'
        let estado = 'São Paulo'
        let CEP = '18085745'
        let telefone = '12345678900'

        cy.get('#billing_first_name').clear().type(nome)
        cy.get('#billing_last_name').clear().type(sobrenome)
        cy.get('#select2-billing_country-container').click()
        cy.get('.select2-search__field').type(pais).type("{enter}")
        cy.get('#billing_address_1').clear().type(endereco)
        cy.get('#billing_city').clear().type(cidade)
        cy.get('#select2-billing_state-container').click()
        cy.get('.select2-search__field').type(estado).type("{enter}")
        cy.get('#billing_postcode').clear().type(CEP)
        cy.get('#billing_phone').clear().type(telefone)

        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain','Obrigado. Seu pedido foi recebido.')
    });
})