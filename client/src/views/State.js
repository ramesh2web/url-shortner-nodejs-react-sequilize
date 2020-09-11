import React from 'react';
import axios from '../axios';

class State extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      states: [
       
      ]
      };
  
  }
  componentDidMount(){
    axios.get('/shortUrl').then(res=>{
      this.setState({states:res.data});
     })
   

  }

  render() {
    return(    <div className="container">
    <h2>AnalyTics</h2>
    { this.state.states && this.state.states.map((data, index) => (
    <div className="row">
      <div className="col-12">
        <h2>Long Url: {data.long_url }</h2>
        <h5>Short Url: {'http://localhost:5000/'+data.short_url}</h5>
        <p>Total Clicks:{data.click} <span></span></p>
        <p>Top Countries: {data.top_countries}</p>
      </div>
    </div>
    ))}

  

    </div>
   
    )
  }
}
export default State
