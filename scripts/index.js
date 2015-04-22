$(window, document, undefined).ready(function () {

    // input box fancyness

    $('input').blur(function () {
        var $this = $(this);
        if ($this.val())
            $this.addClass('used');
        else
            $this.removeClass('used');
    });

    // button ripples

    var $ripples = $('.ripples');
    $ripples.on('click.Ripples', function (e) {
        var $this = $(this);
        var $offset = $this.parent().offset();
        var $circle = $this.find('.ripplesCircle');
        var x = e.pageX - $offset.left;
        var y = e.pageY - $offset.top;
        $circle.css({
            top: y + 'px',
            left: x + 'px'
        });
        $this.addClass('is-active');
    });
    $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function (e) {
        $(this).removeClass('is-active');
    });

    // process login

    $('button').on('click', function(e){

        // declare local vars

        var username = $("#uname").val();
        var password = $("#pword").val();
        var $msg = $("#msg");

        console.log('username:'+username);
        console.log('password:'+password);

        // make the api call

        $.ajax({
            type: "POST",
            url: "login.php",
            //url: "http://xxx.xxxxxx.xxx/v1/login",
            dataType : "json",
            data: {
                username: username,
                password: password
            },
            //xhrFields: {
            //    withCredentials: true
            //},
            beforeSend:function() {
                showProgress();
            }
        })
        .done(function(response) {
            showSuccess();
        })
        .fail(function( xhr ) {
            var reason = 'You shall not pass! Wrong username or password.';
            if (xhr.status === 404) {
                reason = "I cannot connect to the server.";
            }
            showError(xhr,reason);
        });

        // helper functions

        function showProgress() {
            console.log("loading");
            $msg.removeClass();
            $msg.css('display','block');
            $msg.html("<p>Loading...</p><img src='images/loading.gif' class='loading'/>")
        }
        function showError(xhr,errMsg) {
            console.log("error");
            console.dir( xhr );
            $msg.removeClass();
            $msg.addClass('error');
            $msg.html(errMsg);
        }
        function showSuccess() {
            console.log("success");
            $msg.removeClass();
            $msg.addClass('success');
            $msg.html("You are good to go... Go go go! Get things done.");
        }

        return false;

    });

});
