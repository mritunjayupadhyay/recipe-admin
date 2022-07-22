import React from 'react';
import './home.scss';

function Home() {
    return (
        <div className="HomePage">
            <p>Home</p>
            <p>the process is {process.env.REACT_APP_API_KEY}</p>
        </div>
    );
}

export { Home };
