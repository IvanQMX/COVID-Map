import React from 'react';
import NationalGraph from './NationalGraph';
import StateGraph from './StateGraph';
import Map from './Map';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedState: null,
            renderStateGraph: null
        }
        this.handleSelectedState = this.handleSelectedState.bind(this);
    }

    handleSelectedState(selectedState) {
        this.setState({
            selectedState,
        });
    }
    
    componentDidUpdate() {
        this.state.renderStateGraph =
            <div className="card bg-light">
                <div className="card-header text-center">
                    <h5>
                        Gráfica del Estado de&nbsp;
                        <span className="h5 text-secondary">{this.state.selectedState}</span>
                    </h5>
                </div>
                <div className="card-body">
                    <StateGraph selectedState={this.state.selectedState}/>
                </div>
            </div>
    }

    render() {
        if(this.state.selectedState === null) {
            this.state.renderStateGraph =
                <div className="card bg-light">
                    <div className="card-header text-center">
                        <h5 className="text-secondary">
                            Seleccione un estado del mapa
                        </h5>
                    </div>
                </div>
        }
        else {
            this.state.renderStateGraph =
                <div className="card bg-light">
                    <div className="card-header text-center">
                        <h5>
                            Gráfica del Estado de&nbsp;
                            <span className="h5 text-secondary">{this.state.selectedState}</span>
                        </h5>
                    </div>
                    <div className="card-body">
                        <StateGraph selectedState={this.state.selectedState}/>
                    </div>
                </div>
        }
        return(
            <div>
                <div className="container-fluid">
                    <div className="row justify-content-between">
                        <div className="col-md-12 mb-4">
                            <div className="card bg-light">
                                    <div className="card-header text-center">
                                        <h5>Estados de México con casos reportados del COVID-19</h5>
                                    </div>
                                    <div className="card-body">
                                        <Map onSelectedState={this.handleSelectedState}/>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-md-6 mb-4">
                            {this.state.renderStateGraph}
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card bg-light">
                                <div className="card-header text-center">
                                    <h5>Gráfica Nacional</h5>
                                </div>
                                <div className="card-body">
                                    <NationalGraph />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer mt-auto py-3 bg-dark">
                    <div className="container text-center">
                        <span className="text-white">Esta aplicación fue creada por: <strong>Reverse117</strong></span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;