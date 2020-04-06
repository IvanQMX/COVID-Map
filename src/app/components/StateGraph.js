import React from 'react';
import Chart from 'chart.js';
Chart.defaults.global.elements.point.radius = 5;
let myChart;

class StateGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateData: []
        }
        this.fetchStateData = this.fetchStateData.bind(this);
        this.createGraph = this.createGraph.bind(this);
    }

    chartRef = React.createRef();

    componentWillReceiveProps(nextProps) {
        myChart.destroy();
        this.fetchStateData(nextProps.selectedState);
    }

    fetchStateData(selectedState) {
        fetch(`/api/states/${selectedState}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    stateData: data
                });
                this.createGraph();
            })
            .catch(err => console.error(err));
    }

    createGraph() {
        const nationalConfirmedCases = this.state.stateData.map(data => data.confirmedCases);
        const nationalDeaths = this.state.stateData.map(data => data.deaths);
        const nationalDates = this.state.stateData.map(data => data.date);
        const ctx = this.chartRef.current;
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: nationalDates,
                datasets: [
                    {
                        label: 'Infectados',
                        data: nationalConfirmedCases,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2
                    },
                    {
                        label: 'Muertos',
                        data: nationalDeaths,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                title: {
                    display: false,
                },
                legend: {
                    display: true,
                    position: 'bottom'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                responsive: true
            }
        });
    }

    componentDidMount() {
        this.fetchStateData(this.props.selectedState);
    }

    render() {
        return(
            <div>
                <canvas id="myChart" ref={this.chartRef}></canvas>
            </div>
        )
    }
}

export default StateGraph;