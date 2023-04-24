String.prototype.trimChar = function (charlist) {
    if (typeof charlist == 'undefined') {
        charlist = '\\s';
    }
    let pattern = '^[' + charlist + ']*(.*?)[' + charlist + ']*$';
    return this.replace(new RegExp(pattern), '$1')
}

function normalizeObj(obj) {
    if (obj) {
        if (obj instanceof Date) {
            let dateStr = obj.toISOString().slice(0, 19).replace('T', ' ');
            return dateStr;
        }
        else if (Array.isArray(obj)) {
            return [...obj].map((e) => normalizeObj(e));
        }
        else if (obj !== null && typeof obj === 'object') {
            const payload = { ...obj };
            Object.keys(payload).forEach(function (key) {
                payload[key] = normalizeObj(payload[key]);
            });
            return payload;
        }
        return obj.toString();
    }
    return null;

}

export const utils = {
    getPagePath(path) {
        if (path) {
            path = path.trimChar("/");
            let arrPath = path.split("/")
            let page = arrPath[0];
            return "/" + page;
        }
        return "/";
    },
    getRoutePath(path) {
        if (path) {
            path = path.trimChar("/");
            let arrPath = path.split("/");
            let page = arrPath[0];
            let action = arrPath[1];
            if (!action || action == "index") {
                action = "list"
            }
            return page + "/" + action;
        }
        return "/";
    },
    setApiPath(path, queryObj) {
        if (queryObj) {
            var str = [];
            for (var key in queryObj) {
                var value = queryObj[key]
                if (queryObj.hasOwnProperty(key) && value !== '') {
                    str.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
                }
            }
            var qs = str.join("&");
            if (path.indexOf('?') > 0) {
                path = path + '&' + qs;
            }
            else {
                path = path + '?' + qs;
            }
        }
        return this.joinPaths([process.env.API_PATH, path]);
    },
    setImgUrl(src, imgSize='small') {
        if (src) {
            if(src.includes('/temp/') || src.includes(`/${imgSize}/`)){
                return this.getFileFullPath(src);
            }
            src = src.toString().split(",")[0]; //if multiple image, use the first
            let isExternalFile = this.isExternalFile(src);
            if (imgSize && !isExternalFile) {
                let paths = src.toString().split('/');
                paths.splice(-1, 0, imgSize);
                src = paths.join('/');
            }
            return this.getFileFullPath(src);
        }
        return "images/no-image-available.png";
    },

    //Convert javascript to date object to mysql date format (YYYY-MM-DD HH:mm:ss)
    toArray(val) {
        if (val) {
            if (Array.isArray(val)) {
                return val;
            }
            else {
                return val.split(",");
            }
        }
        else {
            return [];
        }
    },
    serializeQuery(params, prefix) {
        const query = Object.keys(params).map((key) => {
            const value = params[key];

            if (params.constructor === Array)
                key = `${prefix}[]`;
            else if (params.constructor === Object)
                key = (prefix ? `${prefix}[${key}]` : key);

            if (typeof value === 'object')
                return this.serializeQuery(value, key);
            else
                return `${key}=${encodeURIComponent(value)}`;
        });

        return [].concat.apply([], query).join('&');
    },
    trim(str, charlist) {
        if (typeof charlist == 'undefined') {
            charlist = '\\s';
        }
        let pattern = '^[' + charlist + ']*(.*?)[' + charlist + ']*$';
        return str.replace(new RegExp(pattern), '$1')
    },
    /**
     * Joins 2 paths together without duplicate separators
     * @param parts the parts of the url to join. eg: ['http://google.com/', '/path/']
     * @returns {string} The combined path
     */
    joinPaths(parts) {
        let separator = '/';

        return parts.map(function (part) {
            if (part) {
                return part.trim().replace(/(^[\/]*|[\/]*$)/g, '');
            }
            return ""
        }).join(separator);
    },
    getFileFullPath(path) {
        let isFullPath = path.startsWith("https://") || path.startsWith("http://");
        if (isFullPath) {
            return path;
        }
        return this.joinPaths([process.env.API_URL, path]);
    },
    isExternalFile(path) {
        let fullPath = this.getFileFullPath(path);
        let baseUrl = process.env.API_URL; //app base url
        let isLocalFile = fullPath.startsWith(baseUrl);
        return !isLocalFile;
    },
    strEllipsis(string, maxLength) {
        if (!string) return string;
        if (maxLength < 1) return string;
        if (string.length <= maxLength) return string;
        if (maxLength == 1) return string.substring(0, 1) + '...';

        var midpoint = Math.ceil(string.length / 2);
        var toremove = string.length - maxLength;
        var lstrip = Math.ceil(toremove / 2);
        var rstrip = toremove - lstrip;
        return string.substring(0, midpoint - lstrip) + '...'
            + string.substring(midpoint + rstrip);
    },
    normalizeFormData(postData){
		if(Array.isArray(postData)){
			return [...postData].map((e)=>normalizeObj(e));
		}
		else{
			return normalizeObj(postData);
		}
	}

}


