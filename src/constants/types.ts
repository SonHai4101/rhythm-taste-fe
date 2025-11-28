export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
}

export interface Song {
  id: string
  title: string
  artist: any
  album: any
  duration: number
  audioId: string
  createdAt: string
  updatedAt: string
  audio: Audio
}

export interface Audio {
  id: string
  url: string
  key: string
  createdAt: string
  updatedAt: string
}