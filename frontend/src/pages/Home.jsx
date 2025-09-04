import React from "react";
import Layout from "../components/Layout";
import Post from "./Post";
import '../styles/Home.css'


const Home = () => {
    return (
        <>
            <Layout />
            <div className="post-cards-container">
                <Post />
            </div>
        </>
    )
}

export default Home