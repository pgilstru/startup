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

    // Load items from localStorage
    React.useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('items')) || [];
        const itemsObjects = storedItems.map(itemData => new Item(itemData));
        setItems(itemsObjects);
    }, []);

    // Save items to localStorage whenever they update
    React.useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    const addItem = (event) => {
        event.preventDefault();
        if (newItemText.trim()) {
            const newItem = new Item({
                text: newItemText,
                done: false,
                id: Date.now(),
            });
            setItems([...items, newItem]);
            setNewItemText('');
        }
    };

    const toggleItem = (id) => {
        const updatedItems = items.map(item =>
            item.id === id ? Item.toggle(item) : item
        );
        setItems(updatedItems);
    };

    const deleteItem = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    };

    const filteredItems = filterChecked
        ? items.filter(item => !item.done)
        : items;

    return (
        // <main>
        <div>
            <div className="div-main">
                <h1>Grocery List Items</h1>
                <span>
                    <input type="checkbox" className="checkfilter" value="checkfilter" checked={filterChecked} onChange={() => setFilterChecked(!filterChecked)} />
                    Filter Checked Items
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