import React from 'react';
import Chart from 'chart.js';

class NationalGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            national: []
        }
        this.fetchNationalData = this.fetchNationalData.bind(this);
        this.createGraph = this.createGraph.bind(this);
    }

    chartRef = React.createRef();

    createGraph() {
        const nationalConfirmedCases = this.state.national.map(data => data.confirmedCases);
        const nationalDeaths = this.state.national.map(data => data.deaths);
        const nationalDates = this.state.national.map(data => data.date);
        const ctx = this.chartRef.current;
        var myChart = new Chart(ctx, {
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

    fetchNationalData() {
        fetch('/api/national')
            .then(res => res.json())
            .then(data => {
                this.setState({ national: data });
                this.createGraph();
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchNationalData();
    }

    render() {
        return(
            <div>
                <canvas id="myChart" ref={this.chartRef}></canvas>
            </div>
        )
    }
}

export default NationalGraph;