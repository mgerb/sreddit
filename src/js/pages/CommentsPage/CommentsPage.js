import React from "react";
import { Link } from "react-router";
import WOW from 'wowjs/dist/wow.js';

import Loading from '../../components/Loading/Loading';
import Sidebar from '../../components/Sidebar/Sidebar';
import Comments from '../../components/Comments/Comments';
import RedditPost from '../../components/RedditPost/RedditPost';

import "./CommentsPage.scss";

export default class CommentsPage extends React.Component {
  
	constructor(){
    super();
    
    this.wow = new WOW({
                      boxClass:     'wow',      // default
                      animateClass: 'animated', // default
                      offset:       0,          // default
                      mobile:       true,       // default
                      live:         true        // default
                    });
    this.wow.init();
  }
  
	componentDidMount(){
		const actions = this.props.actions.comments;
    const params = this.props.params;
    
    const path = '/r/' + params.subreddit + '/comments/' + params.id + '/' + params.title;
    
    this.props.actions.subreddit.setSubreddit(this.props.params.subreddit);
    actions.fetchComments(path);
	}
	
	syncWow = () => {
    setTimeout(() => {
      this.wow.sync();
    }, 1);
  }
  
  render() {
    //copy props and actions for side bar
    const sideBarProps = Object.assign({}, this.props.app);
    const sideBarActions = Object.assign({}, this.props.actions.app);
    
    return (
      <div>
        <div class="container-fluid">
          <div class="row Subreddit-row ">
            <div class="col-md-10 Main-columns">
              {this.props.comments.fetched ? <RedditPost post={this.props.comments.post} theme={this.props.app.theme}/> : null}
              {this.props.comments.fetched ? <Comments comments={this.props.comments.comments} alt={false} theme={this.props.app.theme}/> : <Loading theme={this.props.app.theme}/>}
            </div>
            <div class="col-md-2 Main-columns">
              <Sidebar actions={sideBarActions} app={sideBarProps}/>
            </div>
          </div>
        </div>
        {this.props.comments.fetched ? this.syncWow() : ""}
      </div>
    );
  }
}