
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    /* ハンバーガーボタン */
    $(".js-hamburger").click(function () {
        if ($(".js-hamburger").hasClass('is-active')) {
            $('.js-hamburger').removeClass("is-active");
            $(".js-sp-nav").fadeOut(300);
        } else {
            $('.js-hamburger').addClass("is-active");
            $(".js-sp-nav").fadeIn(300);
        }
    });

    /* スワイパー */
    var swiper = new Swiper(".js-mv-swiper", {
        pagination: {
            el: ".js-mv-pagination",
        },
        clickable: true,
        loop: true,

        /* フェードエフェクト */
        effect: 'fade',
        speed: 3000,

        autoplay: {
            /* 3000くらいが適当か？ */
            delay: 3000,
        },
    });

    /* ===================
    お問合せフォーム・送信完了
    =================== */
    /* しょーごログ https://shogo-log.com/google-form-ajax/ */
    $(document).ready(function () {
        $('#form').submit(function (event) {
            var formData = $('#form').serialize();
            $.ajax({
                url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc6xYypQ4hgfJWPJVyuGtNVWwhOmNKeigry_-US3R8vF1MhYg/formResponse",
                data: formData,
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function () {
                        /* 現在のページにサンキューメッセージ出すパターン */
                        // $(".p-end-message").slideDown();
                        // $(".p-form__btn").fadeOut();
                        /* 別ページに飛ばすバターン */
                        window.location.href = "page-contact-feedback.html";
                    },
                    200: function () {
                        $(".p-false-message").slideDown();
                    }
                }
            });
            event.preventDefault();
        });
    });


    /* ヘッダーの高さ分だけコンテンツを下げる */
    /* 参考：「じゅんぺい」https://junpei-sugiyama.com/page-link-position/ */
    /* 別途、こちらも参考 https://web.havincoffee.com/design/2020/09/2009281.html */
    /* ページ内リンクの時のみ有効 */
    // $(function () {
    //     const height = $("#js-header").height();
    //     $("main").css("margin-top", height);
    // });
    // // ページ内スクロール
    // $(function () {
    //     /* ヘッダーの高さ取得 */
    //     const headerHeight = $("#js-header").height();
    //     $('a[href^="#"]').click(function () {
    //         const speed = 600;
    //         let href = $(this).attr("href");
    //         let target = $(href == "#" || href == "" ? "html" : href);
    //         /* ヘッダーの高さ分下げる */
    //         let position = target.offset().top - headerHeight;
    //         $("body,html").animate({ scrollTop: position }, speed, "swing");
    //         return false;
    //     });
    // });


    /* ===================
    別ページリンクでも、リンク先位置の調整+スムーススクロール
    =================== */
    /* 「125naroom」さん記事より
    https://125naroom.com/web/3476 */
    $(function () {
        /*  // ヘッダーについているID、クラス名など、余白を開けたい場合は + 30を追記 */
        var headerHeight = $('#js-header').outerHeight() + 30;
        /* ハッシュ値があればページ内スクロール */
        var urlHash = location.hash;

        /* 外部リンク（異なるページ）からのクリック時 */
        if (urlHash) {
            /* スクロールを0に戻す */
            $('body,html').stop().scrollTop(0);
            /* ロード時の処理を待ち、時間差でスクロール実行 */
            setTimeout(function () {
                var target = $(urlHash);
                var position = target.offset().top - headerHeight;
                /* スクロール速度ミリ秒 */
                $('body,html').stop().animate({ scrollTop: position }, 500);
            }, 100);
        }

        /* 通常（同一ページ）のクリック時 */
        $('a[href^="#"]').click(function () {
            /* ページ内リンク先を取得 */
            var href = $(this).attr("href");
            var target = $(href);
            var position = target.offset().top - headerHeight;
            /* スクロール速度ミリ秒 */
            $('body,html').stop().animate({ scrollTop: position }, 500);
            /* #付与なし、付与したい場合は、true */
            return false;
        });
    });


    /* ===================
    トップに戻るボタン（デイトラ卒業課題）
    ===================*/
    let pageTop = $('#to-top4');
    /* 最初に画面が表示された時は、
      トップに戻るボタンを非表示に設定 */
    pageTop.hide();

    /* スクロールイベント */
    $(window).scroll(function () {
        /* スクロール位置が〇〇pxを超えた場合 */
        if ($(this).scrollTop() > 500) {
            /* トップに戻るボタンを表示する */
            pageTop.fadeIn();

            /* スクロール位置が上記未満の場合 */
        } else {
            /* トップに戻るボタンを非表示にする */
            pageTop.fadeOut();
        }
    });

    /* クリックイベント（クリックで実行） */
    pageTop.click(function () {
        /* 0.5秒かけてページトップへ移動 */
        $('body,html').animate({
            scrollTop: 0
        }, 500);

        /* イベントが親要素へ伝播しないための記述 */
        return false;
    });

});
