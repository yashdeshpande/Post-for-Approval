import React, {Component} from 'react';
import CommentBox from './commentBox.jsx';
import ActionFooter from './actionFooter.jsx';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { SocialIcon } from 'react-social-icons';
import Avatar from 'material-ui/Avatar';

const getNetwork = (channel) => {
  switch (channel) {
    case 'fb':
      return 'facebook'
    case 'pin':
      return 'pinterest'
    case 'tw':
        return 'twitter';
    case 'ln':
      return 'linkedin'
    default:
      return ''

  }
}

class ContentCard extends Component {
  constructor(props){
    super(props);

  }

  componentDidMount() {
    // console.log("index: " + this.props.index);
  }

  render(){
    const style = {
      margin: 5,
      padding: 5
    };
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let _date = new Date(this.props.date);
    _date = _date.toLocaleString('en-US', options);


    return(
      <div className={"col-xs-4 col-sm-4 col-md-4 col-lg-4"} style={{marginTop:5, marginBottom:10}}>
        <Card>
          <div style={{float: "right", margin: 5}}>
            <SocialIcon network={getNetwork(this.props.channel)} style={{height:25,width:25}}></SocialIcon>
          </div>
          <div>
            <CardHeader
              title={this.props.author}
              subtitle={_date}
              avatar={<Avatar src={this.props.profilePic} size={60} />} />
            <CardText>
              {this.props.description}
            </CardText>
            <CardMedia>
              <img src={this.props.media} />
            </CardMedia>
            <Paper style={style} zDepth={0}>
              <CommentBox contentId={this.props.index} comments={this.props.comments} />
            </Paper>
            <CardActions>
              <ActionFooter contentId={this.props.index} status={this.props.status} />
            </CardActions>
          </div>
        </Card>
      </div>

    );

  }
}

export default ContentCard;
