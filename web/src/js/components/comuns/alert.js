'use strict'

function createGrowl(options, message) {
    let growl = $("<div>");

    growl.attr("class", "bootstrap-growl alert");
    
    if (options.type) {
        growl.addClass("alert-" + options.type);
    }

    if (options.allow_dismiss) {
        growl.addClass("alert-dismissible");
        growl.append("<button  class=\"close\" data-dismiss=\"alert\" type=\"button\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>");
    }
    
    growl.append(message);
    
    if (options.top_offset) {
        options.offset = {
            from: "top",
            amount: options.top_offset
        };
    }

    return growl;
}

function makeAlign(alert, options) {
    switch (options.align) {
        case "center":
            alert.css({
                "left": "50%",
                "margin-left": "-" + (alert.outerWidth() / 2) + "px"
            });
            break;

        case "left":
            alert.css("left", "20px");
            break;

        default:
            alert.css("right", "20px");
    }
}

function createOptionsDefault() {
    return {
        ele: "body",
        type: "info",
        offset: {
            from: "top",
            amount: 20
        },
        align: "right",
        width: 250,
        delay: 4000,
        allow_dismiss: true,
        stackup_spacing: 10
    };
}

function createStyleClass(options) {
    return {
        "position": (options.ele === "body" ? "fixed" : "absolute"),
        "margin": 0,
        "z-index": "9999",
        "display": "none"
    };
}

function calcNextPosition(options) {
    let offsetAmount = options.offset.amount;

    $(".bootstrap-growl").each(function() {
        offsetAmount = Math.max(offsetAmount, parseInt($(this).css(options.offset.from)) + $(this).outerHeight() + options.stackup_spacing);
        return offsetAmount;
    });

    return offsetAmount;
}

let GrowlNotify = {

    notify: function(message, opt) {
        let options = $.extend({}, createOptionsDefault(), opt);

        let growl = createGrowl(options, message);
        
        let offsetAmount = calcNextPosition(options);

        let css = createStyleClass(options);

        css[options.offset.from] = offsetAmount + "px";

        growl.css(css);

        if (options.width !== "auto") {
            growl.css("width", options.width + "px");
        }

        $(options.ele).append(growl);

        makeAlign(growl, options);

        growl.fadeIn();

        if (options.delay > 0) {
            growl.delay(options.delay).fadeOut(function() {
                return $(this).alert("close");
            });
        }

        return growl;
    },

    notifyOnErrors: function(messages) {
        if (!messages) {            
            return;
        }

        messages.map((value, index) => {
            this.notify(value.text, { type: 'danger' });
        });
    }

}

export default GrowlNotify;