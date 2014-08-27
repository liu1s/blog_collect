<?php
/**
 *
 * @author 疯牛 liu1s0404@outlook.com
 * @package: blog_collect
 */
header("Content-type:text/html;charset=utf-8");

$blogList = require(__DIR__ . '/auto_classify/tmp_html_list.php');

foreach ($htmlList as $blog) {
    ?>
    <div>
        <a href="blog_show.php?path=<?php echo $blog['path'];?>" target="_blank">
            <?php echo $blog['title'];?>
        </a>
    </div>

    <?php
}