/// <reference path="../typings/bundle.d.ts" />

// Load Reacts
import * as React from 'react';


// Component
class Speaker extends React.Component<any, any>{
    render() {
        return (
            <div>
                <h2 className="page-header">{this.props.post.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
                </div>
        );
    }
};

class SpeakerList extends React.Component<any, any>{
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

export class SpeakerBox extends React.Component<any, any>{
    loadPostsFromServer() {
        $.ajax({
            url: this.props.apiUrl,
            dataType: 'json',
            cache: false,

        })
            .then((data) => {
                this.setState({ data: data })
            })
            .fail((xhr, status, err) => {
                console.error(this.props.url, status, err.toString());

            })
    };
    state: any = {
        data: []

    };
    componentDidMount() {
        this.loadPostsFromServer();
    };
    render() {
        return (
            <SpeakerList postData={this.state.data} />
        );
    }
};


