/// <reference types="react" />
declare const _default: {
    mapKeys: (list?: any[], config?: {
        key: string;
        name: string;
    }) => any;
    debounce: (fn: any, delay?: number) => (...args: IArguments[]) => void;
    amountFormat: (number: import("react").ReactText) => string;
    setJs: {
        insert: (attr: any, cb: any) => void;
        remove: (name: any) => void;
        getRandom: (count?: number) => string;
    };
    getUploadFiles: (fileList: any[], params: any) => any[];
};
export default _default;
