import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {unmark} from './actions.js';

class ApprovedActionButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      label: "Approved"
    }
  }

  render(){
    return(
      <RaisedButton
        labelStyle={{color: "#FBFBFB"}}
        onClick={(e)=>{
          this.props.dispatchUnmark(this.props.contentId);
        }}
        onMouseOver={(e)=>{
          this.setState({label : "Undo Approve"});
        }}
        onMouseOut={(e)=>{
          this.setState({label : "Approved"});
        }}
        label={this.state.label}
        backgroundColor="#58c184"
        hoverColor="#f9f9f9"
        fullWidth={true} />


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


ApprovedActionButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApprovedActionButton);

export default ApprovedActionButton;
