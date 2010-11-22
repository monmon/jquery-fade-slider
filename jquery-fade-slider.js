/*
 *
 * jQuery fade slider JavaScript Library v0.0.1
 * http://jquery.com/
 *
 * Copyright 2010, monmon
 * http://twitter.com/lesamoureuses
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *

div.background {
    overflow: hidden;
    width: 600px;
    height: 300px;
}
div.wrapper {
    position: relative;
    width: 1000px; 
    margin-left: -150px;
}
div.captures {
    display: inline;
}
div.active {
    border: 1px #eee solid;
}

<div class="background">
   <div class="wrapper" style="overflow: hidden;">
       <div class="captures left">
        <img src="logo1.png">
      </div>
       <div class="captures active">
          <img src="logo2.gif">
         </div>
       <div class="captures right">
       <img src="logo3.jpg">
        </div>
   </div>
</div>
*/

(function($){

$(function(){
    var images = ['logo1.png', 'logo2.gif', 'logo3.jpg', 'logo4.gif'];
    
    var moveImg = function(isLeft) {
        if (isLeft) {
            images.reverse();
        }
        var img = images.shift()
        images[images.length] = img;
        if (isLeft) {
            images.reverse();
        }

        $('div.captures > img').each(function(i) {
            $(this).attr('src', images[i]);
        })
        .parent()
            .filter('.active')
                .fadeTo("slow", 1.0, function(){
                    $(this)
                        .parent()
                            .find('div:not(.active)')
                                .fadeTo("slow", 0.5)
                })

    };

    // 初期化処理
    $("div.captures")
        .not('.active')
            .animate({ "opacity" : 0.5 }, 0)
            .css({'visibility' : 'visible'})
        .end()
        .filter('.active')
            .click(function(ev){
                var $this = $(this);

                // clickされた場合にはautoClickのdelayでqueueに溜まってる分を取り出し、
                // 実行されないようにする
                if (typeof ev.which !== 'undefined') {
                    $.queue($this.get(0), 'fx').pop();
                    $this.unbind('autoClick');
                }

                $this
                    .fadeTo("slow", 0.0, function(){
                        var $this = $(this);

                        // どちらの画像を移動させるかの判断
                        // autoClickの場合は右の画像を持ってきたいので
                        // this.width()をつかう because ev.pageX is undefined
                        var pos = (ev.pageX || $this.width()) - $this.offset().left;
                        var center = $this.width() / 2;

                        // 両端のアニメーション
                        var isMoved = false;
                        $this.parent()
                            .find('div:not(.active)')
                                .fadeTo("slow", 0.0, function(){
                                    if (isMoved) return;

                                    if (pos < center) { // click at left 
                                        moveImg(true);
                                    }
                                    else { // click at right
                                        moveImg();
                                    }

                                    if (typeof ev.which === 'undefined') {
                                        $('.active').trigger('autoClick');
                                    }
                                    else {
                                    }
                                    isMoved = true;
                                });

                    });

            })
            .bind('autoClick', function(ev) {
                $('.active')
                    .delay(2000)
                    .click()
            })
            .trigger('autoClick');


});

})(jQuery);
