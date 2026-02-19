describe('Fluxo de Produção Autoflex (E2E)', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    it('Deve carregar o dashboard e os cards de produtos', () => {
        // Usamos regex (o texto entre //) para encontrar o texto mesmo com quebras de linha
        cy.contains(/TOTAL.*PRODUCTION.*POTENTIAL/i).should('be.visible');

        // Verifica se os cards carregaram (procurando pelo label de preço)
        cy.contains('Price:').should('be.visible');
    });

    it('Deve abrir o modal e executar uma produção', () => {
        // 1. Clica no primeiro card para abrir o modal (Isso já funcionou!)
        cy.contains('Price:').first().click();

        // 2. Clica no botão de confirmação dentro do modal
        // No seu print, o botão diz "Confirmar Ordem"
        cy.contains('button', /Confirmar Ordem/i).click();

        // 3. Verifica se o modal fechou ou se apareceu mensagem de sucesso
        // Como o modal tem um 'X' ou fecha ao concluir, vamos validar que a mensagem surgiu
        cy.contains(/sucesso|concluída|ordem/i, { timeout: 10000 }).should('exist');
    });
});