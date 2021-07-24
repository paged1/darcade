import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';


function Home(props) {

    const [date, setDate] = useState();

    useEffect(() => {

        setInterval(() => {
            setDate(Date.now())
        }, 10)
        


    }, []);


    // functional code
    return (
        <div>




            <h1>What up: {date}</h1>
        </div>
    );
}


export default withRouter(Home);