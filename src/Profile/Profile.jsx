import Header from '@/components/Header'
import React from 'react'
import MyListing from './Components/MyListing';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Inbox from './Components/Inbox';

function Profile() {
    return (
        <div>
            <Header />
            <div className='px-10 md:px-20 my-10'>
                <Tabs defaultValue="my-listing" className="w-full">
                    <TabsList className="flex justify-start w-full gap-12">
                        <TabsTrigger value="my-listing">My Listing</TabsTrigger>
                        <TabsTrigger value="inbox">Inbox</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                    </TabsList>
                    <TabsContent value="my-listing">
                        <MyListing />
                    </TabsContent>
                    <TabsContent value="inbox">
                        <Inbox />
                    </TabsContent>
                    <TabsContent value="profile">
                        Profile
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Profile