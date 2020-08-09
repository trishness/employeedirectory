import React, { Component } from 'react';
import axios from "axios"
import './App.css';

function EmployeeCard({ img, name, phone, email }) {
  return (
    <>
      <div>
        <img src={img} alt={name.first} />
        <div>
          <p>{`${name.first} ${name.last}`}</p>
          <p>{phone}</p>
          <p>{email}</p>
        </div>
      </div>
    </>
  )
}

const styles={
  employeeContainer:{
    display:"flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  header:{
    background:"#66CDAA",
    color:"#FFFAFA"
  },
  label: {
    margin:"2.0rem"
  },
  button:{
    display:"flex",
    justifyContent: "space-around",
    margin:"4.0rem"
  }
}

class App extends Component {

  state = {
    numInput: 0,
    users: [],
    filteredUsers: []
  }

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  makeRequest = async () => {
    const URL = `https://randomuser.me/api/?results=${this.state.numInput}&nat=us`
    try {
      let results = await axios.get(URL)
      this.setState({ 
        users: results.data.results,
        filteredUsers: results.data.results,
      })
      console.log(results)
    } catch (e) {
      console.log("Error:", e)
    }
  }

  filterFemaleEmployees = () => {
    const usersCopy = [...this.state.users]
    const filteredUsers = usersCopy.filter((user) => user.gender==="female")
    this.setState({filteredUsers:filteredUsers})
  }

  filterMaleEmployees = () => {
    const usersCopy = [...this.state.users]
    const filteredUsers = usersCopy.filter((user) => user.gender==="male")
    this.setState({filteredUsers:filteredUsers})
  }

  sortABC = () => {
    const usersCopy = [...this.state.users]
    const sortedUsers = usersCopy.sort((a,b) => {
      if (a.name.last < b.name.last) {
        return -1
      } else {
        return 1
      }
    })
    this.setState({filteredUsers:sortedUsers})
  }

  renderEmployees = () => {
    return this.state.filteredUsers.map(user => <EmployeeCard
      key={user.id.value}
      img={user.picture.large}
      name={user.name}
      phone={user.phone}
      email={user.email}
    />);
  }

  render() {
    const isNumberEntered = this.state.numInput === 0
    return (
      <div className="App">
        <h1 style={styles.header} className="jumbotron jumbotron-fluid">Fire&Vine Hospitality</h1>
        <br></br>
        <br></br>
        <label style={{fontWeight:"bold"}} htmlFor="numInput"># of Employees
      <input style={{marginLeft:"1rem"}}
            id="numInput"
            name="numInput"
            type="number"
            value={this.state.numInput}
            min="0"
            onChange={this.handleInputChange}
          />
          <button style={{margin:"1rem"}} disabled={isNumberEntered} onClick={this.makeRequest} className="btn btn-secondary">{isNumberEntered ? "Please Enter a Number" : "Submit"}</button>
        </label>
        <div style={styles.button}>
        <button onClick={this.filterFemaleEmployees} className="btn btn-secondary">Filter by Females</button>
        <button onClick={this.filterMaleEmployees} className="btn btn-secondary">Filter by Males</button>
        <button onClick={this.sortABC} className="btn btn-secondary">Sort Alphabetically</button>
        </div>
        <div style={styles.employeeContainer}>
          {this.renderEmployees()}
        </div>
      </div>
    );
  }
}
export default App;