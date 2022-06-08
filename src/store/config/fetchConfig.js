import { getStorageItem } from "../../utils";

export const baseUrl = "https://api.attache.app/";
export const portfolioUrl = "https://portfolio.attache.app/";


export default class services {
    static Get = async (route) => {
        try {
            const token = await getStorageItem("Authorization");
            console.log("auth", token)
            const headers = token ? {
                "Content-Type": "application/json",
                "Authorization": token
            } : {
                    "Content-Type": "application/json",
                }
            const res = await fetch(`${baseUrl}${route}`, {
                headers
            })
            const response = await res.json()
            return response
        }
        catch (e) {
            console.log(`Error in ${route} -->`, e)
            throw e.message
        }
    }
    static Post = async (route, data) => {
        try {
            const token = await getStorageItem("Authorization");
            const headers = token ? {
                "Content-Type": "application/json",
                "Authorization": token
            } : {
                    "Content-Type": "application/json",
                }
            const res = await fetch(`${baseUrl}${route}`, {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            })

            // const response = await res.json()
            return res

        }
        catch (e) {
            console.log(`Error in ${route} -->`, e)
            throw e.message
        }
    }
    static GetPortfolio = async (route) => {
        try {
            const token = await getStorageItem("Authorization");
            console.log("auth", token)
            const headers = token ? {
                "Content-Type": "application/json",
                "Authorization": token
            } : {
                    "Content-Type": "application/json",
                }
            const res = await fetch(`${portfolioUrl}${route}`, {
                headers
            })
            const response = await res.json()
            return response
        }
        catch (e) {
            console.log(`Error in ${route} -->`, e)
            throw e.message
        }
    }
    static PostPortfolio = async (route, data) => {
        try {
            const token = await getStorageItem("Authorization");
            const headers = token ? {
                "Content-Type": "application/json",
                "Authorization": token
            } : {
                    "Content-Type": "application/json",
                }
            const res = await fetch(`${portfolioUrl}${route}`, {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            })

            // const response = await res.json()
            return res

        }
        catch (e) {
            console.log(`Error in ${route} -->`, e)
            throw e.message
        }
    }
}