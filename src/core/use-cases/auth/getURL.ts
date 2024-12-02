import { VERCEL_URL } from "@/infrastructure/environments"

export const getURL = () => {
    let url = VERCEL_URL;
    url = url.startsWith('http') ? url : `https://${url}`
    url = url.endsWith('/') ? url : `${url}/`
    return url
}
