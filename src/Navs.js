import React from 'react';

const Navs = ({ col, update }) => {
    return (
        <nav>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <br />
                <li>
                    <button className={col === 'ds' ? 'active' : ''} onClick={() => update('ds')}>
                        <span role="presentation">Ds</span>Design
                    </button>
                </li>
                <li>
                    <button className={col === 'dv' ? 'active' : ''} onClick={() => update('dv')}>
                        <span role="presentation">Dv</span>Develop
                    </button>
                </li>
                <li>
                    <button className={col === 'cr' ? 'active' : ''} onClick={() => update('cr')}>
                        <span role="presentation">Cr</span>Create
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navs;