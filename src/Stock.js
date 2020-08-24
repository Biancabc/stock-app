import React from "react";
import './Stock.css';
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
            pointBackgroundColor: '#1c49ff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 20,
            data: [],
        }
    ]
};
class Stock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputSymbol: 'FB',
            selectedOption: 'default',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.change = this.change.bind(this);
    }

    handleChange(event) {
        this.setState({inputSymbol: event.target.value});
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.inputSymbol);
        event.preventDefault();
        this.fetchStock();
    }

    change(event){
        this.setState({selectedOption: event.target.value});
        this.fetchStock();
    }

    componentDidMount() {
        this.fetchStock();
    }

    fetchStock(){
        const parent = this;
        const apiKey = '5CIMSF66Q8D8J60O';
        let title = '';
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        let symbol = parent.state.inputSymbol;
        let apiCall = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`;
        let i = 0;
        // let contor = 0;

        fetch(apiCall)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    console.log(data);
                   if(parent.state.selectedOption === '10'){
                       i = 10;
                   } else if(parent.state.selectedOption === '50'){
                       i = 50;
                   } else if(parent.state.selectedOption === 'default'){
                       i = 100;
                   }
                    console.log(i);
                    // let dataArr = [];
                    // let dataArrVal = [];
                    for (var key in data['Time Series (Daily)']) {
                        // dataArr.push(key);
                        // dataArrVal.push(parseFloat(data['Time Series (Daily)'][key]['1. open']));
                        chart['labels'].push(key);
                        chart['datasets'][0]['data'].push(parseFloat(data['Time Series (Daily)'][key]['1. open']));
                    }
                    // for(let j =0; j<i; j++){
                    //     chart['labels'].push(dataArr[j]);
                    //     chart['datasets'][0]['data'].push(dataArrVal[j]);
                    // }

                    console.log(chart);

                    title ='Stock Price for '+ parent.state.inputSymbol;
                    chart['datasets'][0]['label']= title;

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
            <div className="stock">
                <div className="fixed">
                    <h1 id="title">Welcome to Stock Web App!</h1>
                </div>

                <div className="row">
                    <div className="col-8">
                        <div id="chart">
                            <Line data={chart} />
                        </div>
                    </div>

                    <div className="col-4">
                        <h4 className="symbol">Your stock symbol is: {this.state.inputSymbol}</h4>
                        <form  className="form" onSubmit={this.handleSubmit}>
                            <div  className="form">
                                <label>
                                    Enter another symbol:
                                </label>
                            </div>

                            <div className="form">
                                <input type="text"  className="form-control" placeholder="Symbol" onChange={this.handleChange.bind(this)} />
                            </div>

                            <p id="text" className="symbol"> Maybe you want to change the number of days</p>
                            <select className="form-control" id="exampleFormControlSelect1" onChange={this.change.bind(this)} value={this.state.selectedOption}>
                                <option value="default">Default</option>
                                <option value="10">10 days</option>
                                <option value="50">50 days</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stock;
