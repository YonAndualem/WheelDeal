import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";

function Home() {
    return (
        <div>
            {/* Header */}
            <Header/>
            {/* Hero */}
            <Hero/>
            {/* Categories */}
            <Categories/>
        </div>
    );
}

export default Home;