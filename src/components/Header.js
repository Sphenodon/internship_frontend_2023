import React from "react";
import {NavLink} from "react-router-dom";
import {Button} from "antd";

export default function Header () {

    return (
        <div className="header">
            <Button ghost><NavLink to="/">Games</NavLink></Button>
        </div>
    )
}