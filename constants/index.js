export const AUTH_MODE = {
    login :"login",
    signup :"signup"
}

export const AUTH_TOKEN = "auth_token"

export const LOCAL_KEYS = {
    PRODUCTION: "production",
    STAGE: "stage",
    DEVELOPMENT: "development"
}

export const CLOUDINARY_IMAGES_BASE_FOLDER = (()=>{
    const currentEnv = process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV;

    return currentEnv
})()


export const profile_categories = [
    { "label": "Profile Summary", "value": 1 },
    { "label": "Wishlist", "value": 2 },
    { "label": "Placed Order", "value": 3 },
    { "label": "Products", "value": 4 },
  ]
  