import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import MostSearched from "./components/MostSearched";

function Home() {
    return (
        <div>
            {/* Header */}
            <Header/>
            {/* Hero */}
            <Hero/>
            {/* Categories */}
            <Categories/>
            {/* Most Searched */}
            <MostSearched/>
        </div>
    );
}

export default Home;