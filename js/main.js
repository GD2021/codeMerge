

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

// 保存用户默认黑名单（不包含可选的.git）
let DEFAULT_BLACKLIST_FOLDERS = BLACKLIST_FOLDERS.filter(folder => folder !== '.git');

// 新增扩展名黑名单
let BLACKLIST_EXTENSIONS = [
    '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.ico', '.webp',
    '.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv',
    '.mp3', '.wav', '.ogg', '.m4a',
    '.pdf', '.zip', '.rar', '.7z', '.tar', '.gz',
    '.exe', '.dll', '.so', '.dylib'
];

// 存储选择的文件
let selectedFiles = new Map();
let totalFiles = 0;
let processedFiles = 0;
let skippedFiles = 0;
let totalChars = 0;
let totalRegexTokens = 0;

// 存储合并后的内容
let mergedContent = '';

// 初始化文件选择监听器
document.getElementById('fileInput').addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        selectedFiles.set(fileId, file);
    });
    updateFileList();
    updateFileStatus(files);

    // 更新状态
    const totalFiles = selectedFiles.size;
    if (totalFiles > 0) {
        updateStatus('ready', 'filesSelected', totalFiles);
    } else {
        updateStatus('ready', 'ready');
    }

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

    // 创建网格布局容器
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2';

    selectedFiles.forEach((file, fileId) => {
        const fileElement = document.createElement('div');
        fileElement.className = 'flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-200';

        // 截断长文件名
        const displayName = file.name.length > 25 ? file.name.substring(0, 22) + '...' : file.name;

        fileElement.innerHTML = `
            <div class="flex items-center min-w-0 flex-1">
                <svg class="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm text-gray-700 truncate" title="${file.name}">${displayName}</span>
            </div>
            <button onclick="removeFile('${fileId}')"
                class="ml-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full p-1 transition-colors duration-200 flex-shrink-0"
                title="Remove file">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
            </button>
        `;
        gridContainer.appendChild(fileElement);
    });

    fileListElement.appendChild(gridContainer);

    // 添加文件数量统计
    const countElement = document.createElement('div');
    countElement.className = 'mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500 text-center';

    // 使用翻译函数显示文件计数
    const countText = (typeof getTranslation === 'function') ?
        `${getTranslation('filesSelected')} ${selectedFiles.size} ${getTranslation('files')}` :
        `Selected ${selectedFiles.size} files`;

    countElement.textContent = countText;
    fileListElement.appendChild(countElement);
}

// 移除文件
function removeFile(fileId) {
    if (selectedFiles.has(fileId)) {
        selectedFiles.delete(fileId);
        updateFileList();
        updateFileStatus(Array.from(selectedFiles.values()));

        // 如果没有文件了，隐藏容器
        if (selectedFiles.size === 0) {
            const selectedFilesContainer = document.getElementById('selectedFiles');
            selectedFilesContainer.classList.add('hidden');
        }
    }
}

// 清除所有文件
function clearAllFiles() {
    selectedFiles.clear();
    const selectedFilesContainer = document.getElementById('selectedFiles');
    selectedFilesContainer.classList.add('hidden');
    updateFileStatus([]);
}



// 使用正则表达式计算Token数的函数
function roughTokenCount(text) {
    const tokens = text.match(/\w+|[^\s\w]/g);
    return tokens ? tokens.length : 0;
}

// 计算token数 - 只使用正则表达式
function calculateTokens(text) {
    try {
        // 使用正则表达式计算tokens
        const regexTokens = roughTokenCount(text);
        
        console.log('Token calculation (regex only):', regexTokens);
        
        return {
            regex: regexTokens
        };
    } catch (error) {
        console.error('Token calculation error:', error);
        return {
            regex: 0
        };
    }
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
                .replace(/\s+/g, ' ')
                .replace(/[\n\r]+/g, '\n')
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/\/\/.*/g, '')
                .trim();
        }
    } catch (error) {
        console.error(getTranslation('compressionError') + ':', error);
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
    // 检查文件夹是否在黑名单中
    const inFolderBlacklist = BLACKLIST_FOLDERS.some(folder => 
        filePath.split('/').includes(folder) || 
        filePath.split('\\').includes(folder)
    );
    
    if (inFolderBlacklist) return true;
    
    // 检查文件扩展名是否在黑名单中
    return BLACKLIST_EXTENSIONS.some(ext => {
        // 确保扩展名格式正确（以.开头）
        const formattedExt = ext.startsWith('.') ? ext : '.' + ext;
        return filePath.toLowerCase().endsWith(formattedExt.toLowerCase());
    });
}

