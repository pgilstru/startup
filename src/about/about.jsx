import React from 'react';
import './about.css';

export function About() {
    const [fact, setFact] = React.useState(''); //state to hold fact

    React.useEffect(() => {
        //fetch random fact from api
        const fetchFact = async () => {
            try {
                const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en', {
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                //check if response is ok
                if (response.ok) {
                    const data = await response.json();
                    setFact(data.text);
                } else {
                    console.error("failed to fetch fact");
                }
            } catch (error) {
                console.error("error fetching fact: ", error);
            }
        };
        fetchFact(); //call function when component mounts
    }, []); //ensure it only runs once

    return (
        <main className="aboutMain">
            <p>
                The application “grocerease” streamlines the process of having an up to date, and organized grocery list available for you and your roommates.
            </p>
            <p className="text-end">
                As each roommate adds items to the list, deletes an item, or checks one off, these updates are displayed in realtime for the other roommates!
            </p>
            <p>
            Keep track of your list, and easily add items as they come to mind with grocerease.
            </p>
            
            <div id="funFact" className="bg-secondary text-light">
                <b className="factHeader">Random Useless Fact: </b>
                <p className="theFact">{ fact ? fact : "Loading..."}</p>
                {/* display fact or loading message */}
            </div>
        </main>
    )
}