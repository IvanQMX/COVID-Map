import React from 'react';
// Imports
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_dataCountries2 from "@amcharts/amcharts4-geodata/data/countries2";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isMobile } from 'react-device-detect';
let totalConfirmedCases = 0;

// Themes begin
am4core.useTheme(am4themes_animated);


class Map extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            states: []
        }
        this.fetchStatesData = this.fetchStatesData.bind(this);
        this.drawMap = this.drawMap.bind(this);
    }

    handleSelectState(stateName) {
        this.props.onSelectedState(stateName);
    }

    fetchStatesData() {
        fetch('/api/states')
            .then(res => res.json())
            .then(data => {
                this.setState({states: data});
                for(const datum of data){
                    totalConfirmedCases += datum.data[0].confirmedCases;                    
                }
                this.drawMap();
            })
            .catch(err => console.error(err))
    }

    async drawMap() {
        const states = this.state.states;
        // Create map instance
        let chart = am4core.create("chartdiv", am4maps.MapChart);

        // Set map definition
        chart.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/mexicoLow.json";
        chart.geodataSource.events.on("parseended", function (ev) {
            let data = [];
            let colorFill;
            for (var i = 0; i < ev.target.data.features.length; i++) {
                for (const state of states) {
                    if (state.name.toUpperCase() === ev.target.data.features[i].properties.name.toUpperCase()) {
                        if (state.data[0].confirmedCases < 51) {
                            colorFill = "#9AC443";
                        }
                        else if (state.data[0].confirmedCases < 101) {
                            colorFill = "#61AA28";
                        }
                        else if (state.data[0].confirmedCases < 251) {
                            colorFill = "#F8AA28";
                        }
                        else if (state.data[0].confirmedCases < 501) {
                            colorFill = "#F15A24";
                        }
                        else {
                            colorFill = "#910E07";
                        }
                        data.push({
                            id: ev.target.data.features[i].id,
                            fill: am4core.color(colorFill),
                            value: 50,
                            confirmedCases: state.data[0].confirmedCases,
                            negativeCases: state.data[0].negativeCases,
                            suspectedCases: state.data[0].suspectedCases,
                            deaths: state.data[0].deaths
                        });
                        break;
                    }
                }
            }
            polygonSeries.data = data;
        });
        
        // Set projection
        chart.projection = new am4maps.projections.Mercator();

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon data (state shapes and names) from GeoJSON
        polygonSeries.useGeodata = true;

        // // Configure series tooltip
        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipHTML = `<p><center><strong>{name}</strong></center></p>
        Casos Confirmados: {confirmedCases}<br>
        Casos Negativos: {negativeCases}<br>
        Casos Sospechosos: {suspectedCases}<br>
        Muertes: {deaths}<br>
        `;
        if (isMobile) {
            polygonTemplate.showTooltipOn = "hit";
        }
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.strokeWidth = 0.5;
        polygonTemplate.propertyFields.fill = "fill";
        polygonTemplate.events.on("hit", (ev) => {
            this.handleSelectState(ev.target.dataItem.dataContext.name);
        });

        // Container
        let container = new am4core.Container();
        container.parent = chart.chartContainer;
        container.layout = "vertical";
        container.align = "center";
        container.valign = "top";
        container.background.fill = am4core.color("#000");
        container.background.fillOpacity = 0.05;

        let totalCases = container.createChild(am4core.Label);
        totalCases.text = `[bold]Total de Casos Confirmados: ${totalConfirmedCases}[/]`;
    }

    componentDidMount() {
        this.fetchStatesData();
    }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

export default Map;