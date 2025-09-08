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
            // Handle absolute paths starting with /
            if (url.startsWith('/') && !url.startsWith('//') && !url.startsWith(window.GITHUB_PAGES_BASE_PATH)) {
                url = window.GITHUB_PAGES_BASE_PATH + url;
            }
            // Handle relative paths starting with ./
            else if (url.startsWith('./')) {
                url = window.GITHUB_PAGES_BASE_PATH + url.substring(1);
            }
            // Handle relative paths without prefix (assets/, docs/, etc.)
            else if (!url.startsWith('http') && !url.startsWith('//') && !url.includes(':') && !url.startsWith(window.GITHUB_PAGES_BASE_PATH)) {
                url = window.GITHUB_PAGES_BASE_PATH + '/' + url;
            }
        }
        return originalFetch.call(this, url, options);
    };
    
    // Override XMLHttpRequest to handle relative paths
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        if (typeof url === 'string' && window.GITHUB_PAGES_BASE_PATH) {
            // Handle absolute paths starting with /
            if (url.startsWith('/') && !url.startsWith('//') && !url.startsWith(window.GITHUB_PAGES_BASE_PATH)) {
                url = window.GITHUB_PAGES_BASE_PATH + url;
            }
            // Handle relative paths starting with ./
            else if (url.startsWith('./')) {
                url = window.GITHUB_PAGES_BASE_PATH + url.substring(1);
            }
            // Handle relative paths without prefix (assets/, docs/, etc.)
            else if (!url.startsWith('http') && !url.startsWith('//') && !url.includes(':') && !url.startsWith(window.GITHUB_PAGES_BASE_PATH)) {
                url = window.GITHUB_PAGES_BASE_PATH + '/' + url;
            }
        }
        return originalOpen.call(this, method, url, async, user, password);
    };
    
    // Also override document.createElement for script and link tags
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const element = originalCreateElement.call(this, tagName);
        
        if (tagName.toLowerCase() === 'script') {
            const originalSetSrc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src').set;
            Object.defineProperty(element, 'src', {
                set: function(value) {
                    if (typeof value === 'string' && window.GITHUB_PAGES_BASE_PATH) {
                        if (value.startsWith('/') && !value.startsWith('//') && !value.startsWith(window.GITHUB_PAGES_BASE_PATH)) {
                            value = window.GITHUB_PAGES_BASE_PATH + value;
                        } else if (!value.startsWith('http') && !value.startsWith('//') && !value.includes(':') && !value.startsWith(window.GITHUB_PAGES_BASE_PATH)) {
                            value = window.GITHUB_PAGES_BASE_PATH + '/' + value;
                        }
                    }
                    originalSetSrc.call(this, value);
                },
                get: function() {
                    return Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src').get.call(this);
                }
            });
        }
        
        if (tagName.toLowerCase() === 'link') {
            const originalSetHref = Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'href').set;
            Object.defineProperty(element, 'href', {
                set: function(value) {
                    if (typeof value === 'string' && window.GITHUB_PAGES_BASE_PATH) {
                        if (value.startsWith('/') && !value.startsWith('//') && !value.startsWith(window.GITHUB_PAGES_BASE_PATH)) {
                            value = window.GITHUB_PAGES_BASE_PATH + value;
                        } else if (!value.startsWith('http') && !value.startsWith('//') && !value.includes(':') && !value.startsWith(window.GITHUB_PAGES_BASE_PATH)) {
                            value = window.GITHUB_PAGES_BASE_PATH + '/' + value;
                        }
                    }
                    originalSetHref.call(this, value);
                },
                get: function() {
                    return Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'href').get.call(this);
                }
            });
        }
        
        return element;
    };
    
    console.log('GitHub Pages configuration loaded. Base path:', window.GITHUB_PAGES_BASE_PATH || 'none');
})();