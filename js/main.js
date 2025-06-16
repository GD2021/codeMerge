// 添加语言配置
const TRANSLATIONS = {
    zh: {
        title: '代码文件内容提取与统计工具',
        folderUpload: '文件夹上传',
        folderUploadDesc: '选择整个文件夹进行分析',
        fileUpload: '文件上传',
        fileUploadDesc: '选择一个或多个文件',
        selectedFiles: '已选择的文件',
        codeProcessingOptions: '代码处理选项',
        compressCode: '压缩代码',
        compressCodeDesc: '删除多余空格、换行等，减少文件大小',
        tokenCalcModel: 'Token计算模型',
        blacklistSettings: '黑名单设置',
        saveSettings: '保存设置',
        blacklistFoldersDesc: '这些文件夹将被自动跳过处理：',
        blacklistFoldersTip: '提示：每行输入一个文件夹名称，这些文件夹及其子文件夹中的文件将被跳过。',
        blacklistExtDesc: '这些扩展名的文件将被自动跳过处理：',
        blacklistExtTip: '提示：每行输入一个文件扩展名（如 .jpg 或 jpg），这些扩展名的文件将被跳过。',
        supportedFileTypes: '支持的文件类型',
        codeFiles: '代码文件',
        otherFiles: '其他文件',
        startProcessing: '开始处理',
        processingProgress: '处理进度',
        statistics: '统计信息',
        processedFiles: '处理文件数',
        totalChars: '总字符数',
        skippedFiles: '跳过文件数',
        tokenStats: 'Token 统计',
        blacklistUpdated: '黑名单设置已更新',
        pleaseSelectFiles: '请选择文件或文件夹！',
        fileReadError: '文件读取失败',
        totalFiles: '总文件数',
        willBeSkipped: '将被跳过',
        actualProcessing: '实际处理',
        filePath: '文件路径',
        chars: '字符',
        fileProcessed: '文件处理完成',
        fileSkipped: '文件已跳过',
        processingFile: '正在处理文件',
        resultActions: '处理结果',
        copyContent: '合并内容',
        copyBtn: '复制',
        copySuccess: '已复制到剪贴板！',
        downloadBtn: '下载合并内容',
        copyAreaHint: '点击复制按钮复制内容',
        copyAreaPlaceholder: '处理完成后的内容将显示在这里...',
        description: '这是一个帮助你分析代码文件的工具。可以统计字符数、计算不同模型的Token数量，并支持导出合并后的内容。适用于需要估算API调用成本或批量处理代码文件的场景。',
        folderStructure: '文件夹结构',
        structureAreaHint: '文件夹树状结构',
        processingMode: '处理模式',
        modeFullProcess: '完整处理',
        modeFullProcessDesc: '提取文件树和合并文件内容',
        modeTreeOnly: '仅文件树',
        modeTreeOnlyDesc: '只提取文件树结构，不处理文件内容',
        useGitignore: '使用.gitignore',
        useGitignoreDesc: '从项目中的.gitignore文件读取忽略规则',
        gitignoreRulesFound: '从.gitignore中读取了{0}条规则',
        gitignoreNotFound: '未找到.gitignore文件',
        useGitignoreSuccess: '成功应用.gitignore规则',
        gitignoreUpload: '.gitignore上传',
        gitignoreUploadDesc: '上传.gitignore文件，自动应用到黑名单设置',
        applyGitignore: '应用',
        gitignoreApplied: '.gitignore规则已应用，已添加{0}条规则到黑名单',
        noGitignoreSelected: '请先选择.gitignore文件',
        scanningForGitignore: '正在扫描.gitignore文件...',
        gitignoreFoundAuto: '自动检测到.gitignore文件，已应用{0}条规则',
        ignoreGit: '忽略.git文件夹',
        ignoreGitDesc: '跳过.git文件夹及其中的版本控制文件',
    },
    en: {
        title: 'Code File Content Extraction and Statistics Tool',
        folderUpload: 'Folder Upload',
        folderUploadDesc: 'Select an entire folder for analysis',
        fileUpload: 'File Upload',
        fileUploadDesc: 'Select one or multiple files',
        selectedFiles: 'Selected Files',
        codeProcessingOptions: 'Code Processing Options',
        compressCode: 'Compress Code',
        compressCodeDesc: 'Remove extra spaces and line breaks to reduce file size',
        tokenCalcModel: 'Token Calculation Model',
        blacklistSettings: 'Blacklist Settings',
        saveSettings: 'Save Settings',
        blacklistFoldersDesc: 'These folders will be automatically skipped:',
        blacklistFoldersTip: 'Tip: Enter one folder name per line. Files in these folders and their subfolders will be skipped.',
        blacklistExtDesc: 'Files with these extensions will be automatically skipped:',
        blacklistExtTip: 'Tip: Enter one file extension per line (e.g. .jpg or jpg). Files with these extensions will be skipped.',
        supportedFileTypes: 'Supported File Types',
        codeFiles: 'Code Files',
        otherFiles: 'Other Files',
        startProcessing: 'Start Processing',
        processingProgress: 'Processing Progress',
        statistics: 'Statistics',
        processedFiles: 'Processed Files',
        totalChars: 'Total Characters',
        skippedFiles: 'Skipped Files',
        tokenStats: 'Token Statistics',
        blacklistUpdated: 'Blacklist settings updated',
        pleaseSelectFiles: 'Please select files or folders!',
        fileReadError: 'File read error',
        totalFiles: 'Total Files',
        willBeSkipped: 'Will be Skipped',
        actualProcessing: 'Actually Processing',
        filePath: 'File Path',
        chars: 'characters',
        fileProcessed: 'File processed',
        fileSkipped: 'File skipped',
        processingFile: 'Processing file',
        resultActions: 'Processing Results',
        copyContent: 'Merged Content',
        copyBtn: 'Copy',
        copySuccess: 'Copied to clipboard!',
        downloadBtn: 'Download Merged Content',
        copyAreaHint: 'Click copy button to copy content',
        copyAreaPlaceholder: 'Processed content will be displayed here...',
        description: 'This tool helps you analyze code files by counting characters, calculating tokens for different models, and exporting merged content. Perfect for estimating API costs or batch processing code files.',
        folderStructure: 'Folder Structure',
        structureAreaHint: 'Folder tree structure',
        processingMode: 'Processing Mode',
        modeFullProcess: 'Full Processing',
        modeFullProcessDesc: 'Extract file tree and merge file contents',
        modeTreeOnly: 'Tree Only',
        modeTreeOnlyDesc: 'Only extract file tree structure, don\'t process file contents',
        useGitignore: 'Use .gitignore',
        useGitignoreDesc: 'Read ignore rules from .gitignore file in the project',
        gitignoreRulesFound: 'Read {0} rules from .gitignore',
        gitignoreNotFound: '.gitignore file not found',
        useGitignoreSuccess: 'Successfully applied .gitignore rules',
        gitignoreUpload: '.gitignore Upload',
        gitignoreUploadDesc: 'Upload a .gitignore file to automatically apply to blacklist settings',
        applyGitignore: 'Apply',
        gitignoreApplied: '.gitignore rules applied, {0} rules added to blacklist',
        noGitignoreSelected: 'Please select a .gitignore file first',
        scanningForGitignore: 'Scanning for .gitignore file...',
        gitignoreFoundAuto: 'Automatically detected .gitignore file, {0} rules applied',
        ignoreGit: 'Ignore .git Folder',
        ignoreGitDesc: 'Skip .git folder and version control files',
    }
};

