// HTML 模板 - 包含完整的界面内容，此文件没有更新维护
const HTML_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Code File Content Extraction and Statistics Tool</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/gpt-3-encoder/dist/gpt-3-encoder.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.7/beautify.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.7/beautify-css.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.7/beautify-html.min.js"></script>
    ${index.html的完整内容}
</head>
<body class="bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">代码文件内容提取与统计工具</h1>
        
        <div class="bg-white rounded-xl shadow-lg p-8 mb-6 space-y-6">
            <!-- 文件上传区域 -->
            <div class="grid md:grid-cols-2 gap-6">
                <div class="upload-area rounded-lg p-6 text-center">
                    <label class="block text-lg font-medium text-gray-700 mb-4">文件夹上传</label>
                    <input type="file" id="folderInput" webkitdirectory directory multiple
                        class="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
                    <p class="text-sm text-gray-500 mt-2">选择整个文件夹进行分析</p>
                </div>
                
                <div class="upload-area rounded-lg p-6 text-center">
                    <label class="block text-lg font-medium text-gray-700 mb-4">文件上传</label>
                    <input type="file" id="fileInput" multiple
                        class="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
                    <p class="text-sm text-gray-500 mt-2">选择一个或多个文件</p>
                </div>
            </div>

            <!-- 选中文件列表 -->
            <div id="selectedFiles" class="file-list mt-6 border rounded-lg p-4 hidden bg-gray-50">
                <h3 class="text-lg font-medium text-gray-700 mb-3">已选择的文件</h3>
                <div id="fileList" class="space-y-2">
                    <!-- 文件列表将在这里动态显示 -->
                </div>
            </div>

            <!-- 选项设置区域 -->
            <div class="grid md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                <div class="space-y-4">
                    <h3 class="text-lg font-medium text-gray-700">代码处理选项</h3>
                    <label class="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm">
                        <input type="checkbox" id="compressCode" class="w-5 h-5 rounded text-blue-600">
                        <div>
                            <span class="text-gray-700 font-medium">压缩代码</span>
                            <p class="text-sm text-gray-500 mt-1">删除多余空格、换行等，减少文件大小</p>
                        </div>
                    </label>
                </div>

                <div class="space-y-4">
                    <h3 class="text-lg font-medium text-gray-700">Token计算模型</h3>
                    <div class="space-y-3 bg-white p-4 rounded-lg shadow-sm">
                        <label class="flex items-center space-x-3">
                            <input type="radio" name="tokenModel" value="gpt3" checked
                                class="w-4 h-4 text-blue-600">
                            <span class="text-gray-700">GPT-3.5</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="radio" name="tokenModel" value="gpt4"
                                class="w-4 h-4 text-blue-600">
                            <span class="text-gray-700">GPT-4</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="radio" name="tokenModel" value="claude"
                                class="w-4 h-4 text-blue-600">
                            <span class="text-gray-700">Claude</span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- 添加黑名单设置区域 -->
            <div class="p-4 bg-gray-50 rounded-lg">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-gray-700">黑名单设置</h3>
                    <button onclick="saveBlacklist()" 
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        保存设置
                    </button>
                </div>
                <div class="mb-4">
                    <p class="text-sm text-gray-600 mb-2">这些文件夹将被自动跳过处理：</p>
                    <textarea id="blacklistInput" rows="6" 
                        class="w-full p-3 border rounded-lg text-sm font-mono"
                        placeholder="每行输入一个文件夹名称"></textarea>
                </div>
                <div class="text-sm text-gray-500">
                    提示：每行输入一个文件夹名称，这些文件夹及其子文件夹中的文件将被跳过。
                </div>
            </div>

            <!-- 支持的文件类型说明 -->
            <div class="bg-blue-50 p-6 rounded-lg">
                <h4 class="text-lg font-medium text-blue-800 mb-3">支持的文件类型</h4>
                <div class="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                    <div>
                        <p class="font-medium mb-2">代码文件</p>
                        <p>.js, .py, .java, .cpp, .h, .cs, .php, .rb, .swift, .go, .rs, .ts, .jsx, .tsx</p>
                    </div>
                    <div>
                        <p class="font-medium mb-2">其他文件</p>
                        <p>.json, .yaml, .yml, .xml, .toml, .ini, .conf, .txt, .log, .md, .csv</p>
                    </div>
                </div>
            </div>

            <button onclick="processFiles()" 
                class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg">
                开始处理
            </button>
        </div>

        <!-- 进度条 -->
        <div id="progress" class="bg-white rounded-lg shadow-lg p-6 mb-6 hidden">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">处理进度</h3>
            <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-blue-600 h-3 rounded-full transition-all duration-300 progress-pulse" id="progressBar" style="width: 0%"></div>
            </div>
            <div id="progressText" class="text-sm text-gray-600 mt-3 text-center font-medium">0%</div>
        </div>

        <!-- 统计信息 -->
        <div id="stats" class="bg-white rounded-lg shadow-lg p-6 mb-6 hidden">
            <h3 class="text-lg font-semibold text-gray-800 mb-6">统计信息</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div class="text-sm font-medium text-blue-800">处理文件数</div>
                    <div id="totalFileCount" class="text-2xl font-bold text-blue-600">0</div>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                    <div class="text-sm font-medium text-green-800">总字符数</div>
                    <div id="totalCharCount" class="text-2xl font-bold text-green-600">0</div>
                </div>
                <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                    <div class="text-sm font-medium text-yellow-800">跳过文件数</div>
                    <div id="skippedFileCount" class="text-2xl font-bold text-yellow-600">0</div>
                </div>
            </div>
            
            <div class="mt-6">
                <h4 class="text-lg font-medium text-gray-700 mb-4">Token 统计</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                        <div class="text-sm font-medium text-purple-800">GPT-3.5</div>
                        <div id="gpt3TokenCount" class="text-2xl font-bold text-purple-600">0</div>
                    </div>
                    <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg">
                        <div class="text-sm font-medium text-indigo-800">GPT-4</div>
                        <div id="gpt4TokenCount" class="text-2xl font-bold text-indigo-600">0</div>
                    </div>
                    <div class="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg">
                        <div class="text-sm font-medium text-pink-800">Claude</div>
                        <div id="claudeTokenCount" class="text-2xl font-bold text-pink-600">0</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 状态信息 -->
        <div id="status" class="bg-white rounded-lg shadow-lg p-6"></div>
    </div>

