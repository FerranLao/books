import validator from "validator"

export default ({email,name})=>{
    if(!validator.isEmail(email)||!validator.isAlpha(name))return false
    return true
}