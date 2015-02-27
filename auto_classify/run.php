<?php
/**
 * 检索所有的blog并根据title对其进行分类
 * 该脚本需要用root帐号执行，因为里面需要修改一些目录的权限 //todo 目前这个地方还没有处理好
 *
 * @author 疯牛 liu1s0404@outlook.com
 * @package: blog_collect
 */
$rootPath = dirname(__DIR__); //上层目录
$blogDirPath = $rootPath . '/blog_source';
$autoClassifyPath = $rootPath . '/auto_classify';

if (!is_dir($blogDirPath)) {
    die('the path' . $blogDirPath . 'is not a dir');
}

if (!is_readable($blogDirPath)) {
    die('the path ' . $blogDirPath . 'is not readble');
}

//获取文件夹中所有html文件，暂只获取一层
$htmlPattern = '/^.+html$/';
$tmpHtmlArray = array();
$dir = dir($blogDirPath);
while ($path = $dir->read()) {
    //文件夹直接跳过
    if (is_dir($blogDirPath . '/' . $path)) {
        continue;
    }

    //不是html文件跳过
    if (!preg_match($htmlPattern, $path)) {
        continue;
    }

    array_push($tmpHtmlArray, $path);
}
$dir->close();

//修改source目录下文件的执行权限
include_once 'change_owner.php';

//临时把html元素已数组形式存在于文件中
$htmlContent = '<?php' . PHP_EOL;
$htmlContent .= '$htmlList = array();' . PHP_EOL;
foreach ($tmpHtmlArray as $row) {
    $htmlContent .= sprintf('$htmlList[] = array("title"=>"%s","path"=>"%s");' . PHP_EOL, $row , $blogDirPath . '/' . $row);
}
$htmlContent .= 'return $htmlList;';
$tmpHtmlListFile = $autoClassifyPath . '/tmp_html_list.php';
if (!file_put_contents($tmpHtmlListFile, $htmlContent)) {
    die('generate the tmp html list file fail');
}

