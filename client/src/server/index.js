import req from './axiosConfig';
class Server {
    //天气接口
    constructor() {
        this.IP = "http://localhost:8080/";
        this.jsonpIP = "https://free-api.heweather.com/";
        this.key = "7bc721c659874b9684aaa08a73603e5c";
    }
    //天气接口
    weather(params){
        return req.get(this.jsonpIP+'s6/weather/forecast',{
            ...params,
            key:this.key
        })
    }
    
}
const server = new Server();
export default server;