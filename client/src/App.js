import React from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Link, 
    Switch 
} from 'react-router-dom';
import Home from './views/Home'; 
import State from './views/State'; 
import './App.css';

class App extends React.Component { 
    render() { 
      return ( 
         <Router> 
            <div className="App"> 
    <ul> 
      <li> 
        <Link to="/">Home</Link> 
      </li> 
      <li> 
        <Link to="/state">State</Link> 
      </li> 
      
    </ul> 
    <Switch> 
              <Route exact path='/' component={Home}></Route> 
              <Route exact path='/state' component={State}></Route>            
            </Switch> 
    </div>  
         </Router> 
     ); 
    } 
}
export default App;
