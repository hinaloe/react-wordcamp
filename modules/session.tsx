/// <reference path="../typings/bundle.d.ts" />

// Load Reacts
import * as React from 'react';
import * as common from './common';


// Component
class Session extends React.Component<common.ItemProp<common.WordCampPost>, {}>{
    render() {
        return (
            <div>
                <h2 className="page-header">{this.props.post.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
                </div>
        );
    }
}

class SessionList extends React.Component<common.ListProp, {}> {
    render() {
        let sessionNodes = this.props.postData.map(function(post) {
            return (
                <Session post={post} key={post.ID}/ >
            );
        });
        return (
            <ul className="postList list-group">
                {sessionNodes}
                </ul>
        );
    };
}

export class SessionBox extends common.BaseBox<common.WordCampPost>{
    render() {
        return (
            <SessionList postData={this.state.data} />
        );
    }
}


