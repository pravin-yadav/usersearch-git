import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
injectTapEventPlugin();


const styles = {
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
};

const style = {
  margin: 12,
};



class GitUser extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      list: [],
      value: '',
      result: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault();
    var username = this.state.value
    var _this = this
    this.serverRequest =
      axios
        .get('https://api.github.com/users/' + username + '/repos')
        .then(function (result) {
          _this.setState({
            list: result.data,
            result: 'data-received'
          })
        })
        .catch(function (error) {
          console.log(error);
          _this.setState({
            result: 'error'
          })
        });
  }

  render () { 


    const hasResult = this.state.result;
    let response = null;
    if (hasResult == 'data-received') {
      response = <h2>Valid User! Repositories List</h2>;
    } 
    if (hasResult == 'error') {
      response = <h3>No such User! Please, Check the username.</h3>;
    }
    return (
      <div>
      <h4 className="heading">Welcome, To the Github, Please Enter the user name.</h4>
 
        <form  className="textbox" onSubmit={this.handleSubmit}>
        
            <TextField 
              floatingLabelText="Enter your Github username"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              onChange={this.handleChange}
              ref='term'
            />

        
    
      <RaisedButton type='submit' value='Submit' label="Submit" secondary={true} style={style} />
          
            
         
        </form>
 {response}
        {this.state.list.map(function (repo) {
            return (
              <div key={repo.id}>
              <p className="repos">{repo.name}</p>
              </div>
            )  
          })
        }
      </div>
    )
  }
}

export default GitUser;