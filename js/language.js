// 语言配置和翻译管理模块
const TRANSLATIONS = {
    zh: {
        title: 'CodeMerge',
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
        blacklistFoldersDesc: '文件夹：这些文件夹将被自动跳过处理：',
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
        description: '一键合并代码结构，为 AI 提供完整上下文',
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
        stepUpload: '选择文件或文件夹',
        stepOptions: '配置选项',
        stepStart: '开始处理',
        advancedSettings: '高级设置',
        basicOptions: '基础选项',
        outputFormat: '输出格式',
        formatDefault: '默认格式',
        formatDefaultDesc: '原始格式，包含文件统计信息',
        formatXML: 'XML格式',
        formatXMLDesc: '结构化XML格式，包含目录树',
        formatTXT: '纯文本格式',
        formatTXTDesc: '简洁的文本格式，使用分隔符',
        formatMD: 'Markdown格式',
        formatMDDesc: 'Markdown格式，支持语法高亮',
        status: '状态',
        ready: '准备就绪',
        reset: '重置',
        processing: '正在处理文件...',
        filesSelected: '已选择',
        files: '个文件',
        processComplete: '处理完成！处理了',
        processedFiles: '个文件，跳过',
        skippedFiles: '个文件',
        folderNamePlaceholder: '每行一个文件夹名',
        extensionPlaceholder: '.jpg\n.png\n.mp4',
        selectFolder: '选择文件夹',
        selectFiles: '选择文件',
        selectGitignore: '选择.gitignore',
        noFileSelected: '未选择文件',
        folderSelected: '已选择文件夹',
        clearAll: '清除全部',
        starOnGithub: '在GitHub上给我Star',
        viewOnGithub: '查看源码',
        githubDescription: '如果这个工具对你有帮助，请在GitHub上给我一个Star！',
        openSource: '开源项目',
        add: '添加',
        processedFiles: '已处理文件',
        skippedFiles: '跳过文件',
        characterStats: '字符统计',
        tokenStats: 'Token统计',
        noProcessedFiles: '暂无已处理文件',
        noCharacterStats: '暂无字符统计',
        noTokenStats: '暂无Token统计',
        characters: '字符',
        tokens: 'tokens',
        blacklistUpdated: '黑名单设置已更新',
        resetConfirm: '确定要重置页面吗？这将清除所有选择的文件和设置。',
        pageReset: '页面已重置',
        noFileSelected: '未选择文件',
        compressionError: '压缩代码时出错',
        fileReadFailed: '文件读取失败',
        downloadFileName: '文件内容汇总_',
        usageGuide: '使用指南',
        usageGuideDesc: '三步快速开始',
        step1Title: '选择文件',
        step1Desc: '选择文件夹或单个文件进行分析',
        step2Title: '配置选项',
        step2Desc: '设置处理模式和输出格式',
        step3Title: '开始处理',
        step3Desc: '点击按钮开始分析和合并文件',
        getStarted: '现在就开始吧！',
        // repomix参考标注
        refRepomix: '参考repomix'
    },
    en: {
        title: 'CodeMerge',
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
        blacklistFoldersDesc: 'Folder: These folders will be automatically skipped:',
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
        description: 'One-click code merge, full context for AI',
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
        stepUpload: 'Select Files or Folders',
        stepOptions: 'Configure Options',
        stepStart: 'Start Processing',
        advancedSettings: 'Advanced Settings',
        basicOptions: 'Basic Options',
        outputFormat: 'Output Format',
        formatDefault: 'Default Format',
        formatDefaultDesc: 'Original format with file statistics',
        formatXML: 'XML Format',
        formatXMLDesc: 'Structured XML format with directory tree',
        formatTXT: 'Plain Text Format',
        formatTXTDesc: 'Clean text format with separators',
        formatMD: 'Markdown Format',
        formatMDDesc: 'Markdown format with syntax highlighting',
        status: 'Status',
        ready: 'Ready',
        reset: 'Reset',
        processing: 'Processing files...',
        filesSelected: 'Selected',
        files: 'files',
        processComplete: 'Processing complete! Processed',
        processedFiles: 'files, skipped',
        skippedFiles: 'files',
        folderNamePlaceholder: 'One folder name per line',
        extensionPlaceholder: '.jpg\n.png\n.mp4',
        selectFolder: 'Select Folder',
        selectFiles: 'Select Files',
        selectGitignore: 'Select .gitignore',
        noFileSelected: 'No file selected',
        folderSelected: 'Folder selected',
        clearAll: 'Clear All',
        starOnGithub: 'Star me on GitHub',
        viewOnGithub: 'View Source',
        githubDescription: 'If this tool helps you, please give me a star on GitHub!',
        openSource: 'Open Source',
        add: 'Add',
        processedFiles: 'Processed Files',
        skippedFiles: 'Skipped Files',
        characterStats: 'Character Statistics',
        tokenStats: 'Token Statistics',
        noProcessedFiles: 'No processed files',
        noCharacterStats: 'No character statistics',
        noTokenStats: 'No token statistics',
        characters: 'characters',
        tokens: 'tokens',
        blacklistUpdated: 'Blacklist settings updated',
        resetConfirm: 'Are you sure you want to reset the page? This will clear all selected files and settings.',
        pageReset: 'Page has been reset',
        noFileSelected: 'No file selected',
        compressionError: 'Error compressing code',
        fileReadFailed: 'File read failed',
        downloadFileName: 'content_summary_',
        usageGuide: 'Quick Start Guide',
        usageGuideDesc: 'Get started in 3 easy steps',
        step1Title: 'Select Files',
        step1Desc: 'Choose folders or individual files to analyze',
        step2Title: 'Configure Options',
        step2Desc: 'Set processing mode and output format',
        step3Title: 'Start Processing',
        step3Desc: 'Click the button to analyze and merge files',
        getStarted: 'Let\'s get started!',
        // repomix参考标注
        refRepomix: 'ref repomix'
    }
};

