class Config {
    MONGODB_URI;
    CLIENT_URL;
    CLOUDINARY_SECRET;
    CLOUDINARY_API_KEY;
    CLOUDINARY_NAME;
    JWT_TOKEN;
    NODE_ENV;
    constructor() {
        this.MONGODB_URI = process.env.MONGODB_URI || '';
        this.CLIENT_URL = process.env.CLIENT_URL || '';
        this.CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET || '';
        this.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '';
        this.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || '';
        this.JWT_TOKEN = process.env.JWT_TOKEN || '';
        this.NODE_ENV = process.env.NODE_ENV || '';
    }
}
export const config = new Config();
