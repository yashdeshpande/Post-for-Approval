import React, {Component} from 'react';
import NewActionButton from './newActionButton.jsx';
import ApprovedActionButton from './approvedActionButton.jsx';
import RejectedActionButton from './rejectedActionButton.jsx';

class ActionFooter extends Component {
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.status == 'new'){
      return(
        <NewActionButton contentId={this.props.contentId} />
      );
    }
    else if(this.props.status == 'approved'){
      return(
        <ApprovedActionButton contentId={this.props.contentId} />
      );
    }
    else{
      return(
        <RejectedActionButton contentId={this.props.contentId} />
      );
    }
  }
}

export default ActionFooter;
