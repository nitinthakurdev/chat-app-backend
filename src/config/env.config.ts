class Config {
  public MONGODB_URI: string;
  public CLIENT_URL: string;
  public CLOUDINARY_SECRET: string;
  public CLOUDINARY_API_KEY: string;
  public CLOUDINARY_NAME: string;
  public JWT_TOKEN: string;
  public NODE_ENV: string;
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

export const config: Config = new Config();
