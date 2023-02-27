import { IEventObject, ISubscriber } from './types';

class Observer {
    public subscribers: ISubscriber[];

    constructor() {
        this.subscribers = [];
    }

    subscribe = (subscriber: ISubscriber): void => {
        this.subscribers.push(subscriber);
    };

    unsubscribe = (subscriber: ISubscriber): void => {
        this.subscribers = this.subscribers.filter((el) => el !== subscriber);
    };

    notify = ({ eventName, eventPayload }: IEventObject): void => {
        console.log('я наблюдатель, запускаю оповещение')
        this.subscribers.forEach((el) => (el.eventName === eventName ? el.function(eventPayload) : null));
    };
}

const observer = new Observer()

export default observer;