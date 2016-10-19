import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <ListItem
        leftAvatar={<Avatar src={this.props.profilePic} size={30} />}
        primaryText={this.props.author}
        secondaryText={
          <p style = {{wordWrap: "break-word"}}>
            {this.props.comment}
          </p>
        }
        secondaryTextLines={2}
      />
    );
  }
}

export default Comment;
