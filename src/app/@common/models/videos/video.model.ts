export interface Video {
  width: string;
  height: string;
  loop: any;
  url1: string;
  muted: boolean;
  volume?: number;
  videos: Source[];
}

export interface Source {
  id: string;
  stream: string;
  file: string;
}
