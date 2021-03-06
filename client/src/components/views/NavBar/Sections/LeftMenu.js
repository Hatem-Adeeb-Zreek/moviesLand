import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="favorite">
                <Link to="/favorite">Favorite</Link>
            </Menu.Item>
        </Menu>
    );
}

export default LeftMenu;
