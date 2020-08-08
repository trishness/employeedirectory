import React, { Component } from 'react';
import axios from "axios"
import './App.css';
function EmployeeCard({ img, name, phone }) {
  return (
    <>
      <div>
        <img src={img} alt={name.first} />
        <div>
          <p>{`${name.title} ${name.first} ${name.last}`}</p>
          <p>{phone}</p>
        </div>
      </div>
    </>
  )
}
const styles={
  employeeContainer:{
    display:"flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
}
class App extends Component {
  state = {
    numInput: 0,
    users: []
  }
  handleInputChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  makeRequest = async () => {
    const URL = `https://randomuser.me/api/?results=${this.state.numInput}&nat=us`
    try {
      let results = await axios.get(URL)
      this.setState({ users: results.data.results })
      console.log(results)
    } catch (e) {
      console.log("Error:", e)
    }
  }
  renderEmployees = () => {
    return this.state.users.map(user => <EmployeeCard
      key={user.id.value}
      img={user.picture.large}
      name={user.name}
      phone={user.phone}
    />);
  }
  render() {
    const isNumberEntered = this.state.numInput === 0
    return (
      <div className="App">
        <h1>Fire&Vine Hospitality</h1>
        <label htmlFor="numInput"># of Employees
      <input
            id="numInput"
            name="numInput"
            type="number"
            value={this.state.numInput}
            min="0"
            onChange={this.handleInputChange}
          />
        </label>
        <button disabled={isNumberEntered} onClick={this.makeRequest} className="btn btn-primary">{isNumberEntered ? "Please Enter a Number" : "Submit"}</button>
        <div style={styles.employeeContainer}>
          {this.renderEmployees()}
        </div>
      </div>
    );
  }
}
export default App;