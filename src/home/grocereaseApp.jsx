import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './home.css';

// export function grocereaseApp(props) {
//     const buttons = new Map();
//     const navigate = useNavigate();

//     const [items, setItems] = useState([]);
//     const [newItem, setNewItem] = useState('');
//     const [filterChecked, setFilterchecked] = useState(false);

//     //read items

// }

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

export function ItemList() {
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
        <main>
            <div className="div-main">
                <h1>Grocery List Items</h1>
                <span>
                    <input type="checkbox" className="checkfilter" value="checkfilter" checked={filterChecked} onChange={() => setFilterChecked(!filterChecked)} />
                    Filter Checked Items
                </span>

            </div>
            <ul className="groceryList">
                {filteredItems.map(item => {
                    <li key={item.id} className="groceryItem">
                        <input type="checkbox" className="item-done checkbox-icon" id="Eggs" />
                        <span className="item-description">Eggs</span>
                        <button type="button" className="item-delete material-icon">delete</button>
                    </li>
                })}
            </ul>

            
        </main>
    );
}