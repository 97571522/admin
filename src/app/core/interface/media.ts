import {SafeUrl} from "@angular/platform-browser";

export interface Media {
  mediaId?: number | undefined;
  mediaFile?: File;
  mediaUrl: SafeUrl;
  mediaTitle?: string | undefined;
  mediaExcerpt?: string | undefined;
  mediaDescription?: string | undefined;
  mediaStatus?: number | undefined;
  mediaAddDate?: string | undefined;
  mediaUpdateDate?: string | undefined;
}

export interface FileHandle {
  file: File,
  url: SafeUrl
}
