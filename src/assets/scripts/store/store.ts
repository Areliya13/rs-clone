import observer from "./observer";
import { EventName, IPartialUser, IStore } from "./types";

class Store {
    user: IPartialUser = {}
    constructor(){}
    
    updateStore(store: IPartialUser) {
        this.user = store;
        console.log('я стор метод я обновляю стор')
        observer.notify({eventName: EventName.updateState, eventPayload: this.user})
    }
}

export const store: IStore = new Store()