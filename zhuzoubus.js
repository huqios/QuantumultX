const url = $request.url;
let body = $response.body;

if (url.indexOf("getAdvertisements") !== -1) {
    try {
        let list = JSON.parse(body);
        if (Array.isArray(list)) {
            if (url.indexOf("type=4") !== -1) {
                // type=4 为公交资讯/通知公告
                // 剔除宣传公关软文，仅保留线路调整与便民通知
                const filtered = list.filter(item => {
                    const text = (item.TITLE || "") + (item.DESCRIPTION || "");
                    return !/广告公司|国资系统宣讲|赞助|商户/.test(text);
                });
                body = JSON.stringify(filtered);
            } else {
                // type=0 (Banner), type=1 (公益推广), type=2 (弹窗) 直接置空
                body = JSON.stringify([]);
            }
        }
    } catch (e) {
        body = "[]";
    }
}

$done({ body });
