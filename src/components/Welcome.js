import React from 'react';


function Welcome({ onStart }) {
    return (
        <div className="welcome">
            <h1>Bienvenido a la Multi-Game App</h1>
            <p>Selecciona un juego para empezar a divertirte.</p>
            <button onClick={onStart}>Empezar</button>
        </div>
    );
}

export default Welcome;