// 修改文件处理函数
async function processFiles() {
    const folderInput = document.getElementById('folderInput');
    const folderFiles = Array.from(folderInput.files);
    const individualFiles = Array.from(selectedFiles.values());
    
    // 获取处理模式和选项
    const isTreeOnlyMode = document.getElementById('modeTreeOnly').checked;
    const shouldUseGitignore = document.getElementById('useGitignore').checked;
    const shouldIgnoreGit = document.getElementById('ignoreGit').checked;
    
    // 更新黑名单（确保最新设置被应用）
    const blacklistInput = document.getElementById('blacklistInput');
    // 获取用户自定义的黑名单内容
    const userBlacklist = blacklistInput.value
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '');
    
    // 根据ignoreGit选项确定最终的黑名单
    BLACKLIST_FOLDERS = shouldIgnoreGit 
        ? [...userBlacklist, '.git'] 
        : [...userBlacklist];
    
    // 更新文本框以反映当前设置
    blacklistInput.value = BLACKLIST_FOLDERS.join('\n');
    
    // 更新扩展名黑名单
    const blacklistExtInput = document.getElementById('blacklistExtInput');
    BLACKLIST_EXTENSIONS = blacklistExtInput.value
        .split('\n')
        .map(item => {
            // 确保扩展名格式正确（以.开头）
            item = item.trim();
            return item !== '' ? (item.startsWith('.') ? item : '.' + item) : '';
        })
        .filter(item => item !== '');
    
    // 过滤掉黑名单文件，但记录被跳过的文件
    const filteredFolderFiles = [];
    let blacklistSkippedCount = 0;

    folderFiles.forEach(file => {
        const filePath = file.webkitRelativePath;

        // 检查是否在黑名单中
        if (isInBlacklist(filePath)) {
            // 只计数，不记录详细信息（用户无法查看）
            blacklistSkippedCount++;
            return;
        }

        filteredFolderFiles.push(file);
    });
    
    const allFiles = [...filteredFolderFiles, ...individualFiles];

    if (allFiles.length === 0 && blacklistSkippedCount === 0) {
        alert(getTranslation('pleaseSelectFiles'));
        return;
    }

    // 重置计数器
    // totalFiles 应该包含所有原始文件数（包括被黑名单过滤的）
    totalFiles = folderFiles.length + individualFiles.length;
    processedFiles = 0;
    skippedFiles = blacklistSkippedCount; // 初始化为黑名单跳过的文件数
    totalChars = 0;
    totalRegexTokens = 0;

    // 清除文件详情数据
    clearFileDetails();

    // 更新状态为处理中
    updateStatus('processing', 'processing');

    const status = document.getElementById('status');
    // 保留黑名单更新的消息，不清空状态区域
    // status.innerHTML = '';

    // 显示进度卡片和统计卡片
    document.getElementById('progressCard').classList.remove('hidden');
    document.getElementById('statsCard').classList.remove('hidden');
    
    // 如果是仅文件树模式，隐藏统计信息和合并内容区域
    if (isTreeOnlyMode) {
        document.getElementById('stats').classList.add('hidden');
        document.getElementById('resultActions').classList.add('hidden');
    } else {
        document.getElementById('stats').classList.remove('hidden');
        document.getElementById('resultActions').classList.remove('hidden');
    }

    const shouldCompress = document.getElementById('compressCode').checked;

    // 如果只需要处理文件树
    if (isTreeOnlyMode) {
        // 直接生成文件树，不处理文件内容
        if (folderFiles.length > 0) {
            generateFolderStructure(filteredFolderFiles);
            document.getElementById('folderStructure').classList.remove('hidden');
        } else {
            document.getElementById('folderStructure').classList.add('hidden');
        }
        
        // 更新进度
        processedFiles = totalFiles;
        updateProgress();
        return;
    }

    // 存储处理后的文件数据，用于最终合并
    const processedFileData = [];

    // 完整处理模式
    for (const file of allFiles) {
        try {
            const filePath = file.webkitRelativePath || file.name;

            // 文件过滤逻辑已经在筛选阶段处理，不需要重复检查黑名单

            if (!isProcessableFile(file)) {
                skippedFiles++;

                status.innerHTML += `
                    <div class="flex items-center space-x-2 text-sm mb-2">
                        <span class="text-yellow-500">⚠</span>
                        <span class="text-gray-700">${filePath}</span>
                        <span class="text-yellow-500">${getTranslation('willBeSkipped')}</span>
                    </div>`;
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
            totalRegexTokens += tokens.regex;

            // 记录处理成功的文件详情
            updateFileDetails(file, 'processed', {
                chars: charCount,
                tokens: tokens.regex
            });
            updateFileDetails(file, 'characters', {
                chars: charCount
            });
            updateFileDetails(file, 'tokens', {
                tokens: tokens.regex
            });

            // 将文件数据添加到处理列表中，用于最终合并
            processedFileData.push({
                filePath: filePath,
                content: content,
                stats: {
                    charCount: charCount,
                    tokens: tokens.regex
                }
            });

            status.innerHTML += `
                <div class="flex items-center space-x-2 text-sm mb-2">
                    <span class="text-green-500">✓</span>
                    <span class="text-gray-700">${filePath}</span>
                    <span class="text-gray-500">
                        (${charCount.toLocaleString()} ${getTranslation('chars')},
                        Regex: ${tokens.regex.toLocaleString()} tokens)
                    </span>
                </div>`;
        } catch (error) {
            skippedFiles++;

            status.innerHTML += `
                <div class="flex items-center space-x-2 text-sm mb-2">
                    <span class="text-red-500">✗</span>
                    <span class="text-gray-700">${file.webkitRelativePath || file.name}</span>
                    <span class="text-red-500">${getTranslation('fileReadError')}</span>
                </div>`;
        }
        
        updateProgress();
    }

    // 更新统计信息显示
    document.getElementById('totalFileCount').textContent = (totalFiles - skippedFiles).toLocaleString();
    document.getElementById('skippedFileCount').textContent = skippedFiles.toLocaleString();
    document.getElementById('totalCharCount').textContent = totalChars.toLocaleString();
    document.getElementById('totalTokenCount').textContent = totalRegexTokens.toLocaleString();

    if (totalChars > 0) {
        // 获取选择的输出格式
        const selectedFormat = document.querySelector('input[name="outputFormat"]:checked').value;
        let output = '';

        // 根据选择的格式调用相应的合并函数
        switch (selectedFormat) {
            case 'xml':
                output = window.mergeFileContentsXML(processedFileData, {
                    includeDirectoryStructure: true
                });
                break;
            case 'txt':
                output = window.mergeFileContentsTXT(processedFileData, {
                    includeDirectoryStructure: true
                });
                break;
            case 'md':
                output = window.mergeFileContentsMD(processedFileData, {
                    includeDirectoryStructure: true
                });
                break;
            case 'default':
            default:
                output = window.mergeFileContents(processedFileData, {
                    includeStats: true,
                    useTranslation: true
                });
                break;
        }

        // 保存合并内容并更新复制框
        mergedContent = output;
        document.getElementById('copyArea').value = output;

        // 显示结果卡片
        document.getElementById('resultCard').classList.remove('hidden');
    }

    // 生成文件夹结构
    if (folderFiles.length > 0) {
        generateFolderStructure(filteredFolderFiles);
        document.getElementById('folderStructure').classList.remove('hidden');
    } else {
        document.getElementById('folderStructure').classList.add('hidden');
    }

    // 更新状态为完成
    const processedCount = totalFiles - skippedFiles;
    updateProcessCompleteStatus(processedCount, skippedFiles);
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error(getTranslation('fileReadFailed')));
        reader.readAsText(file);
    });
}

