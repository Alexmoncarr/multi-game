describe('Pruebas de UI/UX', () => {
    it('UI-001: Verificar adaptación en móviles', () => {
        cy.viewport('iphone-6');
        cy.visit('/');
        cy.get('button').contains('Empezar').click();
        cy.get('button').contains('Calculadora').click();
        cy.get('#root > div').should('be.visible');
        cy.get('#root > div').should('have.css', 'width').then((width) => {
            const widthNumber = parseFloat(width);
            expect(widthNumber).to.be.lessThan(400);
        });
    });
});