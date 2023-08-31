import React from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Footer() {

    return (
        <footer>
            <div>Created by Popov Egor</div>
            <div><Link to='https://github.com/Sphenodon'>GitHub</Link></div>
        </footer>
    );
}
