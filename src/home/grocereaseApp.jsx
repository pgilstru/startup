import React from 'react';
import './home.css';

class Item {
    constructor({ text, done = false, id }) {
        this.text = text;
        this.done = done;
        this.id = id;
    }

    static toggle(item) {
        return { ...item, done: !item.done };
    }
}

export function GrocereaseApp() {
    const [items, setItems] = React.useState([]);
    const [newItemText, setNewItemText] = React.useState('');
    const [filterChecked, setFilterChecked] = React.useState(false);
    // const ws = React.useRef(null);

    React.useEffect(() => {
        const ws = new WebSocket(`ws://${window.location.host}`);
        // ws.current = new WebSocket(`ws://${window.location.host}`);
        ws.onopen = () => {
            console.log('ws connection est');
        };
        ws.onclose = () => {
            console.log('ws connection closed');
        };
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('ws message received: ', message);
            // if (message.type === 'item-added') {
            //     const newItem = message.item;
            //     setItems((prevItems) => [...prevItems, newItem]);
            // }
            switch (message.type) {
                case 'item-added':
                    setItems((prevItems) => [...prevItems, message.item]);
                    break;
                case 'item-updated':
                    setItems((prevItems) => prevItems.map((item) =>
                        //item.id === data.item.id ? { ...item, done: data.item.done } : item ));
                        item.id === message.item.id ? message.item : item ));
                    break;
                case 'item-deleted':
                    setItems((prevItems) => prevItems.filter((item) => item.id !== message.id));
                    break;
                default:
                    console.warn('unknown message type: ', message.type);
            }
        };
        return () => { ws.close() };
        // ws.current.onmessage = (event) => {
        //     const data = JSON.parse(event.data);
        //     switch (data.type) {
        //         case 'item-added':
        //             setItems((prevItems) => [...prevItems, data.item]);
        //             break;
        //         case 'item-deleted':
        //             setItems((prevItems) => prevItems.filter(item => item.id !== data.id));
        //             break;
        //         case 'item-updated':
        //             setItems((prevItems) => prevItems.map((item) =>
        //                 item.id === data.item.id ? { ...item, done: data.item.done } : item ));
        //             break;
        //         default:
        //             console.warn('unknown message type: ', data.type);
        //     }
        // };
        // return () => ws.current.close();
    }, []);

    React.useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/items');
                if (!response.ok) {
                    throw new Error(`failed to fetch items: ${response.statusText}`);
                }
                const items = await response.json();
                setItems(items);
            } catch (error) {
                console.error('error loading items: ', error);
            }
        };
        fetchItems();
    }, []);

    const addItem = async (event) => {
        event.preventDefault();
        if (newItemText.trim()) {
            try {
                const response = await fetch('/api/item', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: newItemText, done: false }),
                });
                if (!response.ok){
                    throw new Error('could not add item');
                }
                const updatedItems = await response.json();
                setItems((prevItems) => [...prevItems, updatedItems]);
                setNewItemText(''); //clear input
            } catch (error) {
                console.error('error adding item: ', error);
            }
        }
    };
// CODE FOR DEBUGGING WS
    // const addItem = async (newItemText) => {
    //     // const response = await fetch('/api/item', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type': 'application/json',
    //     //     },
    //     //     body: JSON.stringify({ text: newItemText, done: false }),
    //     // });
    //     // const data = await response.json();
    //     // setItems(data);
    //     try {
    //         const response = await fetch('/api/item', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ text: newItemText, done: false }),
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Failed to add item');
    //         }
    
    //         const data = await response.json();
    //         setItems((prevItems) => [...prevItems, data]); // Add the new item to the list
    //     } catch (error) {
    //         console.error('Error adding item:', error);
    //     }
    // };

    const toggleItem = async (id) => {
        const item = items.find(item => item.id === id);
        if (item) {
            try {
                // Send a PUT request with the full item data
                const response = await fetch(`/api/item/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        text: item.text,  // Send the existing text
                        done: !item.done  // Toggle the done status
                    }),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update item');
                }
    
                // Update the state with the updated items list from the backend
                const updatedItems = await response.json();
                setItems(updatedItems);
            } catch (error) {
                console.error('Error updating item:', error);
            }
        }
    };

// CODE FOR DEBUGGING WS
    // const updateItem = async (itemId) => {
    //     const response = await fetch(`/api/item/${itemId}`, {
    //         method: 'PUT',
    //     });
    //     const data = await response.json();
    //     setItems(data);
    // };

    const deleteItem = async (id) => {
        const item = items.find(item => item.id === id);
        if (item) {
            try {
                console.log('got to try');
                const response = await fetch(`/api/item/${id}`, {
                    method: 'DELETE',
                });

                console.log('got past method');
                if (!response.ok) {
                    throw new Error('failed to delete item');
                }
                const updateItems = await response.json();
                setItems(updateItems);
            } catch (error) {
                console.error('error deleting item: ', error);
            }
        }
    };

// FOR TROUBLESHOOTING WS
    // const deleteItem = async (itemId) => {
    //     const response = await fetch(`/api/item/${itemId}`, {
    //         method: 'DELETE',
    //     });
    //     const data = await response.json();
    //     setItems(data);
    // };

//OG
    // const filteredItems = filterChecked
    //     ? items.filter(item => !item.done)
    //     : items;
    const filteredItems = Array.isArray(items)
        ? (filterChecked ? items.filter(item => !item.done) : items)
        : [];

    return (
        // <main>
        <div>
            <div className="div-main">
                <h1>Grocery List Items</h1>
                <span>
                    <input type="checkbox" className="checkfilter" value="checkfilter" checked={filterChecked} onChange={() => setFilterChecked(!filterChecked)} />
                    <label className='checkFilterLabel'>Filter Checked Items</label>
                </span>

            </div>
            <ul className="groceryList">
                {filteredItems.map(item => {
                  return (
                    <li key={item.id} className={`groceryItem ${item.done ? 'completed-item' : ''}`}>
                        <input type="checkbox" className="item-done checkbox-icon" checked={item.done} onChange={() => toggleItem(item.id)} />
                        <span className="item-description">{item.text}</span>
                        <button onClick={() => deleteItem(item.id)} type="button" className="item-delete material-icon">delete</button>
                    </li>
                  );
                })}
            </ul>

            <form className="form-add-item" onSubmit={addItem}>
                <div className="form-stuff">
                    <label htmlFor="item">List Item: </label>
                    <input type="text" className="item-input" value={newItemText} onChange={e => setNewItemText(e.target.value)} id="item" name="item" placeholder="Your list item here" required/>
                </div>
                <button type="submit" className="add-item-button btn btn-sm btn-light">Add Item</button>
            </form>
        </div>
    );
}


