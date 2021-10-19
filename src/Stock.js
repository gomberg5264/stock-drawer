import React from 'react' ;
import Plot from 'react-plotly.js'

class Stock extends React.Component { 
    /*
    The Stock object handles rendering charts 
    */

    constructor(props) {
        super(props) ; 
        this.state = { 
            x_values: [],
            y_values: []
        }
    }

    componentDidMount(){
        this.fetchStock() ; 
    }

    fetchStock(){
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
                    let temp_y_values = {} ;

                    console.log(data) ;

                    for(var key in data['Time Series (Daily)']){
                        temp_x_values.push(key) ;
                        temp_y_values.push(data['Time Series (Daily)'][key]['1. open']) ;
                    }
                    
                    instance.setState({
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
                  y: this.state.y_values,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {color: 'red'},
                }
              ]}
              layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
            />
          </div>
        )
    }
}

export default Stock;