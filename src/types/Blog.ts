import { DeltaStatic } from 'quill';

export default interface IBlogProps {
  title: string;
  titleImage: string;
  blogContent: DeltaStatic;
  authorName: string;
  readTime: number;
  isPublic: boolean;
  id: string;
}