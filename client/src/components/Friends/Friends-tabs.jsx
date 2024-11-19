import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Friendslist from './Friends-list';
import Friendssearch from './Friends-search';
const Friendstabs = () => {
  return (
    <>
        <Tabs defaultValue="Friends">
            <TabsList>
                <TabsTrigger value="Friends">Friends</TabsTrigger>
                <TabsTrigger value="Search New">Search New</TabsTrigger>              
            </TabsList>
            <TabsContent value="Friends">
                <Friendslist/>
            </TabsContent>
            <TabsContent value="Search New">
                <Friendssearch/>
            </TabsContent>
        </Tabs>
    </>

  )
}

export default Friendstabs