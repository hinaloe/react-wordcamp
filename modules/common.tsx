import * as React from 'react';


export interface BoxState<P> {
    data: P[]
}

export interface BoxProp {
    apiUrl: string;
}

export interface ListProp {
    postData: WordCampPost[]
}

export interface ItemProp<P extends WordCampPost> {
    key: number;
    post: P | WordCampPost;
}


export interface WordCampPost {
    ID: number;
    title: string;
    status: string;
    type: string;
    author: WordCampAuthor;
    content: string;
    parent?: any;
    link: string;
    date: string;
    modified: string;
    format: string;
    slug: string;
    guid: string;
    excerpt: string;
    menu_order: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    date_tz: string;
    date_gmt: string;
    modified_tz: string;
    modified_gmt: string;
    meta: { [X: string]: any };
    terms: { [X: string]: WordCampTerm[] };
    post_meta: any[];

}

export interface WordCampAuthor {
    ID: number;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    nickname: string;
    slug: string;
    URL: string;
    avatar: string; description: string;
    registered: string;
    meta: { [X: string]: any }
}

export interface WordCampTerm {
    ID: number;
    name: string;
    slug: string;
    description: string;
    taxonomy: string;
    parent?: any;
    count: number;
    link: string;
    meta: { [X: string]: any }
}


export class BaseBox<P extends WordCampPost> extends React.Component<BoxProp, BoxState<P>> {
    loadPostsFromServer() {
        $.ajax({
            url: this.props.apiUrl,
            dataType: 'json',
            cache: false,

        })
            .then((data: P[]) => {
                this.setState({ data: data })
            })
            .fail((xhr: JQueryXHR, status: string, err: ErrorConstructor) => {
                console.error(this.props.apiUrl, status, err.toString());

            })
    };
    state: BoxState<P> = {
        data: []

    };
    componentDidMount() {
        this.loadPostsFromServer();
    };

}


