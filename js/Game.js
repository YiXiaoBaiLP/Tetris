// 这种方式
// 打包时会与别的项目同名文件会存在冲突
// function Game(){
//     alert("执行了！");
// }
// 使用IIFE包裹起来进行隔离（使用IIFE隔离作用域），避免打包时出现冲突
// (function() {})() 可以将这个方法变成 window 的一个属性
(function() {
  // 赋值给 window 中的一个属性；主要用于隔绝作用域
  window.Game = function() {
    // 初始化
    // 设置表格的大小
    this.row = 20;
    this.col = 16;
    // 初始化
    this.init();
    // 实例方块
    this.block = new Block();
    // 实例地图
    this.map = new Map();
    // 启动定时器
    this.start();
    this.bindEvent();
  };
  // 初始化游戏中的表格
  Game.prototype.init = function() {
    var $table = $("<table></table>");
    // 渲染表格
    for (var i = 0; i < this.row; i++) {
      // 创建tr
      var $tr = $("<tr></tr>");
      for (var j = 0; j < this.col; j++) {
        // 创建td
        var $td = $("<td></td>");
        $td.appendTo($tr);
      }
      $tr.appendTo($table);
    }
    $($table).appendTo("body");
  };

  Game.prototype.setColor = function(row, col, num) {
    // 给对应有颜色的方块添加类名
    $("tr")
      .eq(row)
      .children("td")
      .eq(col)
      .addClass("c" + num);
  };

  // 清屏功能
  Game.prototype.clear = function() {
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.col; j++) {
        $("tr").eq(i).children("td").eq(j).removeClass();
      }
    }
  };

  // 事件监听
  Game.prototype.bindEvent = function() {
    // 备份
    var self = this;
    $(document).keydown(function(event) {
      if (event.keyCode === 37) {
        // 判断是否有向左移动的能力
        self.block.checkLeft();
      } else if (event.keyCode === 39) {
        // 判断是否有向右移动的能力
        self.block.checkRight();
      } else if (event.keyCode === 32) {
        // 一键到底,空格到底
        self.block.checkBlockEnd();
      } else if (event.keyCode === 38) {
        // 键旁上用来切换方向
        self.block.checkRot();
      }
      // console.log(event.keyCode);
    });
  }

  Game.prototype.start = function() {
    var self = this;
    this.timer = setInterval(function() {
      // 清屏
      self.clear();
      // 渲染方块
      self.block.render();
      // 渲染地图
      self.map.render(self);
      self.block.checkDown();
    }, 500);
  };
})();
