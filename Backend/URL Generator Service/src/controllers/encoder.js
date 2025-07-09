


const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const encodeBase62 = (num) => {
    let res = '';
    while (num > 0) {
        res = BASE62[num % 62] + res;
        num = Math.floor(num / 62);
    }
    console.log("Encoded Base62:", res);
    return res || '0';
};

export default encodeBase62;