function updateProgress() {
    processedFiles++;
    const percentage = Math.round((processedFiles / totalFiles) * 100);
    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `${percentage}% (${processedFiles}/${totalFiles})`;
}

function downloadOutput(content) {
    // 获取当前选择的输出格式
    const selectedFormat = document.querySelector('input[name="outputFormat"]:checked')?.value || 'default';
    // 使用新的contentMerger模块的下载功能
    window.downloadMergedContent(content, null, selectedFormat);
}

// 渲染文件夹黑名单标签
function renderFolderBlacklistTags() {
    const container = document.getElementById('folderBlacklistTags');
    if (!container) return;

    container.innerHTML = '';

    BLACKLIST_FOLDERS.forEach(folder => {
        const tag = createBlacklistTag(folder, 'folder');
        container.appendChild(tag);
    });

    // 更新隐藏的输入框以保持兼容性
    const blacklistInput = document.getElementById('blacklistInput');
    if (blacklistInput) {
        blacklistInput.value = BLACKLIST_FOLDERS.join('\n');
    }
}

// 渲染扩展名黑名单标签
function renderExtensionBlacklistTags() {
    const container = document.getElementById('extensionBlacklistTags');
    if (!container) return;

    container.innerHTML = '';

    BLACKLIST_EXTENSIONS.forEach(extension => {
        const tag = createBlacklistTag(extension, 'extension');
        container.appendChild(tag);
    });

    // 更新隐藏的输入框以保持兼容性
    const blacklistExtInput = document.getElementById('blacklistExtInput');
    if (blacklistExtInput) {
        blacklistExtInput.value = BLACKLIST_EXTENSIONS.join('\n');
    }
}

// 创建黑名单标签元素
function createBlacklistTag(text, type) {
    const tag = document.createElement('div');
    tag.className = 'inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs';

    const textSpan = document.createElement('span');
    textSpan.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '×';
    deleteBtn.className = 'text-blue-600 hover:text-red-600 hover:bg-red-100 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold transition-colors';
    deleteBtn.onclick = () => removeFromBlacklist(text, type);

    tag.appendChild(textSpan);
    tag.appendChild(deleteBtn);

    return tag;
}

// 添加文件夹到黑名单
function addFolderToBlacklist() {
    const input = document.getElementById('newFolderInput');
    const folder = input.value.trim();

    if (folder && !BLACKLIST_FOLDERS.includes(folder)) {
        BLACKLIST_FOLDERS.push(folder);
        renderFolderBlacklistTags();
        updateFileStats();
        input.value = '';

        // 显示成功提示
        showBlacklistUpdateStatus();
    }
}

