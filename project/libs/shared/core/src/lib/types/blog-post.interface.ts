import { PostType } from './blog-post-type.enum';
// Теги для публикаций опциональны.
// Любой тег состоит из одного слова и не может содержать пробелы.
// Максимальное количество тегов к публикации: 8 штук.
// Все теги хранятся в нижнем регистре. Пользователь может отправлять теги в любом регистре, при сохранении теги приводятся нижнему регистру.
// Теги не повторяются. Клиент может отправить несколько одинаковых тегов для публикации. Это не должно приводить к ошибкам. Дубли автоматически удаляются.
// Тег должен начинаться с буквы. Минимальная длина тега: 3 символа. Максимальная: 10.
// Передача для публикации больше 8 тегов приводит к ошибке валидации.
export type Tag = string;

// Базовый интерфейс
export interface BlogPost {
  id?: string;
  postAuthor: string; // user uuid
  publicationDate: string;
  createDate: string;
  isRepost: boolean;
  isPublished: boolean; // опубликована или черновик
  tags: Tag[];
  postType: PostType;
}

export interface BlogPostVideo extends BlogPost {
  title: string;
  videoUrl: string;
}

export interface BlogPostText extends BlogPost {
  title: string;
  announcement: string;
  text: string;
}

export interface BlogPostCite extends BlogPost {
  text: string;
  author: string;
}

export interface BlogPostPhoto extends BlogPost {
  photoId: string;
}

export interface BlogPostLink extends BlogPost {
  linkUrl: string;
  description: string;
}
