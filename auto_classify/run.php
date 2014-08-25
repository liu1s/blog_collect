<?php
/**
 * 检索所有的blog并根据title对其进行分类
 * 该脚本需要用root帐号执行，因为里面需要修改一些目录的权限 //todo 目前这个地方还没有处理好
 *
 * @author 疯牛 liu1s0404@outlook.com
 * @package: blog_collect
 */
$nginxUser = 'wallace';
$blogDirPath = dirname(__DIR__); //上层目录

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

    //todo 需要考虑是否放在别的位置会更好 修改权限
    $result = chown(preg_replace('/\.html$/', '_files' , $blogDirPath . '/' . $path), $nginxUser);
    var_dump($result);
}
$dir->close();

//临时把html元素已数组形式存在于文件中
$htmlContent = '<?php' . PHP_EOL;
$htmlContent .= '$htmlList = array();' . PHP_EOL;
foreach ($tmpHtmlArray as $row) {
    $htmlContent .= sprintf('$htmlList[] = array("title"=>"%s","path"=>"%s");' . PHP_EOL, $row , $blogDirPath . '/' . $row);
}
$htmlContent .= 'return $htmlList;';
$tmpHtmlListFile = 'tmp_html_list.php';
if (!file_put_contents($tmpHtmlListFile, $htmlContent)) {
    die('generate the tmp html list file fail');
}