// 将函数暴露到全局作用域
window.addFolderToBlacklist = addFolderToBlacklist;

// 添加扩展名到黑名单
function addExtensionToBlacklist() {
    const input = document.getElementById('newExtensionInput');
    let extension = input.value.trim();

    if (extension) {
        // 确保扩展名格式正确（以.开头）
        if (!extension.startsWith('.')) {
            extension = '.' + extension;
        }

        if (!BLACKLIST_EXTENSIONS.includes(extension)) {
            BLACKLIST_EXTENSIONS.push(extension);
            renderExtensionBlacklistTags();
            updateFileStats();
            input.value = '';

            // 显示成功提示
            showBlacklistUpdateStatus();
        }
    }
}

// 将函数暴露到全局作用域
window.addExtensionToBlacklist = addExtensionToBlacklist;

// 从黑名单中移除项目
function removeFromBlacklist(item, type) {
    if (type === 'folder') {
        const index = BLACKLIST_FOLDERS.indexOf(item);
        if (index > -1) {
            BLACKLIST_FOLDERS.splice(index, 1);
            renderFolderBlacklistTags();
        }
    } else if (type === 'extension') {
        const index = BLACKLIST_EXTENSIONS.indexOf(item);
        if (index > -1) {
            BLACKLIST_EXTENSIONS.splice(index, 1);
            renderExtensionBlacklistTags();
        }
    }

    updateFileStats();
    showBlacklistUpdateStatus();
}

// 显示黑名单更新状态
function showBlacklistUpdateStatus() {
    const status = document.getElementById('status');
    if (status) {
        status.innerHTML = `
            <div class="flex items-center space-x-2 text-sm mb-2 bg-green-50 p-3 rounded">
                <span class="text-green-500">✓</span>
                <span class="text-green-700">${getTranslation('blacklistUpdated')}</span>
            </div>
        `;

        // 3秒后清除状态
        setTimeout(() => {
            status.innerHTML = '';
        }, 3000);
    }
}

// 页面加载时初始化黑名单输入框
document.addEventListener('DOMContentLoaded', function() {
    const blacklistInput = document.getElementById('blacklistInput');
    if (blacklistInput) {
        blacklistInput.value = BLACKLIST_FOLDERS.join('\n');
    }

    // 初始化扩展名黑名单输入框
    const blacklistExtInput = document.getElementById('blacklistExtInput');
    if (blacklistExtInput) {
        blacklistExtInput.value = BLACKLIST_EXTENSIONS.join('\n');
    }

    // 渲染标签式界面
    renderFolderBlacklistTags();
    renderExtensionBlacklistTags();

    // 初始化语言模块
    if (window.LanguageModule) {
        window.LanguageModule.initLanguage();
    }

    // 更新选择的文件统计（在语言模块初始化之后）
    updateFileStats();

    // 添加gitignore文件选择监听器
    const gitignoreInput = document.getElementById('gitignoreInput');
    if (gitignoreInput) {
        gitignoreInput.addEventListener('change', function(e) {
            updateGitignoreStatus(e.target.files);
        });
    }
    
    // 初始化复制按钮事件
    document.getElementById('copyBtn').addEventListener('click', function() {
        const copyArea = document.getElementById('copyArea');
        copyArea.select();
        document.execCommand('copy');
        
        // 显示复制成功提示
        const copyStatus = document.getElementById('copyStatus');
        copyStatus.classList.remove('hidden');
        setTimeout(() => {
            copyStatus.classList.add('hidden');
        }, 2000);
    });
    
    // 初始化下载按钮事件
    document.getElementById('downloadBtn').addEventListener('click', function() {
        if (mergedContent) {
            downloadOutput(mergedContent);
        }
    });
    
    // 初始化复制结构按钮事件
    document.getElementById('copyStructureBtn').addEventListener('click', function() {
        const structureArea = document.getElementById('structureArea');
        const range = document.createRange();
        range.selectNode(structureArea);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        
        // 显示复制成功提示
        const structureCopyStatus = document.getElementById('structureCopyStatus');
        structureCopyStatus.classList.remove('hidden');
        setTimeout(() => {
            structureCopyStatus.classList.add('hidden');
        }, 2000);
    });
    
    // 添加忽略git选项变更事件
    document.getElementById('ignoreGit').addEventListener('change', function() {
        updateBlacklistForGit(this.checked);
    });

    // 添加回车键监听器用于快速添加
    const newFolderInput = document.getElementById('newFolderInput');
    if (newFolderInput) {
        newFolderInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addFolderToBlacklist();
            }
        });
    }

    const newExtensionInput = document.getElementById('newExtensionInput');
    if (newExtensionInput) {
        newExtensionInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addExtensionToBlacklist();
            }
        });
    }
});

