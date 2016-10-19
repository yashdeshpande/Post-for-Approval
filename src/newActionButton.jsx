import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {approve, reject} from './actions.js';

class NewActionButton extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const rejectStyle= {
      marginTop: 5,
      marginBottom: 5,
      width: "50%",
      backgroundColor:"#f8f8f8",
      color:"#df725e"
    }
    const approveStyle= {
      marginTop: 5,
      marginBottom: 5,
      width: "50%",
      backgroundColor:"#f8f8f8",
      color:"#57b284"
    }
    return(
      <div>
        <FlatButton
          onClick={
            (e) => {
              this.props.dispatchReject(this.props.contentId);
            }
          }
          label={"Reject"}
          hoverColor={"#f9f9f9"}
          style={rejectStyle}
          />

        <FlatButton
          onClick={
            (e) => {
              this.props.dispatchApprove(this.props.contentId);
            }
          }
          label={"Approve"}
          hoverColor="#FFFFFF"
          style={approveStyle}
           />
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {}
}

const mapDispatchToProps = (dispatch) =>{
  return {
    dispatchApprove: (contentId) => {
      dispatch(approve(contentId));
    },
    dispatchReject: (contentId) => {
      dispatch(reject(contentId));
    }
  }
}


NewActionButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewActionButton);

export default NewActionButton;
