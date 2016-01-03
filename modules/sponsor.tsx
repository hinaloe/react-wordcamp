/// <reference path="../typings/bundle.d.ts" />

// Load Reacts
import * as React from 'react';
import * as common from './common';


// Component
class SponsorSite extends React.Component<{ data: { [key: string]: string }[] }, {}>{
    render() {
        return (
            <a href={this.props.data[0]['value']}>
                {this.props.data[0]['value']}
                </a>
        );
    }
};

class Sponsor extends React.Component<common.ItemProp<common.WordCampPost>, {}>{
    render() {
        let sponsorSite: string | JSX.Element = '';
        if (this.props.post.post_meta[0]) {
            sponsorSite = <SponsorSite data={this.props.post.post_meta} />;
        }
        return (
            <div>
                <h2 className="page-header">{this.props.post.title}</h2>
                <dl>
                    <dt>Sponsor Lebel</dt>
                    <dd>{this.props.post.terms["wcb_sponsor_level"][0].name}</dd>
                    <dt>Sponsor WebSite</dt>
                    <dd>{sponsorSite}</dd>
                    </dl>
                <div dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
                </div>
        );
    }
}

class SponsorList extends React.Component<common.ListProp, {}>{
    render() {
        let sponsorNodes = this.props.postData.map((post) => {
            return (
                <Sponsor post={post} key={post.ID}/ >
            );
        });
        return (
            <ul className="postList list-group">
                {sponsorNodes}
                </ul>
        );
    }
}

export class SponsorBox extends common.BaseBox<common.WordCampPost> {
    render() {
        return (
            <SponsorList postData={this.state.data} />
        );
    }
};


