class ProdutosPage {

    buscarProduto(nomeProduto){
        cy.get('[type="text"]').eq(1).type(nomeProduto)
        cy.get('[class="button-search btn btn-sm"]').eq(1).click()
    }
    
    visitarProduto(nomeProduto){
        const urlFormatada = nomeProduto.replace(/ /g, '-')
        cy.visit(`produto/${urlFormatada}`)
    }
}
export default new ProdutosPage()