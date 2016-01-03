/// <reference path="../typings/bundle.d.ts" />

// Load Reacts
import * as React from 'react';
import * as common from './common';


// Component
class Speaker extends React.Component<common.ItemProp<common.WordCampPost>, {}>{
    render() {
        return (
            <div>
                <h2 className="page-header">{this.props.post.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
                </div>
        );
    }
};

class SpeakerList extends React.Component<common.ListProp, {}>{
    render() {
        let speakerNodes = this.props.postData.map(function(post) {
            return (
                <Speaker post={post} key={post.ID}/ >
            );
        });
        return (
            <ul className="postList list-group">
                {speakerNodes}
                </ul>
        );
    }
}

export class SpeakerBox extends common.BaseBox<common.WordCampPost> {
    render() {
        return (
            <SpeakerList postData={this.state.data} />
        );
    }
};