// 保存黑名单设置
function saveBlacklist() {
    // 从隐藏的输入框读取数据（保持兼容性）
    const blacklistInput = document.getElementById('blacklistInput');
    if (blacklistInput && blacklistInput.value) {
        BLACKLIST_FOLDERS = blacklistInput.value
            .split('\n')
            .map(item => item.trim())
            .filter(item => item !== '');
    }

    // 保存扩展名黑名单
    const blacklistExtInput = document.getElementById('blacklistExtInput');
    if (blacklistExtInput && blacklistExtInput.value) {
        BLACKLIST_EXTENSIONS = blacklistExtInput.value
            .split('\n')
            .map(item => {
                // 确保扩展名格式正确（以.开头）
                item = item.trim();
                return item !== '' ? (item.startsWith('.') ? item : '.' + item) : '';
            })
            .filter(item => item !== '');
    }

    // 重新渲染标签界面
    renderFolderBlacklistTags();
    renderExtensionBlacklistTags();

    // 更新文件统计
    updateFileStats();

    // 显示保存成功提示
    showBlacklistUpdateStatus();
}

// 将函数暴露到全局作用域
window.saveBlacklist = saveBlacklist;

// 重置页面功能
function resetPage() {
    // 确认重置
    if (!confirm(getTranslation('resetConfirm'))) {
        return;
    }

    // 清除文件选择
    selectedFiles.clear();
    document.getElementById('fileInput').value = '';
    document.getElementById('folderInput').value = '';
    document.getElementById('gitignoreInput').value = '';

    // 重置状态
    updateStatus('ready', 'ready');

    // 隐藏所有卡片
    document.getElementById('selectedFiles').classList.add('hidden');
    document.getElementById('progressCard').classList.add('hidden');
    document.getElementById('statsCard').classList.add('hidden');
    document.getElementById('resultCard').classList.add('hidden');

    // 重置统计数据
    totalFiles = 0;
    processedFiles = 0;
    skippedFiles = 0;
    totalChars = 0;
    totalRegexTokens = 0;
    mergedContent = '';

    // 重置显示
    updateFileStats();
    document.getElementById('copyArea').value = '';

    // 重置状态文本
    document.getElementById('fileStatus').textContent = getTranslation('noFileSelected');
    document.getElementById('folderStatus').textContent = getTranslation('noFileSelected');
    document.getElementById('gitignoreStatus').textContent = getTranslation('noFileSelected');

    // 清除状态信息
    document.getElementById('status').innerHTML = '';

    console.log(getTranslation('pageReset'));
}

// 更新状态显示
function updateStatus(status, messageKey, count = null) {
    const statusIndicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');

    if (!statusIndicator || !statusText) return;

    // 移除所有状态类
    statusIndicator.className = 'w-2 h-2 rounded-full';

    switch(status) {
        case 'ready':
            statusIndicator.classList.add('bg-gray-400');
            break;
        case 'processing':
            statusIndicator.classList.add('bg-blue-500', 'animate-pulse');
            break;
        case 'complete':
            statusIndicator.classList.add('bg-green-500');
            break;
        case 'error':
            statusIndicator.classList.add('bg-red-500');
            break;
    }

    // 获取翻译文本并格式化
    let displayMessage = '';
    if (getTranslation && typeof getTranslation === 'function') {
        if (messageKey === 'filesSelected' && count !== null) {
            // 特殊处理文件选择状态
            displayMessage = `${getTranslation('filesSelected')} ${count} ${getTranslation('files')}`;
        } else {
            displayMessage = getTranslation(messageKey);
        }
    } else {
        displayMessage = messageKey; // 降级处理
    }

    statusText.textContent = displayMessage;
}

// 更新处理完成状态
function updateProcessCompleteStatus(processedCount, skippedCount) {
    const statusIndicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');

    if (!statusIndicator || !statusText) return;

    // 设置完成状态的样式
    statusIndicator.className = 'w-2 h-2 rounded-full bg-green-500';

    // 构建完成消息
    let message = '';
    if (getTranslation && typeof getTranslation === 'function') {
        message = `${getTranslation('processComplete')} ${processedCount} ${getTranslation('processedFiles')} ${skippedCount} ${getTranslation('skippedFiles')}`;
    } else {
        message = `Processing complete! Processed ${processedCount} files, skipped ${skippedCount} files`;
    }

    statusText.textContent = message;
}

// 存储文件详细信息
let fileDetails = {
    processed: [],
    characters: [],
    tokens: []
};

