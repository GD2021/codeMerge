/**
 * 内容合并模块 - Content Merger Module
 * 负责将多个文件内容合并成一个统一格式的字符串
 */

/**
 * 将多个文件内容合并成一个字符串
 * @param {Array} fileDataList - 文件数据数组，每个元素包含 {filePath, content, stats}
 * @param {Object} options - 合并选项
 * @returns {string} 合并后的内容字符串
 */
function mergeFileContents(fileDataList, options = {}) {
    const {
        includeStats = true,           // 是否包含统计信息
        separator = '='.repeat(50),    // 文件间分隔符
        headerTemplate = null,         // 自定义文件头模板
        useTranslation = true          // 是否使用翻译系统
    } = options;

    let mergedOutput = '';
    
    fileDataList.forEach((fileData, index) => {
        const { filePath, content, stats = {} } = fileData;
        
        // 添加文件头信息
        if (headerTemplate && typeof headerTemplate === 'function') {
            // 使用自定义模板
            mergedOutput += headerTemplate(fileData, index);
        } else {
            // 使用默认模板
            const filePathLabel = useTranslation && window.getTranslation ? 
                window.getTranslation('filePath') : '文件路径';
            mergedOutput += `=== ${filePathLabel}: ${filePath} ===\n`;
            
            if (includeStats && stats) {
                if (stats.charCount !== undefined) {
                    const charsLabel = useTranslation && window.getTranslation ? 
                        window.getTranslation('totalChars') : '字符数';
                    mergedOutput += `${charsLabel}: ${stats.charCount}\n`;
                }
                if (stats.tokens !== undefined) {
                    mergedOutput += `Regex Tokens: ${stats.tokens}\n`;
                }
            }
            mergedOutput += '\n';
        }
        
        // 添加文件内容
        mergedOutput += content;
        
        // 添加分隔符（最后一个文件后不添加）
        if (index < fileDataList.length - 1) {
            mergedOutput += '\n\n' + separator + '\n\n';
        }
    });
    
    return mergedOutput;
}

/**
 * 简化版本的内容合并函数
 * @param {Array} files - 文件数组，每个元素包含 {name, content}
 * @returns {string} 合并后的内容
 */
function simpleMergeFiles(files) {
    return files.map(file => {
        return `=== 文件: ${file.name} ===\n${file.content}`;
    }).join('\n\n' + '='.repeat(50) + '\n\n');
}

/**
 * 生成单个文件的格式化内容块
 * @param {string} filePath - 文件路径
 * @param {string} content - 文件内容
 * @param {Object} stats - 统计信息 {charCount, tokens}
 * @param {Object} options - 格式化选项
 * @returns {string} 格式化后的内容块
 */
function formatFileBlock(filePath, content, stats = {}, options = {}) {
    const {
        useTranslation = true,
        includeStats = true
    } = options;
    
    let block = '';
    
    // 文件头
    const filePathLabel = useTranslation && window.getTranslation ? 
        window.getTranslation('filePath') : '文件路径';
    block += `=== ${filePathLabel}: ${filePath} ===\n`;
    
    // 统计信息
    if (includeStats && stats) {
        if (stats.charCount !== undefined) {
            const charsLabel = useTranslation && window.getTranslation ? 
                window.getTranslation('totalChars') : '字符数';
            block += `${charsLabel}: ${stats.charCount}\n`;
        }
        if (stats.tokens !== undefined) {
            block += `Regex Tokens: ${stats.tokens}\n`;
        }
    }
    
    block += '\n';
    block += content;
    
    return block;
}

/**
 * 创建文件下载
 * @param {string} content - 要下载的内容
 * @param {string} filename - 文件名（可选）
 * @param {string} format - 输出格式（用于确定文件扩展名）
 */
