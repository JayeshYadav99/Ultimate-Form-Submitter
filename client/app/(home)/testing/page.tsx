"use client"
import React from "react";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
const app = new Realm.App({ id: "relatimeappilcation-tmgvgzu" });
export default function page() {
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
        setEvents((events) => [...events, change]);
      }
    };
    login();
  }, []);
  return (
    <div className="App">
             
      {!!user && (
        <div className="App-header">
                   <h1>Connected as user ${user.id}</h1>
                   
          <div>
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
                     
          </div>
                 
        </div>
      )}
         
    </div>
  );
}