// 显示文件详情
function showFileDetails(type) {
    const detailsArea = document.getElementById('detailsArea');
    const detailsTitle = document.getElementById('detailsTitle');
    const detailsContent = document.getElementById('detailsContent');

    if (!detailsArea || !detailsTitle || !detailsContent) return;

    let title = '';
    let content = '';

    switch(type) {
        case 'processed':
            title = getTranslation('processedFiles');
            if (fileDetails.processed.length === 0) {
                content = `<div class="text-gray-500">${getTranslation('noProcessedFiles')}</div>`;
            } else {
                content = fileDetails.processed.map(file =>
                    `<div class="py-1 border-b border-gray-200 last:border-b-0">
                        <div class="font-medium">${file.name}</div>
                        <div class="text-gray-500">${file.chars} ${getTranslation('characters')}, ${file.tokens} ${getTranslation('tokens')}</div>
                    </div>`
                ).join('');
            }
            break;



        case 'characters':
            title = getTranslation('characterStats');
            if (fileDetails.characters.length === 0) {
                content = `<div class="text-gray-500">${getTranslation('noCharacterStats')}</div>`;
            } else {
                content = fileDetails.characters.map(file =>
                    `<div class="py-1 border-b border-gray-200 last:border-b-0 flex justify-between">
                        <span class="font-medium">${file.name}</span>
                        <span class="text-gray-600">${file.chars.toLocaleString()} ${getTranslation('characters')}</span>
                    </div>`
                ).join('');
            }
            break;

        case 'tokens':
            title = getTranslation('tokenStats');
            if (fileDetails.tokens.length === 0) {
                content = `<div class="text-gray-500">${getTranslation('noTokenStats')}</div>`;
            } else {
                content = fileDetails.tokens.map(file =>
                    `<div class="py-1 border-b border-gray-200 last:border-b-0 flex justify-between">
                        <span class="font-medium">${file.name}</span>
                        <span class="text-gray-600">${file.tokens.toLocaleString()} ${getTranslation('tokens')}</span>
                    </div>`
                ).join('');
            }
            break;
    }

    detailsTitle.textContent = title;
    detailsContent.innerHTML = content;
    detailsArea.classList.remove('hidden');
}

// 隐藏文件详情
function hideFileDetails() {
    const detailsArea = document.getElementById('detailsArea');
    if (detailsArea) {
        detailsArea.classList.add('hidden');
    }
}

// 更新文件详情数据
function updateFileDetails(file, type, data) {
    if (!fileDetails[type]) {
        fileDetails[type] = [];
    }

    const existingIndex = fileDetails[type].findIndex(f => f.name === file.name);
    if (existingIndex >= 0) {
        fileDetails[type][existingIndex] = { name: file.name, ...data };
    } else {
        fileDetails[type].push({ name: file.name, ...data });
    }
}

// 清除文件详情数据
function clearFileDetails() {
    fileDetails = {
        processed: [],
        characters: [],
        tokens: []
    };
}

// 将函数暴露到全局作用域
window.resetPage = resetPage;
window.updateStatus = updateStatus;
window.showFileDetails = showFileDetails;
window.hideFileDetails = hideFileDetails;

// 添加文件统计更新函数
function updateFileStats() {
    const folderInput = document.getElementById('folderInput');
    if (folderInput.files.length > 0) {
        const totalCount = folderInput.files.length;
        const blacklistedCount = Array.from(folderInput.files)
            .filter(file => isInBlacklist(file.webkitRelativePath))
            .length;

        const uploadArea = folderInput.closest('.upload-area');

        // 移除现有的统计信息（避免重复）
        const existingStats = uploadArea.querySelector('.file-stats');
        if (existingStats) {
            existingStats.remove();
        }

        // 创建新的统计信息元素
        const statsDiv = document.createElement('div');
        statsDiv.className = 'file-stats text-sm text-gray-600 mt-2';

        // 确保翻译函数可用，否则使用默认文本
        const totalFilesText = (typeof getTranslation === 'function') ? getTranslation('totalFiles') : 'Total Files';
        const willBeSkippedText = (typeof getTranslation === 'function') ? getTranslation('willBeSkipped') : 'Will be Skipped';
        const actualProcessingText = (typeof getTranslation === 'function') ? getTranslation('actualProcessing') : 'Actually Processing';

        statsDiv.innerHTML = `
            ${totalFilesText}：${totalCount} |
            ${willBeSkippedText}：${blacklistedCount} |
            ${actualProcessingText}：${totalCount - blacklistedCount}
        `;

        uploadArea.appendChild(statsDiv);
    }
}

// 修改文件选择监听器（合并所有文件夹选择逻辑）
document.getElementById('folderInput').addEventListener('change', async function(e) {
    updateFileStats();
    updateFolderStatus(e.target.files);

    // 更新状态
    if (e.target.files && e.target.files.length > 0) {
        updateStatus('ready', 'filesSelected', e.target.files.length);
    } else {
        updateStatus('ready', 'ready');
    }

    // 检查是否应该自动处理.gitignore
    if (document.getElementById('useGitignore').checked) {
        await checkForGitignoreInRoot(e.target.files);
    }
});

// 更新文件夹选择状态
function updateFolderStatus(files) {
    const statusDiv = document.getElementById('folderStatus');
    if (files && files.length > 0) {
        statusDiv.textContent = getTranslation('folderSelected');
        statusDiv.className = 'text-xs text-green-600 mb-2';
    } else {
        statusDiv.textContent = getTranslation('noFileSelected');
        statusDiv.className = 'text-xs text-gray-600 mb-2';
    }
}

