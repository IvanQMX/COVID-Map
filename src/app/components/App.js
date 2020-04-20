import React from 'react';
import NationalGraph from './NationalGraph';
import StateGraph from './StateGraph';
import Map from './Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faFire, faSquare } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/App.css';
import 'animate.css/animate.css';
import MapExample from '../img/MapExample.png';
import WatchDataChart from '../img/WatchDataChart.png';
import StateChart from '../img/StateChart.png';
import HideDataChart from '../img/HideDataChart.png';

const MySwal = withReactContent(Swal);
let renderStateGraph;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previousSelectedState: null,
            selectedState: null,
        }
        this.handleSelectedState = this.handleSelectedState.bind(this);
        this.infoButtonClicked = this.infoButtonClicked.bind(this);
    }

    handleSelectedState(selectedState) {
        this.setState((prevState, props) => {
            console.log()
            return {
                previousSelectedState: prevState.selectedState,
                selectedState
            }
        });
    }

    infoButtonClicked() {
        MySwal.fire({
            icon: 'question',
            title: 'Ayuda',
            html: <div>
                <h5 className="text-left">Mapa</h5>
                <p className="text-justify">El mapa muestra la información actual de cada estado, da click en un estado para ver su información</p>
                <img src={MapExample} alt="Mapa" className="img-thumbnail rounded mx-auto d-block"/>
                <p />
                <h5 className="text-left">Gráficas</h5>
                <p className="text-justify">Da click en un punto de la gráfica, para ver su información</p>
                <img src={WatchDataChart} alt="Mapa" className="img-thumbnail rounded mx-auto d-block"/>
                <p />
                <p className="text-justify">Si se deseas ver solo la gráfica de decesos da click en el recuadro azul</p>
                <img src={HideDataChart} alt="Mapa" className="img-thumbnail rounded mx-auto d-block"/>
                <p />
                <h5 className="text-left">Gráfica del Estado</h5>
                <p className="text-justify">La gráfica se muestra cuando selecciones un estado del mapa</p>
                <img src={StateChart} alt="Mapa" className="img-thumbnail rounded mx-auto d-block"/>
            </div>,
            showClass: {
                popup: 'animated fadeInDown faster'
            },
            hideClass: {
                popup: 'animated fadeOutUp faster'
            },
            showCloseButton: true
        })
    }

    render() {
        if(this.state.selectedState === null) {
            renderStateGraph =
                <div className="card bg-light">
                    <div className="card-header text-center">
                        <h5 className="text-secondary">
                            Seleccione un estado del mapa
                        </h5>
                    </div>
                </div>
        }
        else if (this.state.selectedState !== this.state.previousSelectedState) {
            renderStateGraph =
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
                                    <div className="card-footer">
                                        <div className="row justify-content-center">
                                            <h6>Numero de Casos Confirmados</h6>
                                        </div>
                                        <div className="row justify-content-around">
                                            <div className="col-auto mb-2">
                                                <FontAwesomeIcon icon={faSquare} size="2x" color="#9AC443" className="align-middle mr-2"/>
                                                <span className="font-weight-bolder">1-50</span>
                                            </div>
                                            <div className="col-auto mb-2">
                                                <FontAwesomeIcon icon={faSquare} size="2x" color="#61AA28" className="align-middle mr-2"/>
                                                <span className="font-weight-bolder">51-100</span>
                                            </div>
                                            <div className="col-auto mb-2">
                                                <FontAwesomeIcon icon={faSquare} size="2x" color="#F8AA28" className="align-middle mr-2"/>
                                                <span className="font-weight-bolder">101-250</span>
                                            </div>
                                            <div className="col-auto mb-2">
                                                <FontAwesomeIcon icon={faSquare} size="2x" color="#F15A24" className="align-middle mr-2"/>
                                                <span className="font-weight-bolder">251-500</span>
                                            </div>
                                            <div className="col-auto mb-2">
                                                <FontAwesomeIcon icon={faSquare} size="2x" color="#F3170C" className="align-middle mr-2"/>
                                                <span className="font-weight-bolder">501-1000</span>
                                            </div>
                                            <div className="col-auto mb-2">
                                                <FontAwesomeIcon icon={faSquare} size="2x" color="#910E07" className="align-middle mr-2"/>
                                                <span className="font-weight-bolder">1001-3000</span>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-md-6 mb-4">
                            {renderStateGraph}
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
                <div>
                    <button className="btn btn-info float" onClick={this.infoButtonClicked}>
                        <FontAwesomeIcon icon={faQuestion} />
                    </button>
                </div>
                <footer className="footer mt-auto py-3 bg-dark">
                    <div className="container text-center">
                        <span className="text-light">Esta aplicación fue creada por: </span>
                        <span className="text-warning"><FontAwesomeIcon icon={faFire} /></span>
                        <span className="text-danger"><strong>&nbsp;IQM&nbsp;</strong></span>
                        <span className="text-warning"><FontAwesomeIcon icon={faFire} /></span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;