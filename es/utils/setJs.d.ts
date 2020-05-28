declare const core: {
    insert: (attr: any, cb: any) => void;
    remove: (name: any) => void;
    getRandom: (count?: number) => string;
};
export default core;