let currentLang = 'en';

// 语言切换函数
function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    document.getElementById('langToggle').textContent = currentLang === 'zh' ? 'English' : '中文';
    updatePageLanguage();
}

// 更新页面语言
function updatePageLanguage() {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (TRANSLATIONS[currentLang][key]) {
            element.textContent = TRANSLATIONS[currentLang][key];
        }
    });
    
    // 更新 placeholder 文本
    const placeholderElements = document.querySelectorAll('[data-lang-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-lang-placeholder');
        if (TRANSLATIONS[currentLang][key]) {
            element.placeholder = TRANSLATIONS[currentLang][key];
        }
    });
}

// 添加语言切换按钮事件监听
document.getElementById('langToggle').addEventListener('click', toggleLanguage);

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
let BLACKLIST_EXTENSIONS = [];

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
        fileElement.innerHTML = `
            <span class="text-sm text-gray-600">${file.name}</span>
            <button onclick="removeFile('${fileId}')" 
                class="text-red-500 hover:text-red-700 text-sm px-2 py-1">
                ✕
            </button>
        `;
        fileListElement.appendChild(fileElement);
    });
}

// 移除文件
function removeFile(fileId) {
    selectedFiles.delete(fileId);
    updateFileList();
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
    
    // 过滤掉黑名单文件
    const filteredFolderFiles = folderFiles.filter(file => {
        const filePath = file.webkitRelativePath;
        
        // 检查是否在黑名单中
        if (isInBlacklist(filePath)) {
            return false;
        }
        
        return true;
    });
    
    const allFiles = [...filteredFolderFiles, ...individualFiles];
    
    if (allFiles.length === 0) {
        alert(TRANSLATIONS[currentLang].pleaseSelectFiles);
        return;
    }

    // 重置计数器
    totalFiles = allFiles.length;
    processedFiles = 0;
    skippedFiles = 0;
    totalChars = 0;
    totalRegexTokens = 0;
    
    let output = '';
    const status = document.getElementById('status');
    // 保留黑名单更新的消息，不清空状态区域
    // status.innerHTML = '';
    
    document.getElementById('progress').classList.remove('hidden');
    
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
                        <span class="text-yellow-500">${TRANSLATIONS[currentLang].willBeSkipped}</span>
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
            
            output += `=== ${TRANSLATIONS[currentLang].filePath}: ${filePath} ===\n`;
            output += `${TRANSLATIONS[currentLang].totalChars}: ${charCount}\n`;
            output += `Regex Tokens: ${tokens.regex}\n\n`;
            output += content;
            output += '\n\n' + '='.repeat(50) + '\n\n';
            
            status.innerHTML += `
                <div class="flex items-center space-x-2 text-sm mb-2">
                    <span class="text-green-500">✓</span>
                    <span class="text-gray-700">${filePath}</span>
                    <span class="text-gray-500">
                        (${charCount.toLocaleString()} ${TRANSLATIONS[currentLang].chars}, 
                        Regex: ${tokens.regex.toLocaleString()} tokens)
                    </span>
                </div>`;
        } catch (error) {
            skippedFiles++;
            status.innerHTML += `
                <div class="flex items-center space-x-2 text-sm mb-2">
                    <span class="text-red-500">✗</span>
                    <span class="text-gray-700">${file.webkitRelativePath || file.name}</span>
                    <span class="text-red-500">${TRANSLATIONS[currentLang].fileReadError}</span>
                </div>`;
        }
        
        updateProgress();
    }

    // 更新统计信息显示
    document.getElementById('totalFileCount').textContent = (totalFiles - skippedFiles).toLocaleString();
    document.getElementById('skippedFileCount').textContent = skippedFiles.toLocaleString();
    document.getElementById('totalCharCount').textContent = totalChars.toLocaleString();
    document.getElementById('gpt3TokenCount').textContent = totalRegexTokens.toLocaleString();
    // 隐藏第二个和第三个token计数
    const gpt4Element = document.getElementById('gpt4TokenCount');
    if (gpt4Element) {
        gpt4Element.closest('.flex').style.display = 'none';
    }
    const claudeElement = document.getElementById('claudeTokenCount');
    if (claudeElement) {
        claudeElement.closest('.flex').style.display = 'none';
    }

    if (totalChars > 0) {
        // 保存合并内容并更新复制框
        mergedContent = output;
        document.getElementById('copyArea').value = output;
    }

    // 生成文件夹结构
    if (folderFiles.length > 0) {
        generateFolderStructure(filteredFolderFiles);
        document.getElementById('folderStructure').classList.remove('hidden');
    } else {
        document.getElementById('folderStructure').classList.add('hidden');
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
    document.getElementById('progressText').textContent = `${percentage}% (${processedFiles}/${totalFiles})`;
}

