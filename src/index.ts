import * as fs from 'fs'
import remove from './remove'
import copy from './copy'
import type { IPluginContext } from '@tarojs/service'

class PluginOptions {
  public fromPath: string = ''
  public outputPath: string = ''
  public once: boolean = false
}

function getTriggerFun(once) {
  return once ? 'onBuildComplete' : 'onBuildFinish'
}

const voidErrorMap = new Map([
  ['fromPath', 'fromPath can not be empty'],
  ['outputPath', 'outputPath can not be empty'],
])

export default function (ctx: IPluginContext, options: PluginOptions) {
  const defaultOptions = new PluginOptions()
  const fromPath = options.fromPath || defaultOptions.fromPath
  const outputPath = options.outputPath || defaultOptions.outputPath
  const once = options.once || defaultOptions.once 
  const triggerFunction = getTriggerFun(once)

  for (let errorItem of voidErrorMap) {
    const [key, msg] = errorItem
    if (!options[key]) throw new Error(msg)
  }

  ctx[triggerFunction](() => {
    if (fs.existsSync(outputPath)) remove(outputPath)
    copy(fromPath, outputPath)
  })
}
