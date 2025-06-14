# 代码文件内容提取与统计工具
# Code File Content Extraction and Statistics Tool

[中文](#代码文件内容提取与统计工具) | [English](#code-file-content-extraction-and-statistics-tool-1)

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=TownBoats/codeMerge&type=Date)](https://www.star-history.com/#TownBoats/codeMerge&Date)

# 代码文件内容提取与统计工具

一个用于提取和统计代码文件内容的Web工具，特别适合准备用于大语言模型（如GPT、Claude）的代码分析。

## 界面预览

![Main Interface](./images/img1.png)
*Main Interface - Supporting file upload and configuration*

![Statistics Result](./images/img2.png)
*Statistics Result - Showing detailed token and character statistics*

## 功能特点

- 📁 支持文件夹和单个文件上传
- 🔍 自动识别和过滤二进制文件
- 📊 提供详细的统计信息
  - 字符数统计
  - 多种模型的Token计算（GPT-3.5、GPT-4、Claude）
- ⚡ 代码压缩功能
- 🚫 智能文件夹过滤系统
  - 支持从.gitignore文件自动读取忽略规则
    - 自动检测项目根目录的.gitignore文件
    - 支持单独上传.gitignore文件直接应用
  - 专门选项控制是否忽略.git文件夹
  - 自定义黑名单文件夹设置
- 📥 自动生成汇总文本文件
- 🌲 自动生成文件夹树状结构视图
  - 直观展示项目文件组织
  - 支持复制树状结构
  - 自动过滤黑名单中的文件和文件夹
- 🔄 灵活处理模式
  - 完整处理模式：提取文件树和合并文件内容
  - 仅文件树模式：只生成项目结构，不处理文件内容

🌐 [在线演示](http://codemerge.131.996h.cn/)

## 支持的文件类型

### 代码文件
- JavaScript (.js)
- Python (.py)
- Java (.java)
- C++ (.cpp, .h)
- C# (.cs)
- PHP (.php)
- Ruby (.rb)
- Swift (.swift)
- Go (.go)
- Rust (.rs)
- TypeScript (.ts)
- JSX/TSX (.jsx, .tsx)

### 配置和文本文件
- JSON (.json)
- YAML (.yaml, .yml)
- XML (.xml)
- TOML (.toml)
- INI (.ini)
- 配置文件 (.conf)
- 文本文件 (.txt)
- 日志文件 (.log)
- Markdown (.md)
- CSV (.csv)

## 使用方法

1. **文件选择**
   - 点击"文件夹上传"选择整个项目文件夹
   - 或点击"文件上传"选择单个或多个文件

2. **.gitignore处理**
   - 选择文件夹后，系统会自动检测根目录中的.gitignore文件
   - 或者可以单独上传.gitignore文件并点击"应用"
   - .gitignore规则会自动添加到黑名单设置中

3. **处理选项设置**
   - 选择处理模式：完整处理或仅生成文件树
   - 选择是否使用.gitignore文件中的规则
   - 选择是否忽略.git文件夹
   - 自定义黑名单文件夹

4. **代码处理选项**
   - 选择是否压缩代码（删除多余空白）

5. **开始处理**
   - 点击"开始处理"按钮
   - 等待处理完成
   - 根据选择的模式查看文件树或合并内容

## 统计信息

工具会提供以下统计数据：
- 处理的文件总数
- 跳过的文件数
- 总字符数
- 各模型的预估Token数
  - GPT-3.5
  - GPT-4
  - Claude

## 本地部署

1. 下载项目文件
2. 直接在浏览器中打开 `index.html` 文件
3. 无需安装其他依赖，所有必要的库都通过CDN加载

## 注意事项

- 所有处理都在浏览器本地进行，不会上传文件到服务器
- 大文件夹处理可能需要一定时间，请耐心等待
- 建议使用现代浏览器（Chrome、Firefox、Edge等）以获得最佳体验
- 某些文件可能因编码问题无法正确读取

## 技术栈

- HTML5
- Tailwind CSS
- JavaScript
- GPT-3 Tokenizer
- js-beautify

## 贡献

欢迎提交Issue和Pull Request来改进这个工具。

## 许可证

MIT License

---

# Code File Content Extraction and Statistics Tool

A web-based tool for extracting and analyzing code file contents, particularly suitable for preparing code analysis for Large Language Models (like GPT, Claude).

## Interface Preview

![Main Interface](./images/img1.png)
*Main Interface - Supporting file upload and configuration*

![Statistics Result](./images/img2.png)
*Statistics Result - Showing detailed token and character statistics*

## Features

- 📁 Support for folder and single file uploads
- 🔍 Automatic binary file detection and filtering
- 📊 Detailed statistics
  - Character count
  - Token calculation for various models (GPT-3.5, GPT-4, Claude)
- ⚡ Code compression functionality
- 🚫 Smart folder filtering system
  - Support for automatically reading rules from .gitignore files
    - Auto-detection of .gitignore in project root directory
    - Support for uploading standalone .gitignore files
  - Dedicated option to control ignoring .git folder
  - Custom blacklist folder settings
- 📥 Automatic summary text file generation
- 🌲 Folder tree structure visualization
  - Intuitive project file organization display
  - Copy tree structure functionality
  - Automatic filtering of blacklisted files and folders
- 🔄 Flexible processing modes
  - Full processing: Extract file tree and merge file contents
  - Tree-only mode: Only generate project structure without processing file contents

🌐 [Online Demo](http://codemerge.131.996h.cn/)

## Supported File Types

### Code Files
- JavaScript (.js)
- Python (.py)
- Java (.java)
- C++ (.cpp, .h)
- C# (.cs)
- PHP (.php)
- Ruby (.rb)
- Swift (.swift)
- Go (.go)
- Rust (.rs)
- TypeScript (.ts)
- JSX/TSX (.jsx, .tsx)

### Configuration and Text Files
- JSON (.json)
- YAML (.yaml, .yml)
- XML (.xml)
- TOML (.toml)
- INI (.ini)
- Configuration files (.conf)
- Text files (.txt)
- Log files (.log)
- Markdown (.md)
- CSV (.csv)

## How to Use

1. **File Selection**
   - Click "Upload Folder" to select an entire project folder
   - Or click "Upload File" to select single or multiple files

2. **.gitignore Processing**
   - After selecting a folder, the system will automatically detect .gitignore in the root directory
   - Or you can upload a .gitignore file separately and click "Apply"
   - .gitignore rules will be automatically added to blacklist settings

3. **Processing Options Setup**
   - Choose processing mode: Full processing or Tree-only
   - Choose whether to use rules from .gitignore file
   - Choose whether to ignore .git folder
   - Customize blacklist folders

4. **Code Processing Options**
   - Choose whether to compress code (remove excess whitespace)

5. **Start Processing**
   - Click "Start Processing" button
   - Wait for processing to complete
   - View file tree or merged content based on selected mode

## Statistics

The tool provides the following statistics:
- Total files processed
- Number of files skipped
- Total character count
- Estimated token count for various models
  - GPT-3.5
  - GPT-4
  - Claude

## Local Deployment

1. Download project files
2. Open `index.html` directly in your browser
3. No additional dependencies needed, all required libraries are loaded via CDN

## Notes

- All processing is done locally in the browser, no files are uploaded to servers
- Large folders may take some time to process, please be patient
- Recommended to use modern browsers (Chrome, Firefox, Edge, etc.) for best experience
- Some files may not be read correctly due to encoding issues

## Tech Stack

- HTML5
- Tailwind CSS
- JavaScript
- GPT-3 Tokenizer
- js-beautify

## Contributing

Issues and Pull Requests are welcome to improve this tool.

## License

MIT License
