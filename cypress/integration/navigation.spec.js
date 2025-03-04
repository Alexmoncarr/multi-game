/* eslint-disable no-undef */
describe('Pruebas de Navegación', () => {
    it('NAV-001: Comprobar que los botones de juegos funcionan', () => {
        cy.visit('/');
        cy.get('button').contains('Empezar').click(); // Reemplaza 'Empezar' con el texto del botón si es diferente
        cy.get('button').contains('Calculadora').click(); // Reemplaza 'Nombre del Juego' con el texto del botón del juego
        cy.get('#root > div').should('be.visible'); // Reemplaza '.game-container' con el selector correcto
    });

    it('NAV-002: Comprobar el botón "Volver al Home"', () => {
        cy.visit('/');
        cy.get('button').contains('Empezar').click(); // Reemplaza 'Empezar' con el texto del botón si es diferente
        cy.get('button').contains('Calculadora').click(); // Reemplaza 'Nombre del Juego' con el texto del botón del juego
        cy.get('button').contains('Back to Home').click(); // Reemplaza 'Volver al Home' con el texto correcto
        cy.get('#root > div').should('be.visible'); // Reemplaza '.home-container' con el selector correcto
    });
});