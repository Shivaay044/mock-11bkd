



const setLocalSt = (key,value)=>{
    return localStorage.setItem(key,JSON.stringify(value))
}



const getLocalSt = (key) =>{
    return JSON.stringify(localStorage.setItem(key))
}


const clearLocalSt = ()=>{
    return localStorage.clear()
}


module.exports = {
    setLocalSt,
    getLocalSt,
    clearLocalSt
}