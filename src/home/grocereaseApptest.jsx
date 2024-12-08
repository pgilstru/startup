import React from 'react';
import { AppEvent, AppNotifier } from './appUpdater';
import './home.css';

export function GrocereaseApp(props) {
    const userName = props.userName;
    const [items, setItems] = React.useState([]);
    const [newItemText, setNewItemText] = React.useState('');
    const [filterChecked, setFilterChecked] = React.useState(false);

    React.useEffect(() => {
        const handleAppEvent = (event) => {
            console.log('received event: ', event);
            switch (event.type) {
                case AppEvent.system:
                    
                case AppEvent.ItemAdded:
                    setItems((prevItems) => [...prevItems, event.value]);
                    break;
                case AppEvent.ItemUpdated:
                    setItems((prevItems) => prevItems.map((item) =>
                        item.id === event.value.id ? event.value : item ));
                    break;
                case 'item-deleted':
                    setItems((prevItems) => prevItems.filter((item) => item.id !== event.value.id));
                    break;
                default:
                    console.warn('unknown message type: ', event.type);
            }
        };
        AppNotifier.addHandler(handleAppEvent);
        return () => {
            AppNotifier.removeHandler(handleAppEvent);
        };
    }, []);

    // const loadItems = async () => {
    //     try {
    //         const response = await fetch('/api/items');
    //         if (!response.ok) {
    //             throw new Error(`failed to fetch items: ${response.statusText}`);
    //         }
    //         const items = await response.json();
    //         setItems(items);
    //     } catch (error) {
    //         console.error('error loading items: ', error);
    //     }
    // };

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
                const newitem = await response.json();
                // broadcast new item added
                AppNotifier.broadcastEvent(userName, AppEvent.ItemAdded, newItem);
                setNewItemText(''); //clear input

                // const updatedItems = await response.json();
                // // update state with newly added items
                // setItems((prevItems) => [...prevItems, updatedItems]);
                // AppNotifier.broadcastEvent(connections, { type: 'item-deleted', id })
                // loadItems();
                // setNewItemText(''); //clear input
            } catch (error) {
                console.error('error adding item: ', error);
            }
        }
    };

    const toggleItem = async (id) => {
        const item = items.find((item) => item.id === id);
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
                // broadcast
                AppNotifier.broadcastEvent(userName, AppEvent.ItemUpdated, updatedItem);
                // setItems(updatedItems);
            } catch (error) {
                console.error('Error updating item:', error);
            }
        }
    };

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`/api/item/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('failed to delete item');
            }
            // broadcast
            AppNotifier.broadcastEvent(userName, AppEvent.ItemDeleted, { id });


            // const updateItems = await response.json();
            // setItems(updateItems);
        } catch (error) {
            console.error('error deleting item: ', error);
        }
    };

    const filteredItems = filterChecked
        ? items.filter(item => !item.done)
        : items;

    return (
        <div>
            <div className="div-main">
                <h1>Grocery List Items</h1>
                <span>
                    <input type="checkbox" className="checkfilter" value="checkfilter" checked={filterChecked} onChange={() => setFilterChecked(!filterChecked)} />
                    <label className='checkFilterLabel'>Filter Checked Items</label>
                </span>

            </div>
            <ul className="groceryList">
                {filteredItems.map((item, index) => {
                //   return (
                    <li key={item.id || index} className={`groceryItem ${item.done ? 'completed-item' : ''}`}>
                        <input type="checkbox" className="item-done checkbox-icon" checked={item.done} onChange={() => toggleItem(item.id)} />
                        <span className="item-description">{item.text}</span>
                        <button onClick={() => deleteItem(item.id)} type="button" className="item-delete material-icon">delete</button>
                    </li>
                //   );
                })}
            </ul>

            <form className="form-add-item" onSubmit={addItem}>
                <div className="form-stuff">
                    <label htmlFor="item">List Item: </label>
                    <input type="text" className="item-input" value={newItemText} onChange={(e) => setNewItemText(e.target.value)} id="item" name="item" placeholder="Your list item here" required/>
                </div>
                <button type="submit" className="add-item-button btn btn-sm btn-light">Add Item</button>
            </form>
        </div>
    );
}