import React from "react";
import {Line} from 'react-chartjs-2';
let chart = {
    labels: [],
    datasets: [
        {
            label:'',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }
    ]
};
class Stock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            axisX: [],
            axisY: [],
            inputSymbol: 'FB',
            chartData: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({inputSymbol: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.inputSymbol);
        event.preventDefault();
        this.fetchStock();
    }

    componentDidMount() {
        this.fetchStock();
    }

    fetchStock(){

        let title = '';
        const parent = this;
        const apiKey = '5CIMSF66Q8D8J60O';
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        let dataChart ={};
        let symbol = parent.state.inputSymbol;
        console.log(parent.state.inputSymbol);
        let apiCall = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`;
        console.log(apiCall);

        fetch(apiCall)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                // console.log(data, 'api data')
                let i = 0;
                    for (var key in data['Time Series (Daily)']) {
                        var dataArr = [];
                        // console.log(new Date(key))
                        // dataArr.push(key);
                        chart['labels'].push(key);
                        chart['datasets'][0]['data'].push(parseFloat(data['Time Series (Daily)'][key]['1. open']));
                        // dataArr.push(parseFloat(data['Time Series (Daily)'][key]['1. open']));
                        // chartDataComp.push(dataArr);
                    }
                    title ='Stock Price for '+ parent.state.inputSymbol;
                    chart['datasets'][0]['label']= title;
                    // parent.setState({chartData: chartDataComp});
                    console.log(dataChart);
                    parent.setState({
                        axisX: stockChartXValuesFunction,
                        axisY: stockChartYValuesFunction
                    }
                    );
                }
            )
    }

    render(){
        return (
            <div>
                <h4>Hellothere!</h4>
                <div id="chart" style={{width: "50%", margin: "20px 20px"}}>
                    <Line data={chart} />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.inputSymbol} onChange={this.handleChange.bind(this)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <h1>{this.state.inputSymbol}</h1>
            </div>
        );
    }
}

export default Stock;