function downloadMergedContent(content, filename = null, format = 'default') {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // 生成文件名
    if (!filename) {
        const fileNameLabel = window.getTranslation ?
            window.getTranslation('downloadFileName') : '文件内容汇总_';
        const timestamp = new Date().toISOString().slice(0,19).replace(/:/g, '-');

        // 根据格式选择文件扩展名
        let extension = '.txt';
        switch (format) {
            case 'xml':
                extension = '.xml';
                break;
            case 'md':
                extension = '.md';
                break;
            case 'txt':
                extension = '.txt';
                break;
            case 'default':
            default:
                extension = '.txt';
                break;
        }

        filename = fileNameLabel + timestamp + extension;
    }

    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 将函数暴露到全局作用域，以便其他模块使用
window.mergeFileContents = mergeFileContents;
window.simpleMergeFiles = simpleMergeFiles;
window.formatFileBlock = formatFileBlock;
window.downloadMergedContent = downloadMergedContent;

/**
 * 生成目录结构字符串
 * @param {Array} files - 文件数组
 * @returns {string} 目录结构字符串
 */
function generateDirectoryStructure(files) {
    const tree = {};

    files.forEach(file => {
        const filePath = file.filePath || file.webkitRelativePath || file.name;
        const pathParts = filePath.split('/').filter(part => part);
        let current = tree;

        // 构建目录树
        for (let i = 0; i < pathParts.length; i++) {
            const part = pathParts[i];
            if (i === pathParts.length - 1) {
                // 文件
                if (!current._files) current._files = [];
                current._files.push(part);
            } else {
                // 目录
                if (!current[part]) current[part] = {};
                current = current[part];
            }
        }
    });

    return renderDirectoryTree(tree, '', true);
}

/**
 * 渲染目录树
 * @param {Object} node - 目录节点
 * @param {string} prefix - 前缀
 * @param {boolean} isRoot - 是否为根节点
 * @returns {string} 渲染后的目录树
 */
function renderDirectoryTree(node, prefix = '', isRoot = false) {
    let result = '';

    if (isRoot) {
        result += '/\n';
        prefix = '  ';
    }

    const folders = Object.keys(node).filter(key => key !== '_files');
    const files = node._files || [];

    // 渲染文件夹
    folders.forEach((folder, index) => {
        const isLastFolder = index === folders.length - 1 && files.length === 0;
        result += prefix + folder + '/\n';
        result += renderDirectoryTree(node[folder], prefix + '  ');
    });

    // 渲染文件
    files.forEach((file, index) => {
        result += prefix + file + '\n';
    });

    return result;
}

/**
 * XML格式合并文件内容
 * @param {Array} fileDataList - 文件数据数组
 * @param {Object} options - 选项
 * @returns {string} XML格式的合并内容
 */
function mergeFileContentsXML(fileDataList, options = {}) {
    const { includeDirectoryStructure = true } = options;

    let xmlOutput = '';

    // 添加目录结构
    if (includeDirectoryStructure && fileDataList.length > 0) {
        const directoryStructure = generateDirectoryStructure(fileDataList);
        xmlOutput += '<directory_structure>\n';
        xmlOutput += directoryStructure;
        xmlOutput += '</directory_structure>\n\n';
    }

    // 添加文件内容
    xmlOutput += '<files>\n';
    fileDataList.forEach(fileData => {
        const { filePath, content } = fileData;
        xmlOutput += `  <file path="${filePath}">\n`;
        xmlOutput += content;
        xmlOutput += '\n  </file>\n';
    });
    xmlOutput += '</files>\n';

    return xmlOutput;
}

/**
 * 纯文本格式合并文件内容
 * @param {Array} fileDataList - 文件数据数组
 * @param {Object} options - 选项
 * @returns {string} 纯文本格式的合并内容
 */
function mergeFileContentsTXT(fileDataList, options = {}) {
    const { includeDirectoryStructure = true } = options;

    let txtOutput = '';

    // 添加目录结构
    if (includeDirectoryStructure && fileDataList.length > 0) {
        txtOutput += '================================================================\n';
        txtOutput += 'Directory Structure\n';
        txtOutput += '================================================================\n';
        txtOutput += generateDirectoryStructure(fileDataList);
        txtOutput += '\n';
    }

    // 添加文件内容
    txtOutput += '================================================================\n';
    txtOutput += 'Files\n';
    txtOutput += '================================================================\n\n';

    fileDataList.forEach(fileData => {
        const { filePath, content } = fileData;
        txtOutput += '================\n';
        txtOutput += `File: ${filePath}\n`;
        txtOutput += '================\n';
        txtOutput += content;
        txtOutput += '\n\n';
    });

    return txtOutput;
}

/**
 * Markdown格式合并文件内容
 * @param {Array} fileDataList - 文件数据数组
 * @param {Object} options - 选项
 * @returns {string} Markdown格式的合并内容
 */
function mergeFileContentsMD(fileDataList, options = {}) {
    const { includeDirectoryStructure = true } = options;

    let mdOutput = '';

    // 添加目录结构
    if (includeDirectoryStructure && fileDataList.length > 0) {
        mdOutput += '# Directory Structure\n\n';
        mdOutput += '```\n';
        mdOutput += generateDirectoryStructure(fileDataList);
        mdOutput += '```\n\n';
    }

    // 添加文件内容
    mdOutput += '# Files\n\n';

    fileDataList.forEach(fileData => {
        const { filePath, content } = fileData;
        const fileExtension = filePath.split('.').pop().toLowerCase();
        const language = getLanguageFromExtension(fileExtension);

        mdOutput += `## File: ${filePath}\n\n`;
        mdOutput += `\`\`\`${language}\n`;
        mdOutput += content;
        mdOutput += '\n```\n\n';
    });

    return mdOutput;
}



/**
 * 根据文件扩展名获取语言标识
 * @param {string} extension - 文件扩展名
 * @returns {string} 语言标识
 */
function getLanguageFromExtension(extension) {
    const languageMap = {
        'js': 'javascript',
        'jsx': 'jsx',
        'ts': 'typescript',
        'tsx': 'tsx',
        'py': 'python',
        'java': 'java',
        'c': 'c',
        'cpp': 'cpp',
        'cc': 'cpp',
        'cxx': 'cpp',
        'h': 'c',
        'hpp': 'cpp',
        'cs': 'csharp',
        'php': 'php',
        'rb': 'ruby',
        'go': 'go',
        'rs': 'rust',
        'swift': 'swift',
        'kt': 'kotlin',
        'scala': 'scala',
        'html': 'html',
        'htm': 'html',
        'css': 'css',
        'scss': 'scss',
        'sass': 'sass',
        'less': 'less',
        'json': 'json',
        'xml': 'xml',
        'yaml': 'yaml',
        'yml': 'yaml',
        'toml': 'toml',
        'ini': 'ini',
        'cfg': 'ini',
        'conf': 'ini',
        'sh': 'bash',
        'bash': 'bash',
        'zsh': 'zsh',
        'fish': 'fish',
        'ps1': 'powershell',
        'bat': 'batch',
        'cmd': 'batch',
        'sql': 'sql',
        'md': 'markdown',
        'txt': 'text'
    };

    return languageMap[extension] || 'text';
}

// 将新函数暴露到全局作用域
window.mergeFileContentsXML = mergeFileContentsXML;
window.mergeFileContentsTXT = mergeFileContentsTXT;
window.mergeFileContentsMD = mergeFileContentsMD;
window.generateDirectoryStructure = generateDirectoryStructure;

// 也支持ES6模块导出（如果需要）
export {
    mergeFileContents,
    simpleMergeFiles,
    formatFileBlock,
    downloadMergedContent,
    mergeFileContentsXML,
    mergeFileContentsTXT,
    mergeFileContentsMD,
    generateDirectoryStructure
};
