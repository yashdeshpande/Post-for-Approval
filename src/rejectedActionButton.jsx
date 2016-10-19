import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {unmark} from './actions.js';

class RejectedActionButton extends Component{
  constructor(props){
    super(props);
    this.state ={
      label: "Marked as Rejected"
    }
  }

  render(){
    return(
      <RaisedButton
        onClick={(e)=>{
          this.props.dispatchUnmark(this.props.contentId);
        }}
        label={this.state.label}
        backgroundColor="#f8f8f8"
        fullWidth={true}
        labelStyle={{color: "#df725e"}}
        hoverColor="#f9f9f9"
        onMouseOver={(e)=>{
          this.setState({label : "Undo Reject"});
        }}
        onMouseOut={(e)=>{
          this.setState({label : "Marked as Rejected"});
        }} />

    );
  }
}

const mapStateToProps = (state) =>{
  return {}
}

const mapDispatchToProps = (dispatch) =>{
  return {
    dispatchUnmark: (contentId) => {
      dispatch(unmark(contentId));
    }
  }
}


RejectedActionButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(RejectedActionButton);

export default RejectedActionButton;
