import React from 'react';
import '../../css/style.css';
import '../../scss/index.scss';


class App extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Edit
                        {' '}
                        <code>src/App.js</code>
                        {' '}
                        and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
