var log = function() {
    console.log.apply(console, arguments)
}

var insertCss = function() {
    var css = `
    <style>
        .vertical-center {
            top: 50%;
            position: relative;
            transform: translateY(-50%);
        }
        .wu-slide {
            width: 730px;
            height: 454px;
            overflow: hidden;
        }
        .wu-slide-images {
            position: relative;
            width: 100%;
            height: 100%;
        }
        .wu-slide-img {
            display: none;
        }
        .wu-slide-active {
            display: block;
        }
        .wu-slide-button {
            position: absolute;
            display: inline-block;
            height: 40px;
            padding: 2px;
            opacity: 0.4;
            background: lightgrey;
            font-size: 25px;
        }
        .wu-slide-button-left {
            left: 0;
        }
        .wu-slide-button-right {
            right: 0;
        }
        .wu-slide-indicators {
            position: relative;
            top: -20px;
            color: white;
            text-align: center
        }
        .wu-slide-i {
            display: inline-block;
            background: grey;
            border-radius: 50%;
            width: 17px;
            height: 17px;
            margin: 0px 5px;
        }
        .wu-slide-i-active {
            background: red;
        }
    </style>
    `
    $('head').append(css)
}

var insertImgs = function(element, images) {
    // imgs 是 图像标签
    // inds 是下方的 指示器标签
    var imgs = ``
    var inds = ``

    for (var i = 1; i < images.length; i++) {
        imgs += `<img class='wu-slide-img' src=${images[i]} alt="" />`
        inds += `<div class="wu-slide-i">${i + 1}</div>`
    }

    var slide = `
    <div class="wu-slide">
        <div class="wu-slide-images" data-act=0>
            <img class='wu-slide-img wu-slide-active' src=${images[0]} alt="" />
            ${imgs}
            <button class="wu-slide-button wu-slide-button-left vertical-center" type="button">&lt;</button>
            <button class="wu-slide-button wu-slide-button-right vertical-center" type="button">&gt;</button>
        </div>
        <div class="wu-slide-indicators">
            <div class="wu-slide-i wu-slide-i-active">1</div>
            ${inds}
        </div>
    </div>
    `
    $(element).append(slide)
}

var initSlide = function(element, images) {
    insertCss()
    insertImgs(element, images)
    window.numOfImgs = images.length

    // 初始化 Slide 动画
    $('.wu-slide-img').each(function(i, e){
        $(e).fadeIn(0)
        $(e).fadeOut(0)
        if(i == 0) {
            $(e).fadeIn(0)
        }
    })
}

var play = function(index) {
    $('.wu-slide-active').fadeOut()
    $('.wu-slide-active').removeClass('wu-slide-active')
    $($('.wu-slide-img')[index]).addClass('wu-slide-active')
    $('.wu-slide-active').fadeIn()
    $('.wu-slide-images').data('act', index)
    $('.wu-slide-i-active').removeClass('wu-slide-i-active')
    $($('.wu-slide-i')[index]).addClass('wu-slide-i-active')
}

var bindEventClick = function() {
    $('.wu-slide-button').on('click', function(){
        log('button')
        var num = window.numOfImgs
        if(this.classList.contains('wu-slide-button-right')) {
            var index = ($('.wu-slide-images').data('act') + 1) % num
        } else {
            var index = ($('.wu-slide-images').data('act') + num - 1) % num
        }
        play(index)
    })
}

var bindEventMouseover = function() {
    $('.wu-slide-i').on('mouseover', function(){
        log('mouseover', this)
        $('.wu-slide-i-active').removeClass('wu-slide-i-active')
        var index = Number($(this).text()) - 1
        play(index)
    })
}

var bindEvents = function() {
    // 绑定点击 < > 按钮事件
    bindEventClick()

    // 绑定鼠标移到到 下标 的事件
    bindEventMouseover()
}

/*
通过传递图片 URL 参数来创建一个 slide
    其中 element 是个选择器，创建的 slide 就插在这个选择器的 beforeend
        images 是一个包含了图片地址的 array
*/
var BananasSlide = function(element, images) {
    initSlide(element, images)
    bindEvents()
}
