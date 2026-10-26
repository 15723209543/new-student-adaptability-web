// 通过 GOOS=windows GOARCH=amd64 编译出的启动程序。
// 无需 Python、Node、其他服务环境；仅绑定 127.0.0.1，不接受局域网访问。
package main

import (
    "fmt"
    "net"
    "net/http"
    "os"
    "os/exec"
    "path/filepath"
    "strings"
    "sync/atomic"
    "syscall"
    "time"
    "unsafe"
)

func warning(msg string) {
    user32 := syscall.NewLazyDLL("user32.dll")
    proc := user32.NewProc("MessageBoxW")
    // Call with UTF-16 Windows strings for Chinese error messages.
    title, _ := syscall.UTF16PtrFromString("26-3班问卷启动提示")
    body, _ := syscall.UTF16PtrFromString(msg)
    proc.Call(0, uintptr(unsafePointer(body)), uintptr(unsafePointer(title)), 0x30)
}

// The Windows syscall expects pointers (converted without allocating new memory).
func unsafePointer(p *uint16) unsafe.Pointer { return unsafe.Pointer(p) }

func main() {
    exe, err := os.Executable()
    if err != nil { warning("无法获取启动程序路径。\n"+err.Error()); return }
    base := filepath.Dir(filepath.Dir(exe))
    html := filepath.Join(base, "main.html")
    if _, err = os.Stat(html); err != nil {
        warning("找不到 main.html。请完整解压 ZIP，并保持 start 文件夹与 main.html 在同一级目录。")
        return
    }
    if _, err = os.Stat(filepath.Join(base,"code","app.js"));err != nil {
        warning("找不到网页代码文件。请重新完整解压压缩包。")
        return
    }
    ln,err:=net.Listen("tcp", "127.0.0.1:18726")
    if err!=nil {ln,err=net.Listen("tcp", "127.0.0.1:0")}
    if err!=nil {warning("无法启动本地服务："+err.Error());return}
    port:=ln.Addr().(*net.TCPAddr).Port
    url:=fmt.Sprintf("http://127.0.0.1:%d/main.html",port)
    var lastSeen atomic.Int64
    lastSeen.Store(time.Now().Unix())
    fs:=http.FileServer(http.Dir(base))
    mux:=http.NewServeMux()
    mux.HandleFunc("/__ping",func(w http.ResponseWriter,r *http.Request){lastSeen.Store(time.Now().Unix());w.Header().Set("Cache-Control","no-store");w.WriteHeader(204)})
    mux.Handle("/", http.HandlerFunc(func(w http.ResponseWriter,r *http.Request){
       lastSeen.Store(time.Now().Unix())
       // Localhost only; prevent root directory listings and accidental exposure of EXE/source.
       if r.URL.Path=="/" {http.Redirect(w,r,"/main.html",http.StatusFound);return}
       if strings.HasPrefix(r.URL.Path,"/doc/") || strings.HasPrefix(r.URL.Path,"/start/") || strings.HasSuffix(r.URL.Path,".go") || strings.HasSuffix(r.URL.Path,".py") {
           http.NotFound(w,r);return
       }
       fs.ServeHTTP(w,r)
    }))
    srv:=&http.Server{Handler:mux,ReadHeaderTimeout:10*time.Second}
    go func(){ _=srv.Serve(ln) }()
    err=exec.Command("rundll32.exe","url.dll,FileProtocolHandler",url).Start()
    if err!=nil {err=exec.Command("cmd.exe","/c","start","",url).Start()}
    if err!=nil {warning("服务已启动，但无法打开浏览器。\n请手动访问："+url)}
    // Terminate unattended hidden server after 20 minutes without page requests / heartbeats.
    ticker:=time.NewTicker(60*time.Second)
    defer ticker.Stop()
    for range ticker.C {if time.Now().Unix()-lastSeen.Load()>20*60 { _=srv.Close();return }}
}
