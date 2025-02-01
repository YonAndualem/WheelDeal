import Header from '@/components/Header'
import React from 'react'
import MyListing from './Components/MyListing';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from '@/components/Footer';
import MyWishlist from './Components/MyWishlist';
import Chat from './Components/Chat/Chat';
import { useSearchParams } from "react-router-dom";

function Profile() {
    const [searchParams] = useSearchParams();
    const defaultTab = searchParams.get("tab") || "my-listing"; // If coming from "Message Owner", it should open "Chat"

    return (
        <div className='text-white bg-slate-800'>
            <Header />
            <div className='px-10 md:px-20 my-10'>
                <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className="flex justify-start w-full gap-12 bg-slate-900 text-white">
                        <TabsTrigger value="my-listing">My Listing</TabsTrigger>
                        <TabsTrigger value="chat">Chat</TabsTrigger>
                        <TabsTrigger value="my-wishlist">My WishList</TabsTrigger>
                    </TabsList>
                    <TabsContent value="my-listing">
                        <MyListing />
                    </TabsContent>
                    <TabsContent value="chat">
                        <Chat />
                    </TabsContent>
                    <TabsContent value="my-wishlist">
                        <MyWishlist />
                    </TabsContent>
                </Tabs>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
