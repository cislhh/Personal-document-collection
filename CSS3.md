## CSS3

#### 1、使用inline-block进行一行布局，内部元素产生错层问题
在使用inline-block时，浏览器会默认给该元素编译一个vertical-align:baseline，这会让元素中的内容按照这个基准基线对齐，想解决可以统一使用一个基线对齐，比如vertical-align: middle;

