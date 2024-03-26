import { Request, Response } from 'express';
import { GithubService } from '../services/github.service';
import { DiscordService } from '../services/discord.service';
export class GithubController {
  constructor(
    private readonly gitHubService = new GithubService(),
    private readonly discordService = new DiscordService()
  ) {}

webhookHandler = (req: Request, res: Response) => {

    const githubEvent = req.header('x-github-event') ?? 'unknow';
    const githubSignature = req.header('x-hub-signature-256') ?? 'unknow';

    const payload = req.body;
    let message: string = '';

    // console.log(JSON.stringify(payload));

    switch (githubEvent) {
        case 'star':
            message = this.gitHubService.onStart(payload);
            break;
        case 'issues':
            message = this.gitHubService.onIssue(payload);
            break;
        default:
            message = `Event not supported ${githubEvent}`;
            break;
        }

    // console.log({ message });
    // res.status(202).send('Accepted');
    this.discordService.notify(message)
    .then(() => {
        res.status(202).send('Accepted');
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send('Error');
    });
  }
}
