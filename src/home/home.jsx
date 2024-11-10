import React from 'react';
// import '/src/app.css';

import { Users } from './users';
import { GrocereaseApp } from './grocereaseApp'

export function Home(props) {
    return (
        <main onload="readTasks()">
            <Users userName={props.userName} />
            <GrocereaseApp userName={props.userName} />
        <div className="div-main">
            <h1>Grocery List Items</h1>
            <span>
                <input type="checkbox" className="checkfilter" value="checkfilter"/>
                <label for="checkfilter" className="checkFilterLabel">Filter Checked Items</label>
            </span>
        </div>
    
        <ul className="groceryList">
            <li className="groceryItem">
                <input type="checkbox" className="item-done checkbox-icon" id="Eggs" />
                <span className="item-description">Eggs</span>
                <button type="button" className="item-delete material-icon">delete</button>
            </li>
            <li className="groceryItem">
                <input type="checkbox" className="item-done checkbox-icon" id="Milk" />
                <span className="item-description">Milk</span>
                <button type="button" className="item-delete material-icon">delete</button>
            </li>
            <li className="groceryItem">
                <input type="checkbox" className="item-done checkbox-icon" id="Bread" />
                <span className="item-description">Bread</span>
                <button type="button" className="item-delete material-icon">delete</button>
            </li>
        </ul>
    
        <form className="form-add-item" method="post" action="index.html">
            <div className="form-stuff">
                <label for="item">List Item: </label>
                <input type="text" className="item-input" id="item" name="item" placeholder="Your list item here" required/>
            </div>
            <button type="submit" className="add-item-button btn btn-sm btn-light">Add Item</button>
        </form>
    
      </main>
    );
}