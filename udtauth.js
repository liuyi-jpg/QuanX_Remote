const $ = new Env('UDT Auth 提取');

!(async () => {
    try {
        // 环境检查
        if (!$request) {
            $.msg('UDT Auth 提取失败', '', '请在 HTTP 请求脚本中运行');
            $.done();
            return;
        }

        // 获取请求头中的 udtauth12，兼容大小写
        const udtauth = $request.headers['udtauth12'] || 
                       $request.headers.udtauth12 || 
                       $request.headers['UDTAUTH12'];
        
        if (udtauth) {
            // 去除前后空格
            const trimmedAuth = udtauth.trim();
            
            // 发送通知
            $.msg('UDT Auth 提取成功', '', `${trimmedAuth}`);
            
            // 输出日志
            $.log(`✅ 成功提取 udtauth12: ${trimmedAuth}`);
        } else {
            
            $.log('❌ 未找到 udtauth12 请求头');
        }
    } catch (e) {
        
        $.log(`❌ 错误: ${e.message}`);
    }
})()
.catch((e) => {
    $.msg('UDT Auth 提取失败', '', e.message);
    $.log(`❌ 错误: ${e.message}`);
})
.finally(() => $.done());

// Env 类完整实现
function Env(t) {
    return new class {
        constructor(t) {
            this.name = t;
            this.isNode = typeof module !== 'undefined';
            this.isQuanX = typeof $notify !== 'undefined';
            this.isSurge = typeof $notification !== 'undefined';
            this.request = $request || {};
        }
        
        log(...t) {
            if(this.isNode) {
                console.log(t.join("\n"));
            } else {
                console.log(`[${this.name}] ${t.join("\n")}`);
            }
        }
        
        msg(title, subt = '', desc = '', opts = {}) {
            if(this.isQuanX) {
                $notify(title, subt, desc, opts);
            } else if(this.isSurge) {
                $notification.post(title, subt, desc, opts);
            } else {
                console.log(`${title}\n${subt}\n${desc}`);
            }
        }
        
        done(val = {}) {
            if(this.isQuanX || this.isSurge) {
                $done(val);
            } else {
                return val;
            }
        }
    }(t);
}
