/// <reference path="../typings/bundle.d.ts" />

// Load Reacts
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CentralBox} from './central';
import * as common from './common';

// API URL
const apiUrl = 'https://central.wordcamp.org/wp-json/';
const centralApiUrl = 'https://central.wordcamp.org/wp-json/posts?type=wordcamp&filter[posts_per_page]=100';
const postUrl = apiUrl + 'posts';


// Component
class Post extends React.Component<any, any>{
    render() {
        return (
            <div>
                <h3 className="page-header">{this.props.post.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
                </div>
        );
    }
}

class PostList extends React.Component<any, any>{
    render() {
        let postNodes = this.props.postData.map((post: any) => {
            return (
                <Post post={post} key={post.ID}/ >
            );
        });
        return (
            <div className="postList">
                <h2 className="page-header">WordCamp Central Informations</h2>
                {postNodes}
                </div>
        );
    }
}

class PostBox extends common.BaseBox<common.WordCampPost>{
    render() {
        return (
            <PostList postData={this.state.data} />
        );
    }
}

// Render
ReactDOM.render(
    <PostBox apiUrl={postUrl}/>,
    document.getElementById('content')
);

ReactDOM.render(
    <CentralBox apiUrl={centralApiUrl}/>,
    document.getElementById('central')
);
