import { GithubIssuePayload, GithubStarPayload } from "../../interfaces";

export class GithubService {

    constructor() {}

    onStart(payload: GithubStarPayload): string {
        
        // let message: string = '';
        const { action, sender, repository, starred_at } = payload;

        // const { starred_at } = payload;

        // console.log(starred_at);

        return `User ${sender.login} ${action} star on ${repository.full_name} at ${starred_at}`;

    }

    onIssue(payload: GithubIssuePayload) {

        const { action, issue, repository } = payload;

        if ( action === 'opened' ) {
            return `An issue was opened with this title ${issue.title} on repository ${repository.full_name}`;
            // console.log({ message });
            // return message;
        }

        if ( action === 'closed' ) {
            return `An issue was closed by ${issue.user.login}`;
            // console.log({ message });
            // return message;
        }

        if ( action === 'reopened' ) {
            return `An issue was reopened by ${issue.user.login}`;
            // console.log({ message });
            // return message;
        }

        return `Action not supported ${action}`;
    
    }

}
