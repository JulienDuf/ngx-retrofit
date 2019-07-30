import { Header } from './header.decorator';

export const ContentType = (contentType: string) => Header('Content-Type', contentType);
