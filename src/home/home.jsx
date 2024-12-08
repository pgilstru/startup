import React from 'react';
// import '/src/app.css';

//og
// import { GrocereaseApp } from './grocereaseApp'

//test
import { GrocereaseApp } from './grocereaseApptest'


export function Home(props) {
    return (
    //   <main onload="readTasks()">
      <main>
        <GrocereaseApp userName={props.userName} /> 
      </main>
    );
}