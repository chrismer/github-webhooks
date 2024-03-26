import { envs } from "../../config";

export class DiscordService {

    private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;

    constructor() {}

    async notify( message: string ) {

        const body ={ 
            content: message,
            embeds: [
                {
                image: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2NiOGl3MzF5YjcxMnpzM3d5MGRsMXJjNmg4ZDN2dXhlOTV3NzRoeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EMm31ROmLJtEk/giphy.gif' }
                }
            ]
        };

        const response = await fetch( this.discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if ( !response.ok ) {
        console.log('Error sending message to Discord');
            throw new Error('Error sending message to Discord');
            return false;
        }

        return true;

    }

}
