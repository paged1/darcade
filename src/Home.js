import React, {useEffect, useState} from 'react';

function Home(props) {

    //const [ac]



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
            <h1>Hello</h1>
            Account: {props.account}
            Token: {props.token}



            <h1>
            </h1>
        </div>
    );
}


export default Home;