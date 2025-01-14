import {connect} from "mongoose";

export const checkDbConnection = async(uri:string):Promise<void> =>{
    let isConnected = false;
    while(!isConnected){
        try {
            const connection = await connect(uri,{dbName:"chat-app"});
            console.log("database connected successful")
            console.log(`host is : ${connection.connection.host}`)
            isConnected = true
        } catch (error) {
            console.log("Mongodb Connection failed",error),
            console.log("Retrying Mongodb connection ")
        }
    }
}