
export interface MessageProps {
    email: string,
    created: Date,
    content: string,
}

export const createMessage = (email: string, content: string):MessageProps => {
    let created = new Date();
    return {email, created, content};
}
