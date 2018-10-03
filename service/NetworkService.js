
export default class NetworkService{
    static getData = function(){
        return new Promise(function(resolve, reject) {
            setTimeout(() => resolve("Rabbit"), 5000)
        });
    }
}