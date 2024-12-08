import React from 'react';
// import '/src/app.css';
import { GrocereaseApp } from './grocereaseApp'

export function Home(props) {
    return (
    //   <main onload="readTasks()">
      <main>
        <GrocereaseApp userName={props.userName} /> 
      </main>
    );
}