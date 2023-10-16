import {Injectable} from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class ToolsService {

  constructor(private datePipe: DatePipe) {
  }

  getFormattedTime(timestamp: number) {
    return this.datePipe.transform(timestamp, 'yyyy-MM-dd');
  }

  toSeoUrl(str: string): string {
    // 将字符串中的空格替换为连字符 -
    let seoUrl = str.trim().replace(/ /g, '-');

    // 将所有非字母和数字的字符替换为 -
    seoUrl = seoUrl.replace(/[^a-zA-Z0-9]/g, '-');

    // 将连续的 - 替换为单个 -
    seoUrl = seoUrl.replace(/--+/g, '-');

    // 将字符串转换为小写
    seoUrl = seoUrl.toLowerCase();

    // 删除结尾的 -
    seoUrl = seoUrl.replace(/-+$/, '');

    // 如果 URL 是空的，将其设置为默认值 "no-title"
    if (seoUrl === '') {
      seoUrl = 'no-title';
    }

    return seoUrl;
  }
}
