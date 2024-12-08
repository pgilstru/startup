// signal system related events and added item, updated item, deleted item
const AppEvent = {
    System: 'system',
    ItemAdded: 'itemAdded',
    ItemUpdated: 'itemUpdated',
    ItemDeleted: 'itemDeleted',
};

class EventMessage {
    constructor(from, type, value){
        this.from = from; //username
        this.type = type; //event type
        this.value = value; //item details, etc.
    }
}


class AppEventNotifier {
    events = [];
    handlers = [];
    constructor() {
        const port = window.location.port;
        const protocol = window.location.protocol === 'https:' ? 'ws' : 'wss';
        // this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}`);
        this.socket = new WebSocket(`ws://${window.location.hostname}:4000/ws`);

        this.socket.onopen = () => {
            this.receiveEvent(new EventMessage('System', AppEvent.System, { msg: 'connected' }));
        };
        this.socket.onclose = () => {
            console.log("ws connection closed");
            this.receiveEvent(new EventMessage('System', AppEvent.System, { msg: 'disconnected' }));
        };
        //ws message received
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch (error) {
                console.error('error processing ws message: ', message);
            }
        };
    }

    broadcastEvent(from, type, value) {
        const event = new EventMessage(from, type, value);
        this.socket.send(JSON.stringify(event));
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }
    
    removeHandler(handler) {
        this.handlers = this.handlers.filter((h) => h !== handler);
    }
    
    receiveEvent(event) {
        this.events.push(event);
        this.handlers.forEach((handler) => {
            handler(event);
        });
    }
}


const AppNotifier = new AppEventNotifier();
export { AppEvent, AppNotifier };



// const GameEvent = {
//     System: 'system',
//     End: 'gameEnd',
//     Start: 'gameStart',
//   };
  
//   class EventMessage {
//     constructor(from, type, value) {
//       this.from = from;
//       this.type = type;
//       this.value = value;
//     }
//   }



  
//   class GameEventNotifier {
//     events = [];
//     handlers = [];
  
//     constructor() {
//       let port = window.location.port;
//       const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
//       this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
//       this.socket.onopen = (event) => {
//         this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'connected' }));
//       };
//       this.socket.onclose = (event) => {
//         this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'disconnected' }));
//       };
//       this.socket.onmessage = async (msg) => {
//         try {
//           const event = JSON.parse(await msg.data.text());
//           this.receiveEvent(event);
//         } catch {}
//       };
//     }
  
//     broadcastEvent(from, type, value) {
//       const event = new EventMessage(from, type, value);
//       this.socket.send(JSON.stringify(event));
//     }
  
//     addHandler(handler) {
//       this.handlers.push(handler);
//     }
  
//     removeHandler(handler) {
//       this.handlers.filter((h) => h !== handler);
//     }
  
//     receiveEvent(event) {
//       this.events.push(event);
  
//       this.events.forEach((e) => {
//         this.handlers.forEach((handler) => {
//           handler(e);
//         });
//       });
//     }
//   }
  
//   const GameNotifier = new GameEventNotifier();
//   export { GameEvent, GameNotifier };