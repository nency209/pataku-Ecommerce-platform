// about section
export interface About
{
  title?:string,
  text?:string,
  
}
export interface bannerImages
{
  image:string
}

// shipping policy
export interface PolicySection {
  type: "paragraph" | "list";
  content: string | string[];
}