// 更新文件选择状态
function updateFileStatus(files) {
    const statusDiv = document.getElementById('fileStatus');
    if (files && files.length > 0) {
        statusDiv.textContent = `${getTranslation('filesSelected')} ${files.length} ${getTranslation('files')}`;
        statusDiv.className = 'text-xs text-green-600 mb-2';
    } else {
        statusDiv.textContent = getTranslation('noFileSelected');
        statusDiv.className = 'text-xs text-gray-600 mb-2';
    }
}

// 更新gitignore文件选择状态
function updateGitignoreStatus(files) {
    const statusDiv = document.getElementById('gitignoreStatus');
    if (files && files.length > 0) {
        statusDiv.textContent = files[0].name;
        statusDiv.className = 'text-xs text-green-600 mb-2';
    } else {
        statusDiv.textContent = getTranslation('noFileSelected');
        statusDiv.className = 'text-xs text-gray-600 mb-2';
    }
}

// 添加生成文件夹结构的函数
function generateFolderStructure(files) {
    // 创建文件夹树
    const tree = {};
    
    files.forEach(file => {
        const path = file.webkitRelativePath.split('/');
        let current = tree;
        
        // 遍历路径的每一部分
        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            
            // 如果是最后一个部分（文件名）
            if (i === path.length - 1) {
                // 如果不在黑名单中，添加文件
                if (!isInBlacklist(file.webkitRelativePath)) {
                    if (!current._files) current._files = [];
                    current._files.push(part);
                }
            } else {
                // 如果是文件夹
                if (!current[part]) current[part] = {};
                current = current[part];
            }
        }
    });
    
    // 生成树状结构字符串
    const structureText = renderTree(tree, '', true);
    document.getElementById('structureArea').textContent = structureText;
}

// 渲染树状结构
function renderTree(node, prefix = '', isRoot = false) {
    let result = '';
    
    // 获取所有文件夹名（排除 _files 特殊键）
    const folders = Object.keys(node).filter(key => key !== '_files');
    
    // 处理文件夹
    folders.forEach((folder, index) => {
        const isLast = index === folders.length - 1 && (!node._files || node._files.length === 0);
        const connector = isLast ? '└── ' : '├── ';
        const childPrefix = isLast ? '    ' : '│   ';
        
        result += prefix + connector + folder + '/\n';
        result += renderTree(node[folder], prefix + childPrefix);
    });
    
    // 处理文件
    if (node._files) {
        node._files.forEach((file, index) => {
            const isLast = index === node._files.length - 1;
            const connector = isLast ? '└── ' : '├── ';
            result += prefix + connector + file + '\n';
        });
    }
    
    return result;
}

