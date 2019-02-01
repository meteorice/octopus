

/**
 * 获取地址的ws全名
 * @param path 
 */
export function getWsPath(path: string): string {
	var url = new URL(path, window.location.href);
	url.protocol = (url.protocol === 'https:') ? url.protocol.replace('https', 'wss') : url.protocol.replace('http', 'ws');
	return url.href
}


