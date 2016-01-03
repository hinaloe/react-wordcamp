/// <reference path="../typings/bundle.d.ts" />

// Load Reacts
import * as React from 'react';


// Component
class Central extends React.Component <any,any>{
    getWordCampInfoFromPostmeta() {
        let post_meta = this.props.post.post_meta;
        let wcdata = [];
        for (var i = 0; i < post_meta.length; i++) {
            wcdata[post_meta[i].key] = post_meta[i].value;
        }
        return wcdata;
    };
    render() {
        const wcdata = this.getWordCampInfoFromPostmeta();
        const nowDate = new Date();
        const startDate = new Date(wcdata["Start Date (YYYY-mm-dd)"] * 1000);
        let pastEventClass = '';
        let pastEventText = '';
        if (startDate.getTime() < nowDate.getTime()) {
            pastEventClass = 'info';
            pastEventText = '(Finished)';
        }
        wcdata["Start Date"] = startDate.toLocaleString();
        if (wcdata["End Date (YYYY-mm-dd)"]) {
            wcdata["End Date"] = new Date(wcdata["End Date (YYYY-mm-dd)"] * 1000).toLocaleString();
        } else {
            wcdata["End Date"] = 'No data';
        }
        const googlemapUrl = "http://maps.google.com/maps?q=" + wcdata['Physical Address'];
        return (
            <tr className={pastEventClass}>
                <td className="page-header">{this.props.post.title}<br/>{pastEventText}</td>
                <td><a href={wcdata["URL"]}>{wcdata["URL"]}</a></td>
                <td>{wcdata["Location"]}</td>
                <td>{wcdata["Venue Name"]}</td>
                <td>
                    {wcdata["Physical Address"]}<br/>
                    <a href={googlemapUrl}>See in GoogleMap</a>
                    </td>
                <td>{wcdata["Start Date"]}</td>
                <td>{wcdata["End Date"]}</td>
                <td>{wcdata["Number of Anticipated Attendees"]}</td>
                </tr>
        );
    }
}

class CentralList extends React.Component<any,any> {
    parseStartDate (postData) {
        for (var j = 0; j < postData.length; j++) {
            let post_meta = postData[j].post_meta;
            for (var i = 0; i < post_meta.length; i++) {
                if (post_meta[i].key === "Start Date (YYYY-mm-dd)") {
                    postData[j]['startDate'] = post_meta[i].value;
                }
            }
        }
        return postData;
    };
    sortByStartDate() {
        let postData = this.parseStartDate(this.props.postData);
        const key = "startDate";

        //ASC
        let num_a = 1;
        let num_b = -1;

        //DESC
        num_a = -1;
        num_b = 1;

        const data = postData.sort(function(a, b) {
            const x = a[key];
            const y = b[key];
            if (x > y) return num_a;
            if (x < y) return num_b;
            return 0;
        });
        return data;
    };
    render() {
        const eventData = this.sortByStartDate();
        const centralNodes = eventData.map(function(post) {
            return (
                <Central post={post} key={post.ID}/ >
            );
        });
        return (
            <div className="table-responsive">
                <table className="wcList table-hover table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>WebSite</th>
                            <th>Place</th>
                            <th>Venue Name</th>
                            <th>Physical Address</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Number of Anticipated Attendees</th>
                            </tr>
                        </thead>
                    <tbody>
                        {centralNodes}
                        </tbody>
                    </table>
                </div>
        );
    }
}

export class CentralBox extends React.Component<any, any> {
    private loadPostsFromServer() {
        $.ajax({
            url: this.props.apiUrl,
            dataType: 'json',
            cache: false,

        })
            .then((data) => {
                this.setState({ data: data });
            })
            .fail((xhr: JQueryXHR, status: string, err) => {
                console.error(this.props.url, status, err.toString);
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
            <CentralList postData={this.state.data} />
        )
    }

}


