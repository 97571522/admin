import {Media} from "./media";

export interface Post {
  postId?: number;
  postTitle: string;
  postAddDate: string;
  postUpdateDate: string;
  postWebsite: string;
  postExcerpt: string;
  postContent: string;
  postUrlAlias: string;
  postGallery: Media[];
  postStatus: number;
  postSeoTitle: string;
  postSeoKeyword: string;
  postSeoExcerpt: string;
}

export interface Status {
  value: number;
  viewValue: string;
}