function downloadOutput(content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // 修改下载文件名的语言
    const fileName = currentLang === 'zh' ? '文件内容汇总_' : 'content_summary_';
    a.download = fileName + new Date().toISOString().slice(0,19).replace(/:/g, '-') + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}



// 页面加载时初始化黑名单输入框
document.addEventListener('DOMContentLoaded', function() {
    const blacklistInput = document.getElementById('blacklistInput');
    blacklistInput.value = BLACKLIST_FOLDERS.join('\n');
    
    // 初始化扩展名黑名单输入框
    const blacklistExtInput = document.getElementById('blacklistExtInput');
    blacklistExtInput.value = BLACKLIST_EXTENSIONS.join('\n');
    
    // 更新选择的文件统计
    updateFileStats();
    
    // 初始化页面语言
    updatePageLanguage();
    
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
});

// 保存黑名单设置
function saveBlacklist() {
    const blacklistInput = document.getElementById('blacklistInput');
    BLACKLIST_FOLDERS = blacklistInput.value
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '');
    
    // 保存扩展名黑名单
    const blacklistExtInput = document.getElementById('blacklistExtInput');
    BLACKLIST_EXTENSIONS = blacklistExtInput.value
        .split('\n')
        .map(item => {
            // 确保扩展名格式正确（以.开头）
            item = item.trim();
            return item !== '' ? (item.startsWith('.') ? item : '.' + item) : '';
        })
        .filter(item => item !== '');
    
    // 更新文件统计
    updateFileStats();
    
    // 显示保存成功提示 - 修改为在按钮旁边显示
    const saveStatus = document.getElementById('saveStatus');
    saveStatus.classList.remove('hidden');
    saveStatus.style.opacity = '1';
    
    // 添加自动消失的效果
    setTimeout(() => {
        // 用淡出效果移除提示
        saveStatus.style.opacity = '0';
        setTimeout(() => {
            saveStatus.classList.add('hidden');
        }, 500);
    }, 3000);
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
        statsDiv.innerHTML = `
            ${TRANSLATIONS[currentLang].totalFiles}：${totalCount} | 
            ${TRANSLATIONS[currentLang].willBeSkipped}：${blacklistedCount} |
            ${TRANSLATIONS[currentLang].actualProcessing}：${totalCount - blacklistedCount}
        `;
        
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
        alert(TRANSLATIONS[currentLang].noGitignoreSelected);
        return;
    }
    
    const gitignoreFile = gitignoreInput.files[0];
    
    try {
        // 读取文件内容
        const content = await readFile(gitignoreFile);
        
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
            const status = document.getElementById('status');
            status.innerHTML = `
                <div class="flex items-center space-x-2 text-sm mb-2 bg-green-50 p-3 rounded">
                    <span class="text-green-500">✓</span>
                    <span class="text-green-700">${TRANSLATIONS[currentLang].gitignoreApplied.replace('{0}', rules.length)}</span>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error processing .gitignore file:', error);
    }
}

// 修改文件夹输入事件，添加.gitignore自动检测
document.getElementById('folderInput').addEventListener('change', async function(e) {
    // 更新文件统计
    updateFileStats();
    
    // 检查是否应该自动处理.gitignore
    if (document.getElementById('useGitignore').checked) {
        await checkForGitignoreInRoot(e.target.files);
    }
});

// 检查根目录是否有.gitignore文件
async function checkForGitignoreInRoot(files) {
    const status = document.getElementById('status');
    status.innerHTML = `
        <div class="flex items-center space-x-2 text-sm mb-2 bg-blue-50 p-3 rounded">
            <span class="text-blue-500">ℹ</span>
            <span class="text-blue-700">${TRANSLATIONS[currentLang].scanningForGitignore}</span>
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
                                <span class="text-green-700">${TRANSLATIONS[currentLang].gitignoreFoundAuto.replace('{0}', rules.length)}</span>
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
    const blacklistInput = document.getElementById('blacklistInput');
    
    // 获取当前黑名单内容，排除.git项
    const currentBlacklist = blacklistInput.value
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '' && item !== '.git');
    
    // 根据选项决定是否添加.git
    if (ignoreGit) {
        currentBlacklist.push('.git');
    }
    
    // 更新文本框内容
    blacklistInput.value = currentBlacklist.join('\n');
    
    // 保存设置
    saveBlacklist();
    
    // 更新文件统计
    updateFileStats();
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

    // 更新状态卡片
    function updateStatusCard(message, type = 'info') {
        const statusCard = document.getElementById('statusCard');
        if (statusCard) {
            const statusText = statusCard.querySelector('span');
            const statusDot = statusCard.querySelector('.w-2.h-2');
            
            if (statusText) {
                statusText.textContent = message;
            }
            
            if (statusDot) {
                statusDot.className = 'w-2 h-2 rounded-full';
                switch (type) {
                    case 'success':
                        statusDot.classList.add('bg-green-400');
                        break;
                    case 'error':
                        statusDot.classList.add('bg-red-400');
                        break;
                    case 'processing':
                        statusDot.classList.add('bg-blue-400');
                        break;
                    default:
                        statusDot.classList.add('bg-gray-400');
                }
            }
        }
    }

    // 监听处理状态变化
    const originalProcessFiles = window.processFiles;
    window.processFiles = function() {
        updateStatusCard('正在处理...', 'processing');
        return originalProcessFiles.apply(this, arguments);
    };

    // 监听文件选择变化
    function handleFileSelection() {
        const folderInput = document.getElementById('folderInput');
        const fileInput = document.getElementById('fileInput');
        
        if (folderInput && folderInput.files.length > 0) {
            updateStatusCard(`已选择 ${folderInput.files.length} 个文件`, 'success');
        } else if (fileInput && fileInput.files.length > 0) {
            updateStatusCard(`已选择 ${fileInput.files.length} 个文件`, 'success');
        } else {
            updateStatusCard('准备就绪', 'info');
        }
    }

    // 绑定文件输入事件
    const folderInput = document.getElementById('folderInput');
    const fileInput = document.getElementById('fileInput');
    
    if (folderInput) {
        folderInput.addEventListener('change', handleFileSelection);
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelection);
    }

    // 初始化语言
    if (currentLang === 'zh') {
        updatePageLanguage();
    }
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