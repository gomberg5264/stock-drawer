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
            ticker: '',
            x_values: [],
            y_values: {}
        }

        this.updateTicker = this.updateTicker.bind(this) ;
        this.submitTicker = this.submitTicker.bind(this) ;
    }

    componentDidMount(){
        this.fetchStock() ; 
    }

    fetchStock(){
        /*
        Fetches a stock 
        */
        const api_key = '6GK1I729285WW00D' ;
        const instance = this ;
        let request = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.state.ticker}&apikey=${api_key}` ;

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

                    for(var key in data['Time Series (Daily)']){
                        temp_x_values.push(key) ;
                        temp_y_values["open"].push(data['Time Series (Daily)'][key]['1. open']) ;
                        temp_y_values["high"].push(data['Time Series (Daily)'][key]['2. high']) ;
                        temp_y_values["low"].push(data['Time Series (Daily)'][key]['3. low']) ;
                        temp_y_values["close"].push(data['Time Series (Daily)'][key]['4. close']) ;
                    }
                    
                    instance.setState({
                        x_values: temp_x_values, 
                        y_values: temp_y_values 
                    }) ;
                }                
            )
    }

    updateTicker(event){
        this.setState({
            ticker: event.target.value
        }) ;
    }

    submitTicker(event){
        console.log(this.state) ;
        this.fetchStock() ; 
    }
    

    render(){
        return(
            <div>

            <br></br>

            <input 
                type="text" 
                value={this.state.ticker} 
                onChange={this.updateTicker}/>

            <button 
                type="button" 
                onClick={this.submitTicker}>Search</button>


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