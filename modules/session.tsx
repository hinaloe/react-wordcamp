/// <reference path="../typings/bundle.d.ts" />

// Load Reacts
import * as React from 'react';


// Component
class Session extends React.Component<any, any>{
    render() {
        return (
            <div>
                <h2 className="page-header">{this.props.post.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
                </div>
        );
    }
}

class SessionList extends React.Component<any, any> {
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

export class SessionBox extends React.Component<any, any>{
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
            <SessionList postData={this.state.data} />
        );
    }
}


