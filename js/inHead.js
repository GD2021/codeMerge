// GPT-3 encoder 已删除，现在只使用正则表达式计算tokens

        // 从.gitignore读取忽略规则
        async function readGitignoreFile(directoryEntry) {
            return new Promise((resolve, reject) => {
                if (!directoryEntry || !directoryEntry.createReader) {
                    resolve('');
                    return;
                }
                directoryEntry.getFile('.gitignore', {}, 
                    fileEntry => {
                        fileEntry.file(file => {
                            const reader = new FileReader();
                            reader.onload = e => resolve(e.target.result);
                            reader.onerror = e => reject(e);
                            reader.readAsText(file);
                        });
                    },
                    error => resolve('') // 如果没有.gitignore文件，返回空字符串
                );
            });
        }

        // 解析.gitignore内容为过滤规则
        function parseGitignoreRules(gitignoreContent) {
            if (!gitignoreContent) return [];
            
            // 按行分割
            const lines = gitignoreContent.split(/\r?\n/);
            
            // 过滤掉空行和注释
            return lines
                .map(line => line.trim())
                .filter(line => line && !line.startsWith('#'))
                .map(rule => {
                    // 处理规则，移除开头的!（取反规则暂不处理）
                    if (rule.startsWith('!')) return null; // 暂不处理取反规则
                    
                    // 删除开头的/，它表示根目录匹配
                    let processedRule = rule.startsWith('/') ? rule.substring(1) : rule;
                    
                    // 处理目录指示符（尾部的/）
                    if (processedRule.endsWith('/')) {
                        processedRule = processedRule.slice(0, -1);
                    }
                    
                    return processedRule;
                })
                .filter(Boolean); // 过滤掉null值
        }

        // 检查文件是否应该根据.gitignore规则被排除
        function shouldExcludeByGitignoreRules(filePath, gitignoreRules) {
            return gitignoreRules.some(rule => {
                // 简单的通配符转换为正则表达式
                let regexRule = rule
                    .replace(/\./g, '\\.')      // 转义点
                    .replace(/\*\*/g, '.*')     // **匹配任意字符
                    .replace(/\*/g, '[^/]*')    // *匹配单层目录内的任意字符
                    .replace(/\?/g, '[^/]');    // ?匹配单个字符
                
                const regex = new RegExp(`(^|/)${regexRule}(/|$)`);
                return regex.test(filePath);
            });
        }