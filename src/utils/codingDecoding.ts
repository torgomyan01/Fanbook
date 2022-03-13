import { keyGenerator } from './helpers';

const key = '.).(.';
export const encodeString = (string: string, charsLength: number = 5) => {
    const strArr = string.split('');
    let newStr = '';
    strArr.map((_s) => (newStr += _s + key + keyGenerator(charsLength)));
    return newStr;
};

export const decodingString = (codingString: string) => {
    let newDecodingArr = '';
    const decodingArr = codingString.split(key);
    decodingArr.map((st, index) => {
        if (index < decodingArr.length - 1) {
            newDecodingArr += st[st.length - 1];
        }
    });
    return newDecodingArr;
};
