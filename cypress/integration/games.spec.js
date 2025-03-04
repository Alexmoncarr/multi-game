describe('Pruebas de Juegos', () => {
    it('GAME-001: Verificar inicio correcto del juego', () => {
        cy.visit('/');
        cy.get('button').contains('Empezar').click();
        cy.get('button').contains('Calculadora').should('be.visible');
        cy.get('button').contains('Tic-Tac-Toe').should('be.visible');
        cy.get('button').contains('Piedra, Papel, Tijera').should('be.visible');
        cy.get('button').contains('Adivina el Número').should('be.visible');
        cy.get('button').contains('Memoria').should('be.visible');
    });

    // it('GAME-002: Comprobar actualización de puntuación', () => {
    //     cy.visit('/');
    //     cy.get('button').contains('Empezar').click(); // Reemplaza 'Empezar' con el texto del botón si es diferente
    //     cy.get('button').contains('Nombre del Juego').click(); // Reemplaza 'Nombre del Juego' con el texto del botón del juego
    //     cy.get('button').contains('Iniciar Juego').click(); // Reemplaza 'Iniciar Juego' con el texto correcto
    //     // Simula acciones del juego para ganar puntos
    //     cy.get('.score').should('contain', 'Puntuación: 10'); // Reemplaza '.score' y 'Puntuación: 10' con los valores correctos
    // });
});