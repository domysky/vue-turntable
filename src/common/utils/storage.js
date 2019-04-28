/*========本地存储===========*/
const STORE_PREFIX = '_SIH_'
export let storage = {
	getPrefix: () => STORE_PREFIX,
	cookies: {
		get(sKey) {
			if (!sKey) return null
			sKey = STORE_PREFIX + sKey
			return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
		},
		set(sKey, sValue, vEnd = 1800, sPath = '/', sDomain = '', bSecure = false) {
			if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) return false

			sKey = STORE_PREFIX + sKey
			let sExpires = ''
			if (vEnd) {
				switch (vEnd.constructor) {
					case Number: // 单位秒
						sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
						break
					case String:
						sExpires = '; expires=' + vEnd
						break
					case Date:
						sExpires = '; expires=' + vEnd.toUTCString()
						break
				}
			}
			document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '')
			return true
		},
		remove(sKey, sPath = '/', sDomain = '') {
			if (!this.has(sKey)) return false

			sKey = STORE_PREFIX + sKey
			document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')
			return true
		},
		has(sKey) {
			if (!sKey) return false
			return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
		},
		keys() {
			let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/)
			for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]) }
			return aKeys
		}
	},
	session: {
		set(key, value) {
			if (!key) return false
			window.sessionStorage.setItem(STORE_PREFIX + key, JSON.stringify(value || {}))
		},
		get(key) {
			if (!key) return null
			return JSON.parse(window.sessionStorage.getItem(STORE_PREFIX + key))
		},
		remove(key) {
			window.sessionStorage.removeItem(STORE_PREFIX + key)
		},
		removeAll() {
			window.sessionStorage.clear()
		}
	},
	local: {
		getUsedSize() {
			return unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
		},
		getFreeSize() { //5M
			return 1024 * 1024 * 5 - this.getUsedSize();
		},
		set(key, value, ms = 1000 * 3600 * 24 * 365) {
			if (!key) return false

			key = STORE_PREFIX + key
			let newValue = {
				value: value,
				expires: ms,
				time: new Date().getTime()
			}
			window.localStorage.setItem(key, JSON.stringify(newValue))
		},
		get(key) {
			if (!key) return null
			key = STORE_PREFIX + key

			let value = JSON.parse(window.localStorage.getItem(key))
			if (value && (new Date().getTime() - value.time < value.expires)) {
				value = value.value
			} else {
				value = null
			}
			return value
		},
		remove(key) {
			window.localStorage.removeItem(STORE_PREFIX + key)
		},
		removeAll() {
			window.localStorage.clear()
		}
	}
}

export default storage;
