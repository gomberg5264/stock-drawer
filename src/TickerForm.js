import React from 'react' ;

class TickerForm extends React.Component { 
    // This component handles user options

    constructor(props){
        super(props) ;
        this.state = {value: ''} ; 

        this.handleChange = this.handleChange.bind(this) ; 
        this.handleSubmit = this.handleSubmit.bind(this) ;
    }
}

export default TickerForm;