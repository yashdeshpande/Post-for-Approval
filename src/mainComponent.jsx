import React, {Component} from 'react';
import {connect} from 'react-redux';
import ContentCard from './contentCard.jsx';
import _ from 'lodash';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DateRange from 'material-ui/svg-icons/action/date-range';
import ViewModule from 'material-ui/svg-icons/action/view-module'
import DatePicker from 'material-ui/DatePicker';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Badge from 'material-ui/Badge'; //TODO: Use Badges for Number of posts display.
import Masonry from 'react-masonry-component';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

class MainComponent extends Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);

    this.state = {
      auth: false,
      errorText: '',
      date: '',
      curr: 'all',
      pin: 0,
      fb: 0,
      ln: 0,
      tw: 0,
      passwordValue: ''

    }
  }

  login(e){
    e.preventDefault();
    let password = this.state.passwordValue.trim();//e.target['password'].value.trim();
    if (password==='password'){
      this.setState(
        {
          auth:true
        });
    }
    else{
      this.setState(
        {
          errorText:'Please enter the correct credentials.'
        }
      )
    }
  }

  componentDidMount() {
    //console.log(this.props.store);
    let _pin = this.state.pin;
    let _fb = this.state.fb;
    let _ln = this.state.ln;
    let _tw = this.state.tw;
    let _date= new Date("2016-11-09");
    _date = _date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });

    _(this.props.store).forEach((content, index)=>{
        switch(content.channel){
          case 'pin':
            _pin++;
            break;
          case 'fb':
            _fb++;
            break;
          case 'ln':
            _ln++
            break;
          case 'tw':
            _tw++;
            break;
          default:
            break;
        }
    });
    this.setState({
      date: _date,
      pin: _pin,
      fb: _fb,
      ln: _ln,
      tw: _tw
    });
  }

  render() {
    let that = this;
    let _ContentList = this.props.store.map(function (content, index) {
        return (
          <ContentCard
            key={index}
            index={index}
            author={content.author}
            profilePic={content.profilePic}
            date={content.date}
            channel={content.channel}
            description={content.description}
            media={content.media}
            comments={content.comments}
            status={content.status} />
        );
    })
    let _filteredContentList = _ContentList.filter(function (content) {
        let _date = new Date(content.props.date);
        _date = _date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        });
        if(that.state.date != _date){
          return false;
        }
        if(that.state.curr == 'all') return true;
        if(that.state.curr == 'pin' && content.props.channel == 'pin') return true;
        if(that.state.curr == 'fb' && content.props.channel == 'fb') return true;
        if(that.state.curr == 'ln' && content.props.channel == 'ln') return true;
        if(that.state.curr == 'tw' && content.props.channel == 'tw') return true;
        return false;
    })

    const _dateStyle = {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0,
    }

    const _tabStyle = {
      backgroundColor: "#f9f9f9",
      width: 100,
      color: "#9c9f9d"
      //TODO: Add styles for tab elements
    }

    const _greyBackground = {
      backgroundColor: "#f9f9f9"

    }

    // _filteredContentList = _filteredContentList.map(function () {
    //
    // });
    if(!this.state.auth){
      return(


        <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} >
          <div >


          <Card style= {{width: 300, height: 300}}>
            <AppBar
              title={"Enter Login Details"}
              showMenuIconButton={false}
              style={{marginBottom:"30%"}}
              />
                <TextField
                  fullWidth={true}
                  errorText={this.state.errorText}
                  type={"password"}
                  value={this.state.passwordValue}
                  onChange={ (e) => {
                    this.setState({passwordValue: e.target.value});
                  }}>

                </TextField>

                <br></br>
                <br></br>
                <RaisedButton
                  label={"Sign In"}
                  onClick={this.login}
                  fullWidth={true}

                  ></RaisedButton>
          </Card>

          </div>
        </div>



        /*
        <form onSubmit={this.login}>
          <input type="password" name="password" placeholder="password" /><br/>
          <input type="submit" value="Login" />
        </form>*/
      );
    }
    else{
      return (
      <div style={{backgroundColor: "#e7e7e7"}}>
        <AppBar
          title={"Post for Approval"}
          showMenuIconButton={false}
          style={{backgroundColor: "#98d5bc"}}
          />
        <div className= {"container"}>
          <div className= {"row"} style={{marginTop: 50, marginBottom: 20}}>
            <div className = {"col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1"}>
            <Toolbar style = {_greyBackground}>
              <ToolbarGroup firstChild={true}>
                <FlatButton
                  label={this.state.date}
                  icon={<DateRange />}  >
                  <DatePicker
                    onChange={
                      (e, date) => {
                        let _date = new Date(date);
                        _date = _date.toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit'
                        });

                        this.setState({date: _date});
                      }
                    }
                    autoOk={true}
                    style={_dateStyle}
                    defaultDate={new Date("2016-11-09")}
                  />
              </FlatButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <Tabs inkBarStyle = {{backgroundColor: "#9c9f9d"}}>
                  <Tab
                    label = {"All " +'(' +this.props.store.length+')'}
                    onActive = {(e) => {
                      this.setState({curr: 'all'});
                    }}
                    style = {_tabStyle}

                  />
                  <Tab
                    label = {"LinkedIn " + '('+this.state.ln+')'}
                    onActive = {(e) => {
                      this.setState({curr: 'ln'});
                    }}
                    style = {_tabStyle}

                  />
                  <Tab
                    label = {"Facebook " + '('+this.state.fb+')'}
                    onActive = {(e) => {
                      this.setState({curr: 'fb'});
                    }}
                    style = {_tabStyle}

                  />
                  <Tab
                    label = {"Twitter " + '('+this.state.tw+')'}
                    onActive = {(e) => {
                      this.setState({curr: 'tw'});
                    }}
                    style = {_tabStyle}

                  />
                  <Tab
                    label = {"Pinterest " + '('+this.state.pin+')'}
                    onActive = {(e) => {
                      this.setState({curr: 'pin'});
                    }}
                    style = {_tabStyle}

                  />

                </Tabs>
              </ToolbarGroup>
            </Toolbar>
            </div>
          </div>
          <div className= {"row"}>
            <div className= {"col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1"}>
            <Masonry
              >
              {_filteredContentList}
            </Masonry>
            </div>
          </div>
        </div>
      </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return{
    store: state
  }
}

MainComponent = connect(
  mapStateToProps
)(MainComponent);

export default MainComponent;
