import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';


function Home(props) {
    /*
    const [date, setDate] = useState();

    useEffect(() => {

        setInterval(() => {
            setDate(Date.now())
        }, 10)
        


    }, []); */


    // functional code
    return (
        <div>
            {props.address}
            {props.token}



            <h1>
            </h1>
        </div>
    );
}


export default withRouter(Home);