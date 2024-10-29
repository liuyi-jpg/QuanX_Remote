// 创建脚本处理请求头
const $ = new Env('UDT Auth 提取');

!(async () => {
    try {
        

        // 获取请求头中的 udtauth12
        const udtauth = $request.headers['udtauth12'];
        
        if (udtauth) {
            // 对 URL 编码的值进行解码
            const decodedAuth = decodeURIComponent(udtauth);
            
            // 发送通知
            $.msg('UDT Auth 提取成功', '', `${decodedAuth}`);
            
            // 输出日志
            $.log(`✅ 成功提取 udtauth12: ${decodedAuth}`);
        } else {
            
            $.log('❌ 未找到 udtauth12 请求头');
        }
    } catch (e) {
        
        $.log(`❌ 错误: ${e.message}`);
    }
})()
.catch((e) => $.log(`❌ 错误: ${e.message}`))
.finally(() => $.done());

// Env 类
function Env(t) {
    return new class {
        constructor(t) {
            this.name = t;
        }
        
        log(...t) {
            console.log(t.join("\n"));
        }
        
        msg(title, subt = '', desc = '', opts = {}) {
            $notify(title, subt, desc, opts);
        }
        
        done() {
            $done({});
        }
    }(t);
}
