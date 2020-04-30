import React, { Component } from 'react';


const Action = (props) => {
    return (
        <button className="big-button" onClick={props.handlePick} disabled={!props.hasOptions}>What should I do?</button>
    )
}


export default Action 