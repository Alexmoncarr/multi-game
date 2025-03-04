describe('Pruebas de Rendimiento', () => {
    it('PERF-001: Medir tiempo de carga', () => {
        const start = performance.now();
        cy.visit('/');
        const end = performance.now();
        const loadTime = end - start;
        expect(loadTime).to.be.lessThan(2000);
    });
});