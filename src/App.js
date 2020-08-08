import React, { Component } from 'react';
import axios from "axios";
import './App.css';

function EmployeeCard(img, name, phone){
  return (
  <div>
    <img src={img} alt={name.first}/>
    <div>
      <p>{`${name.title} ${name.first} ${name.last}`}</p>
      <p>{phone}</p>
    </div>
  </div>
  )
}

const styles={
  empCOntainer:{
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"center"
  }
}

class App extends Component {

  state = {
    users:[],
    numInput: 0
  }

  handleInputChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]:value
    })
  }

  makeRequest = async ()=>{
    const URL = `https://randomuser.me/api/?results=${this.state.numInput}nat=us`;

    try{
      let results = await axios.get(URL);
      console.log(results.data.results);
      this.setState({ users:results.data.results });
      console.log(results)

    } catch(error){
      console.log("error: ", error)
    }
  }

  renderEmployees = () => {
    return this.state.users.map((user)=>(
    <EmployeeCard 
    key={user.id.value} 
    img={user.picture.large} 
    name={user.name} 
    phone={user.phone}
    />
  ));
  };

  render() {
    return (
      <div className="App">
        <h1>Employee Directory</h1>
        <label htmlFor="numInput">
          # of Employees
        <input 
          id="numInput" 
          name="numInput" 
          type="number" 
          value={this.state.numInput} 
          min="0" 
          onChange={this.handleInputChange}/>
        </label>
        <button disabled={this.state.numInput === 0} onClick={this.makeRequest}>Submit</button>

        <div style={styles.empContainer}>
          {this.renderEmployees()}
        </div>
      </div>
    );
  }
}

export default App;
