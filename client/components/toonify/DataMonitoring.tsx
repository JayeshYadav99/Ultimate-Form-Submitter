"use client";
import React from "react";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
const app = new Realm.App({ id: "relatimeappilcation-tmgvgzu" });
import {  useSearchParams ,useRouter} from "next/navigation";
export default function DataMonitoring() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const handleUpdateParams = (pid:string,status:string) => {
        const params = new URLSearchParams(searchParams.toString());
 
        params.set("pid", pid);
        params.set("status", "completed");
        
    
        const newUrl = `${window.location.pathname}?${params.toString()}`;
    
        router.push(newUrl, { scroll: false });
      };
  const [user, setUser] = useState();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("ImageAItools").collection("generations"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        const {operationType,fullDocument,documentKey} = change;
        console.log("changelogs",operationType);
        if(operationType === "update"){
          console.log("output is updated",fullDocument.outputImage);
          handleUpdateParams(fullDocument.promptid,"completed");
        }
        setEvents((events) => [...events, change]);  
      }
      console.log("changelogs2");
    };
    login();
  }, []);
  return (
    <div className="App">

      {!!user && (
        <div className="App-header">
        <h1>Connected as user ${user.id}</h1>
        
          {/* <div>
        <p>Latest events:</p>
                  <table>
                   <thead>
                        <tr>
                  <td>Operation</td>
                  <td>Document Key</td>
                  <td>Full Document</td>
                </tr>
                         </thead>
                  <tbody>
               {events.map((e, i) => (
                  <tr key={i}>
                    <td>{e.operationType}</td>
                    <td>{e.documentKey._id.toString()}</td>
                    <td>{JSON.stringify(e.fullDocument)}</td>
                  </tr>
                ))}
            
              </tbody>
         
            </table>
              </div> */}
  
        </div>
      )}
         
    </div>
  );
}
