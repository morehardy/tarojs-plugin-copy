import * as fs from 'fs'
import * as path from 'path'

/**
 * remove
 * @param targetPath 目标地址
 */
export default function remove(targetPath: string) {
  if (!fs.existsSync(targetPath)) return false
  let arr = [targetPath]
  let current = ''
  let index = 0

  while ((current = arr[index++])) {
    let stat = fs.statSync(current)
    if (stat.isDirectory()) {
      let files = fs.readdirSync(current)
      arr = [...arr, ...files.map((file) => path.join(current, file))]
    }
  }

  for (var i = arr.length - 1; i >= 1; i--) {
    let stat = fs.statSync(arr[i])
    if (stat.isDirectory()) {
      fs.rmdirSync(arr[i])
    } else {
      fs.unlinkSync(arr[i])
    }
  }
}
