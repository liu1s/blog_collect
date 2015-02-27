<?php
/**
 * regure change the owner of the blog files to be nginx user
 *
 * @author 疯牛 liu1s0404@outlook.com
 * @package: blog_collect
 */
$rootPath = dirname(__DIR__); //上层目录
$blogDirPath = $rootPath . '/blog_source';
$rootUser = 'root';
$nginxUser = 'www-data';

if ($_SERVER['USER'] != $rootUser) {
    die('not the root user');
}

$result = system('chmod -R 745 ' . $blogDirPath);

if (!empty($result)) {
    die('change file access fail');
}