export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  
  export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
  };
  
  export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
  };
  
  export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
  };
  
  export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
  };

  export type User = {
    id?:string
    name?: string;
    username?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
    avatar?: string;
    cover?: string;
    surname?: string;
    description?: string;
    city?: string;
    school?: string;
    work?: string;
    website?: string;
  };
  
  
  export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
  };

  