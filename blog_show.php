<?php
/**
 *
 * @author 疯牛 liu1s0404@outlook.com
 * @package: blog_collect
 */
header("Content-type:text/html;charset=utf-8");

$path = $_GET['path'];

if ( ($content = file_get_contents($path)) == false) {
    die('get blog content fail');
}


echo $content;