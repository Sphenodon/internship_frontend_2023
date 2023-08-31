import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import {Layout} from "antd";


const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    maxHeight: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#272b30',

};
const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    textAlign: 'center',
    minHeight: '100vh',
    maxWidth: '100vw',
    lineHeight: '1.5',
    backgroundColor: '#fff',
    paddingInline: '5% 5%',
    marginInline: 'auto',
};
const footerStyle = {
    textAlign: 'center',
    backgroundColor: '#1c1e22',
    height: 64,
    color: '#fff',
    justifyContent: 'center',
};

export default function Root() {
    return (
        <Layout>
            <Layout style={headerStyle}><Header/></Layout>
            <Layout style={contentStyle}><Outlet/></Layout>
            <Layout style={footerStyle}><Footer/></Layout>
        </Layout>
    )
}