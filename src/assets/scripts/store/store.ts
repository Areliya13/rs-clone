import observer from "./observer";
import { EventName, IPartialUser, IStore } from "./types";

export const store: IStore = {
    user: {},
    updateStore(store: IPartialUser) {
        this.user = store;
        console.log('я стор метод я обновляю стор')
        observer.notify({eventName: EventName.updateState, eventPayload: this.user})
    }
}