// 当前语言设置
let currentLang = 'zh';

// 语言切换函数
function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.textContent = currentLang === 'zh' ? 'English' : '中文';
    }
    updatePageLanguage();
}

// 更新页面语言
function updatePageLanguage() {
    // 更新页面语言属性
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';

    // 保存当前状态
    const currentStatusText = document.getElementById('statusText');
    const currentStatusIndicator = document.getElementById('statusIndicator');
    let savedStatus = null;
    let savedFileCount = 0;

    if (currentStatusText && currentStatusIndicator) {
        // 检测当前状态类型
        if (currentStatusIndicator.classList.contains('bg-blue-500')) {
            savedStatus = 'processing';
        } else if (currentStatusIndicator.classList.contains('bg-green-500')) {
            savedStatus = 'complete';
        } else if (currentStatusIndicator.classList.contains('bg-red-500')) {
            savedStatus = 'error';
        } else {
            savedStatus = 'ready';
        }

        // 尝试从当前状态文本中提取文件数量
        const statusText = currentStatusText.textContent;
        const numberMatch = statusText.match(/\d+/);
        if (numberMatch) {
            savedFileCount = parseInt(numberMatch[0]);
        }
    }

    // 更新带有 data-lang 属性的元素
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

    // 更新文件统计信息（如果存在）
    if (typeof window.updateFileStats === 'function') {
        window.updateFileStats();
    }

    // 恢复状态显示
    if (savedStatus && typeof window.updateStatus === 'function') {
        if (savedStatus === 'ready' && savedFileCount > 0) {
            // 如果之前显示的是文件选择状态，恢复它
            window.updateStatus('ready', 'filesSelected', savedFileCount);
        } else if (savedStatus === 'processing') {
            window.updateStatus('processing', 'processing');
        } else if (savedStatus === 'complete') {
            // 对于完成状态，我们需要更复杂的逻辑来恢复，暂时保持当前文本
            // 这里可以根据需要进一步完善
        } else {
            window.updateStatus('ready', 'ready');
        }
    }
}

// 获取翻译文本的辅助函数
function getTranslation(key, ...args) {
    let text = TRANSLATIONS[currentLang][key] || key;
    
    // 支持参数替换 {0}, {1}, {2} 等
    args.forEach((arg, index) => {
        text = text.replace(`{${index}}`, arg);
    });
    
    return text;
}

// 获取当前语言
function getCurrentLanguage() {
    return currentLang;
}

// 设置语言
function setLanguage(lang) {
    if (TRANSLATIONS[lang]) {
        currentLang = lang;
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.textContent = currentLang === 'zh' ? 'English' : '中文';
        }
        updatePageLanguage();
    }
}

// 初始化语言模块
function initLanguage() {
    // 添加语言切换按钮事件监听
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
        // 设置初始按钮文本
        langToggle.textContent = currentLang === 'zh' ? 'English' : '中文';
    }

    // 初始化页面语言
    updatePageLanguage();
}

// 导出函数供其他模块使用
window.LanguageModule = {
    toggleLanguage,
    updatePageLanguage,
    getTranslation,
    getCurrentLanguage,
    setLanguage,
    initLanguage,
    TRANSLATIONS
};

// 为了向后兼容，也将一些函数直接挂载到 window 对象
window.toggleLanguage = toggleLanguage;
window.updatePageLanguage = updatePageLanguage;
window.getTranslation = getTranslation;
window.getCurrentLanguage = getCurrentLanguage;
window.setLanguage = setLanguage;
window.TRANSLATIONS = TRANSLATIONS;

// 当前语言变量也需要在全局可访问
Object.defineProperty(window, 'currentLang', {
    get: () => currentLang,
    set: (value) => {
        if (TRANSLATIONS[value]) {
            currentLang = value;
        }
    }
});
