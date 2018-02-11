import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'
// 数据库
export default new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db')
})
