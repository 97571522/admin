export interface Website {
  websiteId?: number;
  websiteTitle: string;
  websiteDate: string;
  websiteDomain: string;
  websiteDescription: string;
  websiteStatus: string;
  websiteSeoTitle: string;
  websiteSeoKeyword: string;
  websiteSeoExcerpt: string;
}

export interface Status {
  value: number;
  viewValue: string;
}

export interface WebsiteCategoryInterface {
  id?: number | undefined;
  title: string;
  date: string;
  name: string;
  excerpt: string;
  description: string;
  status: string;
  childs?: string;
}

export interface WebsiteCategoryStatusInterface {
  value: number;
  viewValue: string;
}
