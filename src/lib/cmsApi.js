import {useEffect,useState} from "react";

export const CMS_API_URL=String(import.meta.env.VITE_CMS_API_URL||"").replace(/\/+$/,"");

export function cmsUrl(path=""){
  const p=String(path||"");
  if(/^https?:\/\//i.test(p))return p;
  const normalized=p.startsWith("/")?p:`/${p}`;
  return `${CMS_API_URL}${normalized}`;
}

export function cmsFetch(path,options={}){
  return fetch(cmsUrl(path),{
    ...options,
    credentials:"omit",
    headers:{
      ...(options.body instanceof FormData?{}:options.body?{"Content-Type":"application/json"}:{}),
      ...(options.headers||{})
    }
  });
}

let siteContentCache=null;
let siteContentPromise=null;
export async function getSiteContent(){
  if(siteContentCache)return siteContentCache;
  if(!siteContentPromise){
    siteContentPromise=cmsFetch("/api/site-content",{cache:"no-store"})
      .then(async r=>r.ok?r.json():null)
      .then(x=>{siteContentCache=x||{};return siteContentCache})
      .catch(()=>({}))
      .finally(()=>{siteContentPromise=null});
  }
  return siteContentPromise;
}

export function useSiteContent(){
  const[data,setData]=useState(siteContentCache||{});
  useEffect(()=>{let live=true;getSiteContent().then(x=>live&&setData(x));return()=>{live=false}},[]);
  return data;
}
