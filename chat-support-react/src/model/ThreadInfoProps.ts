
export interface ThreadInfoProps {
    email: string,
    subject: string,
    initMessage: string,
    //created?: Date,
}

export const createThreadInfo = (email: string, subject: string, initMessage: string):ThreadInfoProps => {
    return {email, subject, initMessage};
}