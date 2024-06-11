// Quantumult X script to disable P2P CDN on Bilibili

(function() {
    let cdnDomain;

    function replaceP2PUrl(url) {
        cdnDomain ||= document.head.innerHTML.match(/up[\w-]+\.bilivideo\.com/)?.[0];

        try {
            const urlObj = new URL(url);
            const hostName = urlObj.hostname;
            if (urlObj.hostname.endsWith(".mcdn.bilivideo.cn")) {
                urlObj.host = cdnDomain || 'upos-sz-mirrorcoso1.bilivideo.com';
                urlObj.port = 443;
                console.warn(`更换视频源: ${hostName} -> ${urlObj.host}`);
                return urlObj.toString();
            } else if (urlObj.hostname.endsWith(".szbdyd.com")) {
                urlObj.host = urlObj.searchParams.get('xy_usource');
                urlObj.port = 443;
                console.warn(`更换视频源: ${hostName} -> ${urlObj.host}`);
                return urlObj.toString();
            }
            return url;
        } catch (e) {
            return url;
        }
    }

    function replaceP2PUrlDeep(obj) {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = replaceP2PUrl(obj[key]);
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                replaceP2PUrlDeep(obj[key]);
            }
        }
    }

    // Assuming __playinfo__ is available in response body
    let body = $response.body;
    let obj = JSON.parse(body);

    replaceP2PUrlDeep(obj);

    body = JSON.stringify(obj);
    $done({body});
})();
