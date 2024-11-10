import React from 'react';
// import '/src/app.css';

import { GrocereaseApp } from './grocereaseApp'

export function Home(props) {
    return (
        <main onload="readTasks()">
            <GrocereaseApp userName={props.userName} />    
      </main>
    );
}