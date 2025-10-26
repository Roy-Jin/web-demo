let { api, server, type, id } = {
    api: "https://api.injahow.cn/meting/",
    server: "netease",
    type: "playlist",
    id: "13866167529" // 歌单来源：https://music.163.com/m/playlist?id=13866167529&creatorId=12987185433
}

const api_url = new URL(api);
api_url.searchParams.set("server", server);
api_url.searchParams.set("type", type);
api_url.searchParams.set("id", id);

// 发起请求
let data = await fetch(api_url.href)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    });

export {
    data,
    api,
    server,
    type,
    id
};