// GitHub Pages Configuration
// This script handles base path configuration for GitHub Pages deployment

(function() {
    // Detect if running on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    const currentPath = window.location.pathname;
    
    if (isGitHubPages && currentPath !== '/') {
        const pathSegments = currentPath.split('/').filter(Boolean);
        if (pathSegments.length > 0) {
            window.GITHUB_PAGES_BASE_PATH = '/' + pathSegments[0];
        }
    } else {
        window.GITHUB_PAGES_BASE_PATH = '';
    }
    
    // Override fetch to handle relative paths
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        if (typeof url === 'string' && window.GITHUB_PAGES_BASE_PATH) {
            if (url.startsWith('./')) {
                url = window.GITHUB_PAGES_BASE_PATH + url.substring(1);
            } else if (url.startsWith('/') && !url.startsWith('//') && !url.startsWith(window.GITHUB_PAGES_BASE_PATH)) {
                url = window.GITHUB_PAGES_BASE_PATH + url;
            } else if (!url.startsWith('http') && !url.startsWith('//') && !url.includes(':')) {
                // Handle relative paths without ./ prefix
                url = window.GITHUB_PAGES_BASE_PATH + '/' + url;
            }
        }
        return originalFetch.call(this, url, options);
    };
    
    // Override XMLHttpRequest for older requests
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
        if (typeof url === 'string' && window.GITHUB_PAGES_BASE_PATH) {
            if (url.startsWith('./')) {
                url = window.GITHUB_PAGES_BASE_PATH + url.substring(1);
            } else if (url.startsWith('/') && !url.startsWith('//') && !url.startsWith(window.GITHUB_PAGES_BASE_PATH)) {
                url = window.GITHUB_PAGES_BASE_PATH + url;
            } else if (!url.startsWith('http') && !url.startsWith('//') && !url.includes(':')) {
                // Handle relative paths without ./ prefix
                url = window.GITHUB_PAGES_BASE_PATH + '/' + url;
            }
        }
        return originalXHROpen.call(this, method, url, ...args);
    };
    
    console.log('GitHub Pages configuration loaded. Base path:', window.GITHUB_PAGES_BASE_PATH || 'none');
})();