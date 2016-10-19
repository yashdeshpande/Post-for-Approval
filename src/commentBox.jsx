import React, {Component} from 'react';
import {connect} from 'react-redux';
import Comment from './comment.jsx';
import {addComment} from './actions.js';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

class CommentBox extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      comment: '',
      author: 'Legal Team',
      profilePic: 'img/dog.jpg'
    }
  }

  submit(comment){
    this.props.dispatchAddComment(this.props.contentId, _.assign({}, this.state));
    this.setState({comment: ''});
  }

  onSubmit(e) {
    e.preventDefault();
    this.submit(e);
  }

  render(){
    let _comments = this.props.comments.map(function (comm, index) {
        return (
          [<Comment
            key={index}
            index={index}
            author={comm.author}
            profilePic={comm.profilePic}
            comment={comm.comment}/>

          ,<Divider inset={true} />]
        );
    })
    return(
      <form onSubmit={this.onSubmit}>
          <List>
            <Subheader>{"Comments:"}</Subheader>
            {_comments}
          </List>
          <TextField
            hintText="Enter comment"
            multiLine={true}
            rows={2}
            fullWidth={true}
            name={"comment"}
            value={this.state.comment}
            onChange={ (e) => {
              this.setState({comment: e.target.value});
            }}
            onKeyPress={
              (e) => {
                if(e.key == "Enter" && !e.shiftKey){
                  e.preventDefault();
                  this.submit(e); // FIXME: should call onSubmit of parent form
                }
              }
            }
          />
      </form>
    );
  }
}

const mapStateToProps = (state) =>{
  return {}
}

const mapDispatchToProps = (dispatch) =>{
  return {
    dispatchAddComment: (contentId, comment) => {
      dispatch(addComment(contentId, comment));
    }
  }
}

CommentBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentBox);

export default CommentBox;
