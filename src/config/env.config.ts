
class Config {
    public MONGODB_URI:string;
    constructor(){
        this.MONGODB_URI = process.env.MONGODB_URI || "";
    }
}

export const config:Config = new Config()