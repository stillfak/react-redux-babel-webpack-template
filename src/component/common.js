import React from "react";
import "../css/style.css";
import "../scss/style.scss";


class App extends React.PureComponent {

    constructor(props) {
        super(props);
    }


    render() {
        const ob = JSONob.register[0];
        console.log(ob);
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
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
