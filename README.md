## uni-icon
在UNIAPP项目中，引入阿里图标库，但是无法使用svg图标，```uni-icon```可以在本地进行转换，可以像阿里图标库引入图标那样，在**小程序**和**H5**引入svg图标，无需添加任何组件

**建议通过npm的方式安装使用**
## 通过引入文件使用（不建议！！！
1. 解压插件包后，找到dist目录下的文件，复制到项目根目录下的新目录下
2. 本地UNIAPP项目的根目录下创建一个unicon.config.js配置文件，符合CommonJS格式
   ```JS
   module.exports = {
      output: 'src/static/icon/iconfont.css',
      singleColorSvg: [],
      url: '//at.alicdn.com/t/c/font_2719016_pki5wig395f.js'
   }
   ```
    *字段解释：* <br />
    output：转换生成后的css文件，输出的路径，写法要符合Unix的规范；**必填** <br />
    singleColorSvg：单独进行转换的单色svg图标；**选填** <br />
    url：在阿里图标库的项目中，```Symbol```按钮生成的图标CDN地址；**必填** <br />
2. 在```package.json```的脚本命令中添加一个命令
  ```js
    "scripts": {
      // ......
      "icon": "node xxx（在第一步创建的目录名）/bin/uni-icon.js"
    }
  ```
3. 以上步骤完成后，运行```npm run icon```，会在output路径输入转换后的CSS文件
4. 然后在UNIAPP的项目中引入对应的类名，（和使用iconfont中的类一样）

## 通过npm方式
### Installation
----------------
    npm install uni-icon -D

### Usage
---------
1. 本地UNIAPP项目的根目录下创建一个unicon.config.js配置文件，符合CommonJS格式
   ```JS
   module.exports = {
      output: 'src/static/icon/iconfont.css',
      singleColorSvg: [],
      url: '//at.alicdn.com/t/c/font_2719016_pki5wig395f.js'
   }
   ```
    *字段解释：* <br />
    output：转换生成后的css文件，输出的路径，写法要符合Unix的规范；**必填** <br />
    singleColorSvg：单独进行转换的单色svg图标；**选填** <br />
    url：在阿里图标库的项目中，```Symbol```按钮生成的图标CDN地址；**必填** <br />
2. 在```package.json```的脚本命令中添加一个命令
  ```js
    "scripts": {
      // ......
      "icon": "uni-icon"
    }
  ```
3. 以上步骤完成后，运行```npm run icon```，会在output路径输入转换后的CSS文件
4. 然后在UNIAPP的项目中引入对应的类名，（和使用iconfont中的类一样）
   