// 处理单独上传的.gitignore文件
async function processGitignoreFile() {
    const gitignoreInput = document.getElementById('gitignoreInput');
    
    if (gitignoreInput.files.length === 0) {
        alert(getTranslation('noGitignoreSelected'));
        return;
    }
    
    const gitignoreFile = gitignoreInput.files[0];
    
    try {
        // 读取文件内容
        const content = await readFile(gitignoreFile);
        
        // 解析规则
        const rules = parseGitignoreRules(content);
        
        if (rules.length > 0) {
            // 将新规则添加到黑名单中
            const updatedBlacklist = [...new Set([...BLACKLIST_FOLDERS, ...rules])];
            BLACKLIST_FOLDERS = updatedBlacklist;

            // 更新隐藏的输入框以保持兼容性
            const blacklistInput = document.getElementById('blacklistInput');
            if (blacklistInput) {
                blacklistInput.value = BLACKLIST_FOLDERS.join('\n');
            }

            // 重新渲染标签界面
            renderFolderBlacklistTags();

            // 更新文件统计
            updateFileStats();
            
            // 显示成功信息
            const status = document.getElementById('status');
            status.innerHTML = `
                <div class="flex items-center space-x-2 text-sm mb-2 bg-green-50 p-3 rounded">
                    <span class="text-green-500">✓</span>
                    <span class="text-green-700">${getTranslation('gitignoreApplied', rules.length)}</span>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error processing .gitignore file:', error);
    }
}

// 注意：文件夹输入事件监听器已经在上面合并了，这里移除重复的监听器

// 检查根目录是否有.gitignore文件
async function checkForGitignoreInRoot(files) {
    const status = document.getElementById('status');
    status.innerHTML = `
        <div class="flex items-center space-x-2 text-sm mb-2 bg-blue-50 p-3 rounded">
            <span class="text-blue-500">ℹ</span>
            <span class="text-blue-700">${getTranslation('scanningForGitignore')}</span>
        </div>
    `;
    
    // 尝试在根目录找.gitignore文件
    if (files && files.length > 0) {
        const rootPath = files[0].webkitRelativePath.split('/')[0];
        
        for (const file of files) {
            const path = file.webkitRelativePath;
            const pathParts = path.split('/');
            
            // 查找第一级的.gitignore
            if (pathParts.length === 2 && pathParts[1].toLowerCase() === '.gitignore') {
                try {
                    // 读取文件内容
                    const content = await readFile(file);
                    
                    // 解析规则
                    const rules = parseGitignoreRules(content);
                    
                    if (rules.length > 0) {
                        // 更新黑名单
                        const blacklistInput = document.getElementById('blacklistInput');
                        const currentBlacklist = blacklistInput.value
                            .split('\n')
                            .map(item => item.trim())
                            .filter(item => item !== '');
                        
                        // 将新规则添加到黑名单中
                        const updatedBlacklist = [...new Set([...currentBlacklist, ...rules])];
                        
                        // 更新黑名单输入框
                        blacklistInput.value = updatedBlacklist.join('\n');
                        
                        // 保存黑名单
                        saveBlacklist();
                        
                        // 显示成功信息
                        status.innerHTML = `
                            <div class="flex items-center space-x-2 text-sm mb-2 bg-green-50 p-3 rounded">
                                <span class="text-green-500">✓</span>
                                <span class="text-green-700">${getTranslation('gitignoreFoundAuto', rules.length)}</span>
                            </div>
                        `;
                        
                        // 找到并处理后返回
                        return true;
                    }
                } catch (error) {
                    console.error('Error processing .gitignore file:', error);
                }
            }
        }
    }
    
    return false;
}

// 更新黑名单中的.git设置
function updateBlacklistForGit(ignoreGit) {
    // 从当前黑名单中移除.git项
    BLACKLIST_FOLDERS = BLACKLIST_FOLDERS.filter(item => item !== '.git');

    // 根据选项决定是否添加.git
    if (ignoreGit) {
        BLACKLIST_FOLDERS.push('.git');
    }

    // 更新隐藏的输入框以保持兼容性
    const blacklistInput = document.getElementById('blacklistInput');
    if (blacklistInput) {
        blacklistInput.value = BLACKLIST_FOLDERS.join('\n');
    }

    // 重新渲染标签界面
    renderFolderBlacklistTags();

    // 更新文件统计
    updateFileStats();

    // 显示更新状态
    showBlacklistUpdateStatus();
}

// 新UI交互代码
document.addEventListener('DOMContentLoaded', function() {
    // 同步新旧UI元素
    const elements = {
        progress: {
            old: document.getElementById('progress'),
            new: document.getElementById('progressCard')
        },
        stats: {
            old: document.getElementById('stats'),
            new: document.getElementById('statsCard')
        },
        resultActions: {
            old: document.getElementById('resultActions'),
            new: document.getElementById('resultCard')
        },
        folderStructure: {
            old: document.getElementById('folderStructure'),
            new: document.getElementById('folderStructureCard')
        }
    };

    // 创建观察器来同步显示状态
    function syncElements() {
        Object.keys(elements).forEach(key => {
            const oldEl = elements[key].old;
            const newEl = elements[key].new;
            
            if (oldEl && newEl) {
                // 同步显示状态
                if (!oldEl.classList.contains('hidden')) {
                    newEl.classList.remove('hidden');
                } else {
                    newEl.classList.add('hidden');
                }
            }
        });
    }

    // 定期同步元素状态
    setInterval(syncElements, 100);

    // 移除了冲突的updateStatusCard函数，统一使用updateStatus

    // 先将processFiles函数赋值给window对象
    window.processFiles = processFiles;

    // 将updateFileStats函数也赋值给window对象，以便语言模块可以调用
    window.updateFileStats = updateFileStats;

    // 将removeFile函数赋值给window对象，以便HTML onclick可以调用
    window.removeFile = removeFile;

    // 将clearAllFiles函数赋值给window对象
    window.clearAllFiles = clearAllFiles;

    // 移除冲突的processFiles包装器，使用统一的状态更新系统

    // 移除重复的文件选择监听器，已在上面的代码中处理


});

// 重写原有的显示/隐藏逻辑以适应新UI
const originalShowElement = function(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('hidden');
    }
    
    // 同时处理新UI元素
    const mappings = {
        'progress': 'progressCard',
        'stats': 'statsCard',
        'resultActions': 'resultCard',
        'folderStructure': 'folderStructureCard'
    };
    
    if (mappings[elementId]) {
        const newElement = document.getElementById(mappings[elementId]);
        if (newElement) {
            newElement.classList.remove('hidden');
        }
    }
};

const originalHideElement = function(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('hidden');
    }
    
    // 同时处理新UI元素
    const mappings = {
        'progress': 'progressCard',
        'stats': 'statsCard',
        'resultActions': 'resultCard',
        'folderStructure': 'folderStructureCard'
    };
    
    if (mappings[elementId]) {
        const newElement = document.getElementById(mappings[elementId]);
        if (newElement) {
            newElement.classList.add('hidden');
        }
    }
};

// 重写显示相关函数
window.showElement = originalShowElement;
window.hideElement = originalHideElement;