type CheckResult = 'success' | 'in_check' | 'invalid_content';
type Sticker = {
  src?: string;
  name: string;
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  caption?: string;
};
type TextField = {
  id: number;
  content: string;
  limit: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontWeight?: string | number;
  lineHeight?: number;
  rotation?: number;
  color?: string;
  textAlign?: 'left' | 'right' | 'center';
  error?: boolean;
};
type Photo = {
  id: number;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  error?: boolean;
  ratio?: string;
  touched: false;
  status: CheckResult;
};
type PosterData = {
  id: string;
  preview: string;
  background: string;
  desc: string;
  textfields: Array<TextField>;
  photos: Array<Photo>;
  stickers: Array<Sticker>;
};
