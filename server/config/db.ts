let LOCAL = false

let HostName, URI;

if(LOCAL){
    URI = "mongodb://localhost/contacts";
    HostName = "localhost"
}else{
    URI = "mongodb+srv://natejaden:friedchicken69@atlascluster.pzi4n5v.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";
    HostName = "MongoDB Atlas"
}

export { HostName, URI }
export const SessionSecret = "INFT2202SessionSecret";