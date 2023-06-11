export function setFbPhoto(url){
    try{
    var user = JSON.parse(sessionStorage["User"]);
    }
    catch(error){}
    if(user==null){
        return null;
    }
    user.image=url;
    sessionStorage.setItem("User", JSON.stringify(user));
}
export default setFbPhoto();