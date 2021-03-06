import React from 'react';
import Project from './project/index';
import firebase from 'firebase';

let Settings = React.createClass({
  getInitialState: function () {
    return {
      loaderStyle: ''
    }
  },
  componentWillMount: function () {
    let that = this;
    firebase.database().ref('projectList').once('value', function() {
      that.setState({loaderStyle: 'none'})
    });
  },
  render() {
    let loaderStyle = {
      display: this.state.loaderStyle
    };
    return (
      <div className="PageWrapper">
        <h3 className="pageHeading">Organizacja projektów</h3>
        <Project />

	      <div className="overlay" style={loaderStyle}></div>
        <div className="loader" style={loaderStyle}>
          <div className="wrap">
            <div className="loading outer">
              <div className="loading inner"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Settings;