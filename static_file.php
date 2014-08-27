<?php
/**
 * 静态文件处理流程
 *
 * @author 疯牛 liu1s0404@outlook.com
 * @package: blog_collect
 */
$rootPath = __DIR__; //上层目录
$blogDirPath = $rootPath . '/blog_source';

$uri = $_SERVER['REQUEST_URI'];
if (preg_match('/\.(gif|jpg)/', $uri)) {
    header(
        sprintf("Location:http://static_%s%s", $_SERVER['SERVER_NAME'], $uri)
    );
}

if (preg_match('/\.css/', $uri)) {
    header("Content-type:text/css;charset=utf-8");
} else {
    header("Content-type:text/html;charset=utf-8");
}


$content = file_get_contents($blogDirPath . urldecode($_SERVER['REQUEST_URI']));

echo $content;