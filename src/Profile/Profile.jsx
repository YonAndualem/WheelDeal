import Header from '@/components/Header'
import React from 'react'
import MyListing from './Components/MyListing';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from '@/components/Footer';

function Profile() {
    return (
        <div className='text-white bg-slate-800'>
            <Header />
            <div className='px-10 md:px-20 my-10'>
                <Tabs defaultValue="my-listing" className="w-full ">
                    <TabsList className="flex justify-start w-full gap-12 bg-slate-900 text-white">
                        <TabsTrigger value="my-listing">My Listing</TabsTrigger>
                        <TabsTrigger value="inbox">Inbox</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                    </TabsList>
                    <TabsContent value="my-listing">
                        <MyListing />
                    </TabsContent>
                    <TabsContent value="inbox">
                        Inbox
                    </TabsContent>
                    <TabsContent value="profile">
                        Profile
                    </TabsContent>
                </Tabs>
            </div>
            <Footer />
        </div>
    )
}

export default Profile