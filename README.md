# tarojs-plugin-copy

## 依赖
taro.js v3+

## 安装

```bash
npm i tarojs-plugin-copy --save -dev
```

## 配置

| 参数       | 类型    | 默认  | 描述                                                  |
| ---------- | ------- | ----- | ----------------------------------------------------- |
| fromPath   | string  | 无    | 来源路径                                              |
| outputPath | string  | 无    | 输出路径                                              |
| once       | boolean | false | false: 每次编译后执行一次, true: 首次编译结束执行一次 |

```javaScript
// 配置实例
const config = {
  ...
  plugins: [
    [
      'tarojs-plugin-copy',
      {
        fromPath: path.resolve(__dirname, '../dist'),
        outputPath: path.resolve(process.cwd(), '../outputTest'),
      }
    ]
  ],
  ...
}

```