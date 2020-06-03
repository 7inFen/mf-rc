// interface IConfig {
//   key: string,
//   name: string
// }
export default (list = [], config = {
  key: 'key',
  name: 'name'
}) => {
  return list.reduce((prev, next) => {
    prev[next[config.key]] = next[config.name]
    return prev
  }, {})
}
