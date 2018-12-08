
import * as Redis from 'redis';
export default class RedisService {

    private conn;
    constructor() {
        this.conn = Redis.createClient();

    }

    public saveSession() {

    }

}
