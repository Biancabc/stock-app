import React, {useEffect, useState} from 'react';
import './App.css';
import './Stock.css';
import {Line} from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";

export default function App() {
    const [symbol, setSymbol] = useState('');
    const [chartData, setData] = useState({});
    const [apiData, setApiData] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const {handleSubmit, control} = useForm();
    const [formError, setFormError] = useState('');
    const [dateError, setDateError] = useState('');
    const [clicked, setClick] = useState(false);

    const handleChange =  (e) =>{
        setSymbol(e.target.value);
    };

    const handleSubmitSymbol = (e) => {
        e.preventDefault();
        fetchApi();
    };

    const handleClick = () => {
        if (!clicked) {
            setClick(true);
        } else {
            setClick(false);
        }
    };

    function fetchApi() {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=5CIMSF66Q8D8J60O`)
            .then(function (response) {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status !== 200) {
                    return response.error();
                }
            })
            .then(function (data) {
                console.log(data)
                if (data['Error Message']) {
                    setFormError('Your symbol is incorrect. Please try another symbol!');
                } else {
                    setFormError('');
                }
                setApiData(data);
                let array_labels = [];
                let array_data = [];
                for (let key in data['Time Series (Daily)']) {
                    array_labels.push(key);
                    array_data.push(parseFloat(data['Time Series (Daily)'][key]['1. open']));
                }
                setData({
                    labels: array_labels,
                    datasets: [{
                        label: 'Stock Price ' + symbol,
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
                        data: array_data,
                    }]
                })
            })
    }

    function gatDate()
    {
        let result = [];
        if (startDate !== undefined && endDate !== undefined){
            let sd = new Date(startDate.toString());
            let res1 = '';
            let res2 = '';
            if (sd.getDate() < 10) {
                res1 = sd.getFullYear() + '-' + ("0" + (sd.getMonth() + 1)) + '-' + ('0' + sd.getDate());
            } else {
                res1 = sd.getFullYear() + '-' + ("0" + (sd.getMonth() + 1)) + '-' + (sd.getDate());
            }
            let ed = new Date(endDate.toString());

            if (ed.getDate() < 10) {
                res2 = ed.getFullYear() + '-' + ("0" + (ed.getMonth() + 1)) + '-' + ('0' + ed.getDate());
            } else {
                res2 = ed.getFullYear() + '-' + ("0" + (ed.getMonth() + 1)) + '-' + ed.getDate();
            }
            result.push(res1);
            result.push(res2);
            setDateError('');
        }else{
            setDateError('You must select an interval!');
        }
        return result;
    }

    function getTimeInterval() {
        let result = gatDate();
        let res1 = result[0];
        let res2 = result[1];
        let array_labels = [];
        let array_data = [];
        for (let it in apiData['Time Series (Daily)']) {
            if (res2 >= it && it >= res1) {
                array_labels.push(it);
                array_data.push(parseFloat(apiData['Time Series (Daily)'][it]['1. open']));
                console.log(array_labels)
            }
        }
        setData({
            labels: array_labels,
            datasets: [{
                label: 'Stock Price ' + symbol,
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
                data: array_data,
            }]
        })
    }

    function getAverage() {
        if (clicked === true) {
            let result = gatDate();
            let res1 = result[0];
            let res2 = result[1];
            let contor = 0;
            let sum = 0;
            let dataAvg = [];
            let array_labels = [];
            let array_data = [];

            for (let key in apiData['Time Series (Daily)']) {
                if (key <= res2 && key >= res1) {
                    array_labels.push(key);
                    console.log(array_labels);
                    array_data.push(parseFloat(apiData['Time Series (Daily)'][key]['1. open']));
                    sum += parseFloat(apiData['Time Series (Daily)'][key]['1. open']);
                    contor++;
                }
            }

            let avg = sum / contor;
            for (let i = 0; i < contor; i++) {
                dataAvg.push(avg);
            }
            setData({
                labels: array_labels,
                datasets: [{
                    label: 'Stock Price ' + symbol,
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
                    data: array_data,
                },
                    {
                        label: 'Average',
                        fill: false,
                        backgroundColor: 'rgba(61,192,76,0.4)',
                        borderColor: 'rgb(61,192,76)',
                        data: dataAvg,
                    }]
            });
        }
    }

    useEffect(() => {
        getTimeInterval();
    }, [startDate, endDate]);

    useEffect(() => {
        getAverage();
        setClick(false);
    }, [clicked, startDate, endDate]);

        return (
            <div className="stock">
                <div className="fixed">
                    <h1 id="title">Welcome to Stock Web App!</h1>
                </div>

                <div className="row">
                    <div className="col-8">
                        <div id="chart">
                            <Line data={chartData}/>
                            <button className={'btn btn-primary'} onClick={handleClick}>Calculate Average</button>
                        </div>
                    </div>
                    <div className="col-4">
                        <h4 className="symbol">First enter a symbol:</h4>
                        <form onSubmit={handleSubmitSymbol} id={"#exampleFormControlSelect1"}>
                            <input className={"form-control"} type='text' placeholder={"Enter a symbol"} value={symbol}
                                   onChange={handleChange} required/>
                            <p className="error"> {formError} </p>
                            <input type={'submit'} value={'Submit symbol'} className={"btn btn-primary"} />
                        </form>
                        <label id={'date'}>Customize your date:</label>
                        <form className={'form-date date'} onSubmit={handleSubmit(data => {
                            setStartDate(data['Start date']);
                            setEndDate(data['End date'])
                        })}>
                            <label>Start Date:</label>
                            <Controller
                                control={control}
                                name="Start date"
                                required
                                render={({onChange, onBlur, value}) => (
                                    <DatePicker
                                        dateFormat="yyyy-MM-dd"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        selected={value}
                                        isClearable
                                        minDate={new Date('2020-04-10')}
                                        maxDate={new Date()}
                                        showDisabledMonthNavigation
                                    />
                                )}
                        />
                            <label>End Date:</label>
                            <Controller
                                control={control}
                                name="End date"
                                required
                                render={({onChange, onBlur, value}) => (
                                    <DatePicker
                                        dateFormat="yyyy-MM-dd"
                                        isClearable
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        selected={value}
                                        minDate={new Date('2020-04-10')}
                                        maxDate={new Date()}
                                        showDisabledMonthNavigation
                                    />
                                )}
                            />
                            <input className={"btn btn-primary"} id='submit' type="submit" value={'Submit interval'}/>
                            <p className="error"> {dateError} </p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }



