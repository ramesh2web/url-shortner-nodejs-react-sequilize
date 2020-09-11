import React from 'react';
import axios from '../axios';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      shorten_url: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const shortenServerBaseUrl = "http://localhost:5000/";
    axios.post('/shortUrl',{'long_url': this.state.value}).then(res=>{
         this.setState({shorten_url: shortenServerBaseUrl+res.data.short_url});
      this.setState({value: ''});
    })
  }

  render() {

    return(    <div className="container">
      <h2>Welcome to shortner.com</h2>
      <p>Please Enter Your url Here</p>
      <p> <input type="text" value={this.state.value} onChange={this.handleChange} /><button onClick={this.handleSubmit}>SHORTEN</button></p>
      <br>
      </br>
      <p>Here is your short URL</p>
      <p>{this.state.shorten_url }</p>
      </div>
      )
    
  }
}
export default Home
