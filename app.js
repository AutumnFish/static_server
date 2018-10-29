/*
    静态资源服务器
        让电脑有类似于Apache的功能
        有一个www目录 把自己写好的静态网站 丢进去
        开启之后 用户 通过ip地址访问 
            有首页 返回 页面给用户
            如果没有首页 列表给用户
            修改数据1
            修改数据2
            
*/

// nodejs 要开启 http服务 导入模块 生成路径 读取文件(前端开发中 快速操纵dom ->jQ 快速生成轮播图 ->swiper 使用ui框架 ->bs)
let http = require('http');
let fs = require('fs');
let path = require('path');

// 导入mime
let mime = require('mime');
// mime.getType('txt');  mime 导入的第三方包 .getType 包里面的功能
// $.ajax()

// 网站根目录的 绝对路径
let rootPath = path.join(__dirname,'www');

// 开启服务
http.createServer((request,response)=>{

    // 有请求过来(用户访问时触发)
    // console.log('你来啦');

    // 获取用户需要获取的文件->路径
    let reqUrl = request.url;
    // console.log(reqUrl);
    let pathFile = path.join(rootPath,reqUrl);
    console.log('请求的路径是',pathFile);
    // 判断文件是否存在
    if(fs.existsSync(pathFile)){
        // 存在->
        // 是否是文件夹(读取文件夹的函数)
        if(pathFile[pathFile.length-1]=='\\'){
            console.log(pathFile,'是文件夹');
        }else{
            console.log(pathFile,'是文件');
            // 读取文件 返回读取的文件
            fs.readFile(pathFile,(err,data)=>{
                console.log(pathFile,'读取文件完毕 返回');
                // 自行判断 后缀名(.js .css .html .jpg .png .gif .ico)
                // mime类型
                // if else if else
                // 查找是否有人实现了 类似的功能
                response.writeHead(200,{
                    'content-type':mime.getType(pathFile)
                })
                
                if(err){
                    console.log(err);
                }else{
                    response.end(data);
                }
            })
        }
        // 是文件夹(列表)
        // 不是文件夹(读取文件 根据类型 设置不同的 content-type 返回读取的内容)
    }else{
        // 不存在->
        // 404 提示用户 not find
        response.writeHead(404,{
            'content-type':"text/html;charset=utf-8"
        })      
        response.end(`
            <h1>Not Found </h1>
            <p>哥们,你找的页面木有哦, 你再看看吧 O(∩_∩)O哈哈~</p>
        `)  
    }


    // 响应内容
    // response.end('you come');
}).listen(80,'127.0.0.1',()=>{
    console.log('listen to 127.0.0.1:80 success');
})