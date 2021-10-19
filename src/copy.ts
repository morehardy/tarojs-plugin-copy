import * as fs from 'fs'
import * as path from 'path'

/**
 * copy
 * @param fromPath 来源路径
 * @param outputPath 输出路径
 * @returns void
 */
export default function copy(fromPath: string, outputPath: string) {
  if (!fs.existsSync(fromPath)) return false

  function walk(src: string) {
    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
      createDirectory(getTargetPath(src, fromPath, outputPath))

      const dirChildren = fs.readdirSync(src)
      for (let child of dirChildren) {
        const childPath = path.resolve(src, child)
        if (fs.statSync(childPath).isDirectory()) {
          walk(childPath)
          continue
        }
        const dest = getTargetPath(childPath, fromPath, outputPath)
        copyFile(childPath, dest)
      }
      return
    }
    copyFile(fromPath, getTargetPath(fromPath, outputPath, fromPath))
  }

  walk(fromPath)
}

/**
 * createDirectory
 * @param dir 文件夹地址
 */
function createDirectory(dir: string) {
  if (fs.existsSync(dir)) return
  fs.mkdirSync(dir)
}

/**
 * copyFile
 * @param src 来源地址
 * @param dest 目标地址
 */
function copyFile(src, dest) {
  fs.copyFile(src, dest, (err) => {
    if (err) {
      console.log(src, dest)
      throw err
    }
  })
}

/**
 * getTargetPath
 * @param currentPath 当前路径
 * @param fromPath 来源路径
 * @param outputPath 输出路径
 * @returns targetPath
 */
function getTargetPath(currentPath: string, fromPath, outputPath) {
  return path.join(outputPath, currentPath.replace(fromPath, ''))
}
