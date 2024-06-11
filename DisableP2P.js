[rewrite_local]
^https://www\.bilibili\.com/video/.*$ script-response-body https://raw.githubusercontent.com/huqios/QuantumultX/main/disableP2P.js
^https://www\.bilibili\.com/bangumi/play/.*$ script-response-body https://raw.githubusercontent.com/huqios/QuantumultX/main/disableP2P.js

[mitm]
hostname = www.bilibili.com
