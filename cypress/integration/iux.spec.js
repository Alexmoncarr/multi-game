describe('Pruebas de UI/UX', () => {
    it('UI-001: Verificar adaptación en móviles', () => {
        cy.viewport('iphone-6');
        cy.visit('/');
        cy.get('button').contains('Empezar').click(); // Reemplaza 'Empezar' con el texto del botón si es diferente
        cy.get('button').contains('Calculadora').click(); // Reemplaza 'Nombre del Juego' con el texto del botón del juego
        cy.get('#root > div').should('be.visible');
        cy.get('#root > div').should('have.css', 'width').then((width) => {
            // biome-ignore lint/style/useNumberNamespace: <explanation>
            const widthNumber = parseFloat(width);
            expect(widthNumber).to.be.lessThan(400);
        });
    });
});