<script>
    // 修改黑名单配置相关代码
    let BLACKLIST_FOLDERS = [
        'node_modules',
        'dist',
        'build',
        'target',
        'bin',
        'obj',
        'vendor',
        '.git',
        '.idea',
        '.vscode',
        '__pycache__',
        'venv',
        'env',
        '.env',
        'coverage',
        'tmp',
        'temp'
    ];

    // 存储选择的文件
    let selectedFiles = new Map();
    let totalFiles = 0;
    let processedFiles = 0;
    let skippedFiles = 0;
    let totalChars = 0;
    let totalGPT3Tokens = 0;
    let totalGPT4Tokens = 0;
    let totalClaudeTokens = 0;

    // 初始化文件选择监听器
    document.getElementById('fileInput').addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const fileId = \`file_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
            selectedFiles.set(fileId, file);
        });
        updateFileList();
        // 清空input，允许重复选择相同文件
        e.target.value = '';
    });

    // 更新文件列表显示
    function updateFileList() {
        const fileListElement = document.getElementById('fileList');
        const selectedFilesContainer = document.getElementById('selectedFiles');
        
        if (selectedFiles.size === 0) {
            selectedFilesContainer.classList.add('hidden');
            return;
        }

        selectedFilesContainer.classList.remove('hidden');
        fileListElement.innerHTML = '';

        selectedFiles.forEach((file, fileId) => {
            const fileElement = document.createElement('div');
            fileElement.className = 'flex items-center justify-between bg-gray-50 p-2 rounded';
            fileElement.innerHTML = \`
                <span class="text-sm text-gray-600">\${file.name}</span>
                <button onclick="removeFile('\${fileId}')" 
                    class="text-red-500 hover:text-red-700 text-sm px-2 py-1">
                    ✕
                </button>
            \`;
            fileListElement.appendChild(fileElement);
        });
    }

    // 移除文件
    function removeFile(fileId) {
        selectedFiles.delete(fileId);
        updateFileList();
    }

    // 计算不同模型的token数
    function calculateTokens(text) {
        const gpt3Tokens = encode(text).length;
        const gpt4Tokens = Math.ceil(gpt3Tokens * 1.09);
        const claudeTokens = Math.ceil(text.length / 4);
        
        return {
            gpt3: gpt3Tokens,
            gpt4: gpt4Tokens,
            claude: claudeTokens
        };
    }

    // 代码压缩函数
    function compressCode(code, fileExtension) {
        try {
            const ext = fileExtension.toLowerCase();
            if (ext.includes('js') || ext.includes('ts') || ext.includes('jsx') || ext.includes('tsx')) {
                return js_beautify(code, { 
                    indent_size: 1,
                    space_in_empty_paren: false,
                    preserve_newlines: false,
                    max_preserve_newlines: 0,
                    break_chained_methods: false,
                    keep_array_indentation: false,
                    space_before_conditional: false
                });
            } else if (ext.includes('css')) {
                return css_beautify(code, {
                    indent_size: 1,
                    preserve_newlines: false,
                    max_preserve_newlines: 0
                });
            } else if (ext.includes('html')) {
                return html_beautify(code, {
                    indent_size: 1,
                    preserve_newlines: false,
                    max_preserve_newlines: 0
                });
            } else {
                return code
                    .replace(/\\s+/g, ' ')
                    .replace(/[\\n\\r]+/g, '\\n')
                    .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '')
                    .replace(/\\/\\/.*/g, '')
                    .trim();
            }
        } catch (error) {
            console.error('压缩代码时出错:', error);
            return code;
        }
    }

    function isProcessableFile(file) {
        const binaryMimeTypes = [
            'image/',
            'video/',
            'audio/',
            'application/pdf',
            'application/zip',
            'application/x-zip',
            'application/x-rar-compressed',
            'application/x-7z-compressed',
            'application/x-executable',
            'application/x-shockwave-flash',
            'application/x-msdownload',
            'application/octet-stream',
            'application/x-deb',
            'application/x-debian-package',
            'application/x-rpm',
            'application/x-msi'
        ];

        if (file.type) {
            return !binaryMimeTypes.some(type => file.type.startsWith(type));
        }

        const binaryExtensions = [
            '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.ico', '.webp',
            '.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv',
            '.mp3', '.wav', '.ogg', '.m4a',
            '.pdf', '.zip', '.rar', '.7z', '.tar', '.gz',
            '.exe', '.dll', '.so', '.dylib',
            '.iso', '.img',
            '.deb', '.rpm', '.msi'
        ];

        return !binaryExtensions.some(ext => 
            file.name.toLowerCase().endsWith(ext)
        );
    }
    
    // 添加黑名单检查函数
    function isInBlacklist(filePath) {
        return BLACKLIST_FOLDERS.some(folder => 
            filePath.split('/').includes(folder) || 
            filePath.split('\\\\').includes(folder)
        );
    }

    // 修改文件处理函数
    async function processFiles() {
        const folderFiles = Array.from(document.getElementById('folderInput').files)
            .filter(file => !isInBlacklist(file.webkitRelativePath));
        const individualFiles = Array.from(selectedFiles.values());
        const allFiles = [...folderFiles, ...individualFiles];
        
        if (allFiles.length === 0) {
            alert('请选择文件或文件夹！');
            return;
        }

        // 重置计数器
        totalFiles = allFiles.length;
        processedFiles = 0;
        skippedFiles = 0;
        totalChars = 0;
        totalGPT3Tokens = 0;
        totalGPT4Tokens = 0;
        totalClaudeTokens = 0;
        
        let output = '';
        const status = document.getElementById('status');
        status.innerHTML = '';
        
        document.getElementById('progress').classList.remove('hidden');
        document.getElementById('stats').classList.remove('hidden');

        const shouldCompress = document.getElementById('compressCode').checked;

        for (const file of allFiles) {
            try {
                const filePath = file.webkitRelativePath || file.name;
                
                // 检查是否在黑名单中
                if (isInBlacklist(filePath)) {
                    skippedFiles++;
                    status.innerHTML += \`
                        <div class="flex items-center space-x-2 text-sm mb-2">
                            <span class="text-yellow-500">⚠</span>
                            <span class="text-gray-700">\${filePath}</span>
                            <span class="text-yellow-500">跳过黑名单文件夹中的文件</span>
                        </div>\`;
                    updateProgress();
                    continue;
                }

                if (!isProcessableFile(file)) {
                    skippedFiles++;
                    status.innerHTML += \`
                        <div class="flex items-center space-x-2 text-sm mb-2">
                            <span class="text-yellow-500">⚠</span>
                            <span class="text-gray-700">\${filePath}</span>
                            <span class="text-yellow-500">跳过二进制或媒体文件</span>
                        </div>\`;
                    updateProgress();
                    continue;
                }

                let content = await readFile(file);
                
                if (shouldCompress) {
                    const fileExtension = filePath.split('.').pop();
                    content = compressCode(content, fileExtension);
                }

                const charCount = content.length;
                const tokens = calculateTokens(content);
                
                totalChars += charCount;
                totalGPT3Tokens += tokens.gpt3;
                totalGPT4Tokens += tokens.gpt4;
                totalClaudeTokens += tokens.claude;
                
                output += \`=== 文件路径: \${filePath} ===\\n\`;
                output += \`字符数: \${charCount}\\n\`;
                output += \`GPT-3.5 Tokens: \${tokens.gpt3}\\n\`;
                output += \`GPT-4 Tokens: \${tokens.gpt4}\\n\`;
                output += \`Claude Tokens: \${tokens.claude}\\n\\n\`;
                output += content;
                output += '\\n\\n' + '='.repeat(50) + '\\n\\n';
                
                status.innerHTML += \`
                    <div class="flex items-center space-x-2 text-sm mb-2">
                        <span class="text-green-500">✓</span>
                        <span class="text-gray-700">\${filePath}</span>
                        <span class="text-gray-500">
                            (\${charCount.toLocaleString()} 字符, 
                            GPT3: \${tokens.gpt3.toLocaleString()}, 
                            GPT4: \${tokens.gpt4.toLocaleString()}, 
                            Claude: \${tokens.claude.toLocaleString()} tokens)
                        </span>
                    </div>\`;
            } catch (error) {
                skippedFiles++;
                status.innerHTML += \`
                    <div class="flex items-center space-x-2 text-sm mb-2">
                        <span class="text-red-500">✗</span>
                        <span class="text-gray-700">\${file.webkitRelativePath || file.name}</span>
                        <span class="text-red-500">\${error}</span>
                    </div>\`;
            }
            
            updateProgress();
        }

        // 更新统计信息显示
        document.getElementById('totalFileCount').textContent = (totalFiles - skippedFiles).toLocaleString();
        document.getElementById('skippedFileCount').textContent = skippedFiles.toLocaleString();
        document.getElementById('totalCharCount').textContent = totalChars.toLocaleString();
        document.getElementById('gpt3TokenCount').textContent = totalGPT3Tokens.toLocaleString();
        document.getElementById('gpt4TokenCount').textContent = totalGPT4Tokens.toLocaleString();
        document.getElementById('claudeTokenCount').textContent = totalClaudeTokens.toLocaleString();

        if (totalChars > 0) {
            downloadOutput(output);
        }
    }

    function readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('文件读取失败'));
            reader.readAsText(file);
        });
    }

    function updateProgress() {
        processedFiles++;
        const percentage = Math.round((processedFiles / totalFiles) * 100);
        document.getElementById('progressBar').style.width = percentage + '%';
        document.getElementById('progressText').textContent = \`\${percentage}% (\${processedFiles}/\${totalFiles})\`;
    }

    function downloadOutput(content) {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '文件内容汇总_' + new Date().toISOString().slice(0,19).replace(/:/g, '-') + '.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function encode(text) {
        try {
            return window.gpt3TokenizerImport.encode(text);
        } catch (error) {
            console.error('Tokenizer error:', error);
            return [];
        }
    }

    // 页面加载时初始化黑名单输入框
    document.addEventListener('DOMContentLoaded', function() {
        const blacklistInput = document.getElementById('blacklistInput');
        blacklistInput.value = BLACKLIST_FOLDERS.join('\\n');
        
        // 更新选择的文件统计
        updateFileStats();
    });

    // 保存黑名单设置
    function saveBlacklist() {
        const blacklistInput = document.getElementById('blacklistInput');
        BLACKLIST_FOLDERS = blacklistInput.value
            .split('\\n')
            .map(item => item.trim())
            .filter(item => item !== '');
        
        // 更新文件统计
        updateFileStats();
        
        // 显示保存成功提示
        const status = document.getElementById('status');
        status.innerHTML = \`
            <div class="flex items-center space-x-2 text-sm mb-2 bg-green-50 p-3 rounded">
                <span class="text-green-500">✓</span>
                <span class="text-green-700">黑名单设置已更新</span>
            </div>
        \`;
    }

    // 添加文件统计更新函数
    function updateFileStats() {
        const folderInput = document.getElementById('folderInput');
        if (folderInput.files.length > 0) {
            const totalCount = folderInput.files.length;
            const blacklistedCount = Array.from(folderInput.files)
                .filter(file => isInBlacklist(file.webkitRelativePath))
                .length;
            
            const statsDiv = document.createElement('div');
            statsDiv.className = 'text-sm text-gray-600 mt-2';
            statsDiv.innerHTML = \`
                总文件数：\${totalCount} | 
                将被跳过：\${blacklistedCount} |
                实际处理：\${totalCount - blacklistedCount}
            \`;
            
            const uploadArea = folderInput.closest('.upload-area');
            const existingStats = uploadArea.querySelector('.text-sm:not(.text-gray-500)');
            if (existingStats) {
                existingStats.remove();
            }
            uploadArea.appendChild(statsDiv);
        }
    }

    // 修改文件选择监听器
    document.getElementById('folderInput').addEventListener('change', function(e) {
        updateFileStats();
    });
</script>
</body>
</html>`;

// Cloudflare Worker 处理请求
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // 处理主页请求
  if (url.pathname === '/' || url.pathname === '/index.html') {
    return new Response(HTML_TEMPLATE, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    })
  }

  // 404 处理
  return new Response('Not found', { status: 404 })
} 