import { VERCEL_URL } from "@/infrastructure/environments"

export const getURL = () => {
    let url =
        VERCEL_URL ??
        process?.env?.NEXT_PUBLIC_VERCEL_URL ??
        'http://localhost:3000/'
    url = url.startsWith('http') ? url : `https://${url}`
    url = url.endsWith('/') ? url : `${url}/`
    return url
}
