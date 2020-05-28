export default (fn: any, delay = 200) => {
  let timer: any = null;
  return function (...args: IArguments[]) {
    let context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
