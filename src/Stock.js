import React from 'react' ;
import Plot from 'react-plotly.js'

class Stock extends React.Component { 
    /*
    The Stock object handles rendering charts 
    */

    constructor(props) {
        /*
        Initialize state of component 

        this.state.ticker = symbol/ticker representing the stock 
        this.state.x_values = list containing values for x-axis of chart, i.e. dates 
        this.state.y_values = dictionary containing lists, lists are: open, high, low, close 
        */
        super(props) ; 
        this.state = { 
            ticker: null,
            x_values: [],
            y_values: {}
        }
    }

    componentDidMount(){
        this.fetchStock() ; 
    }

    fetchStock(){
        /*
        Fetches a stock 
        */
        const ticker = 'IBM' ;
        const api_key = '6GK1I729285WW00D' ;
        const instance = this ;
        let request = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${api_key}` ;

        fetch(request)
            .then(
                function(response) {
                    return response.json() ; 
                }
            )
            .then(
                function(data){

                    let temp_x_values = [] ; 
                    let temp_y_values = {
                        "open": [], 
                        "high": [], 
                        "low": [], 
                        "close": []
                    } ;

                    console.log(data) ;

                    for(var key in data['Time Series (Daily)']){
                        temp_x_values.push(key) ;
                        temp_y_values["open"].push(data['Time Series (Daily)'][key]['1. open']) ;
                        temp_y_values["high"].push(data['Time Series (Daily)'][key]['2. high']) ;
                        temp_y_values["low"].push(data['Time Series (Daily)'][key]['3. low']) ;
                        temp_y_values["close"].push(data['Time Series (Daily)'][key]['4. close']) ;
                    }

                    console.log(temp_y_values) ;
                    
                    instance.setState({
                        ticker: ticker, 
                        x_values: temp_x_values, 
                        y_values: temp_y_values 
                    }) ;
                }                
            )
    }

    render(){
        return(
            <div>
            <h1>Stock Market</h1>
            <Plot
              data={[
                {
                  x: this.state.x_values,
                  open: this.state.y_values["open"],
                  high: this.state.y_values["high"],
                  low: this.state.y_values["low"],
                  close: this.state.y_values["close"],
                  type: 'candlestick',
                  mode: 'lines+markers',
                  marker: {color: 'red'},
                }
              ]}
              layout={{width: 720, height: 500, title: 'xD'}}
            />
          </div>
        )
    }
}

export default Stock;