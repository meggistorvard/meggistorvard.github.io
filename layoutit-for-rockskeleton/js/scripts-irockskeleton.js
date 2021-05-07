function handleSaveLayout() {
  var e = $(".rock-demo").html();
  if (e != window.demoHtml) {
    saveLayout();
    window.demoHtml = e
  }
}
function handleJsIds() {
  handleModalIds();
  handleAccordionIds();
  handleCarouselIds();
  handleTabsIds()
}
function handleAccordionIds() {
  var e = $(".rock-demo #myAccordion");
  var t = randomNumber();
  var n = "rock-panel-" + t;
  var r;
  e.attr("id", n);
  e.find(".rock-panel").each(function (e, t) {
    r = "rock-panel-element-" + randomNumber();
    $(t).find(".rock-panel-title").each(function (e, t) {
      $(t).attr("data-parent", "#" + n);
      $(t).attr("href", "#" + r)
    });
    $(t).find(".rock-panel-collapse").each(function (e, t) {
      $(t).attr("id", r)
    })
  })
}
function handleCarouselIds() {
  var e = $(".rock-demo #myCarousel");
  var t = randomNumber();
  var n = "carousel-" + t;
  e.attr("id", n);
  e.find(".rock-carousel-indicators li").each(function (e, t) {
    $(t).attr("data-target", "#" + n)
  });
  e.find(".rock-left").attr("href", "#" + n);
  e.find(".rock-right").attr("href", "#" + n)
}
function handleModalIds() {
  var e = $(".rock-demo #myModalLink");
  var t = randomNumber();
  var n = "modal-container-" + t;
  var r = "modal-" + t;
  e.attr("id", r);
  e.attr("href", "#" + n);
  e.next().attr("id", n)
}
function handleTabsIds() {
  var e = $(".rock-demo #myTabs");
  var t = randomNumber();
  var n = "tabs-" + t;
  e.attr("id", n);
  e.find(".rock-tab-pane").each(function (e, t) {
    var n = $(t).attr("id");
    var r = "panel-" + randomNumber();
    $(t).attr("id", r);
    $(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r)
  })
}
function randomNumber() {
  return randomFromInterval(1, 1e6)
}
function randomFromInterval(e, t) {
  return Math.floor(Math.random() * (t - e + 1) + e)
}
function gridSystemGenerator() {
  $(".rock-lyrow .rock-preview input").bind("keyup", function () {
    var e = 0;
    var t = "";
    var n = false;
    var r = $(this).val().split(" ", 12);
    $.each(r, function (r, i) {
      if (!n) {
        if (parseInt(i) <= 0) n = true;
        e = e + parseInt(i);
        t += '<div class="rock-col-md-' + i + ' rock-column"></div>'
      }
    });
    if (e == 12 && !n) {
      $(this).parent().next().children().html(t);
      $(this).parent().prev().show()
    } else {
      $(this).parent().prev().hide()
    }
  })
}
function configurationElm(e, t) {
  $(".rock-demo").delegate(".rock-configuration > a", "click", function (e) {
    e.preventDefault();
    var t = $(this).parent().next().next().children();
    $(this).toggleClass("rock-active");
    t.toggleClass($(this).attr("rel"))
  });
  $(".rock-demo").delegate(".rock-configuration .rock-dropdown-menu a", "click", function (e) {
    e.preventDefault();
    var t = $(this).parent().parent();
    var n = t.parent().parent().next().next().children();
    t.find("li").removeClass("rock-active");
    $(this).parent().addClass("rock-active");
    var r = "";
    t.find("a").each(function () {
      r += $(this).attr("rel") + " "
    });
    t.parent().removeClass("rock-open");
    n.removeClass(r);
    n.addClass($(this).attr("rel"))
  })
}
function removeElm() {
  $(".rock-demo").delegate(".rock-remove", "click", function (e) {
    e.preventDefault();
    $(this).parent().remove();
    if (!$(".rock-demo .rock-lyrow").length > 0) {
      clearDemo()
    }
  })
}
function clearDemo() {
  $(".rock-demo").empty()
}
function removeMenuClasses() {
  $("#menu-layoutit li button").removeClass("rock-active")
}
function changeStructure(e, t) {
  $("#download-layout ." + e).removeClass(e).addClass(t)
}
function cleanHtml(e) {
  $(e).parent().append($(e).children().html())
}
function downloadLayoutSrc() {
  var e = "";
  $("#download-layout").children().html($(".rock-demo").html());
  var t = $("#download-layout").children();
  t.find(".rock-preview, .rock-configuration, .rock-drag, .rock-remove").remove();
  t.find(".rock-lyrow").addClass("rock-removeClean");
  t.find(".rock-box-element").addClass("rock-removeClean");
  t.find(".rock-lyrow .rock-lyrow .rock-lyrow .rock-lyrow .rock-lyrow .rock-removeClean").each(function () {
    cleanHtml(this)
  });
  t.find(".rock-lyrow .rock-lyrow .rock-lyrow .rock-lyrow .rock-removeClean").each(function () {
    cleanHtml(this)
  });
  t.find(".rock-lyrow .rock-lyrow .rock-lyrow .rock-removeClean").each(function () {
    cleanHtml(this)
  });
  t.find(".rock-lyrow .rock-lyrow .rock-removeClean").each(function () {
    cleanHtml(this)
  });
  t.find(".rock-lyrow .rock-removeClean").each(function () {
    cleanHtml(this)
  });
  t.find(".rock-removeClean").each(function () {
    cleanHtml(this)
  });
  t.find(".rock-removeClean").remove();
  $("#download-layout .rock-column").removeClass("ui-sortable");
  $("#download-layout .row-fluid").removeClass("rock-clearfix").children().removeClass("rock-column");
  if ($("#download-layout .rock-container").length > 0) {
    changeStructure("rock-row-fluid", "rock-row")
  }
  formatSrc = $.htmlClean($("#download-layout").html(), {
    format: true,
    allowedAttributes: [
      ["id"],
      ["class"],
      ["data-toggle"],
      ["data-target"],
      ["data-parent"],
      ["role"],
      ["data-dismiss"],
      ["aria-labelledby"],
      ["aria-hidden"],
      ["data-slide-to"],
      ["data-slide"]
    ]
  });
  $("#download-layout").html(formatSrc);
  $("#downloadModal textarea").empty();
  $("#downloadModal textarea").val(formatSrc)
}
var currentDocument = null;
var timerSave = 2e3;
var demoHtml = $(".rock-demo").html();
$(window).resize(function () {
  $("body").css("min-height", $(window).height() - 90);
  $(".rock-demo").css("min-height", $(window).height() - 160)
});
$(document).ready(function () {
  $("body").css("min-height", $(window).height() - 90);
  $(".rock-demo").css("min-height", $(window).height() - 160);
  $(".rock-demo, .rock-demo .rock-column").sortable({
    connectWith: ".rock-column",
    opacity: .35,
    handle: ".rock-drag"
  });
  $(".rock-sidebar-nav .rock-lyrow").draggable({
    connectToSortable: ".rock-demo",
    helper: "clone",
    handle: ".rock-drag",
    drag: function (e, t) {
      t.helper.width(400)
    },
    stop: function (e, t) {
      $(".rock-demo .rock-column").sortable({
        opacity: .35,
        connectWith: ".rock-column"
      })
    }
  });
  $(".rock-sidebar-nav .rock-box").draggable({
    connectToSortable: ".rock-column",
    helper: "clone",
    handle: ".rock-drag",
    drag: function (e, t) {
      t.helper.width(400)
    },
    stop: function () {
      handleJsIds()
    }
  });
  $("[data-target=#downloadModal]").click(function (e) {
    e.preventDefault();
    downloadLayoutSrc()
  });
  $("#download").click(function () {
    downloadLayout();
    return false
  });
  $("#downloadhtml").click(function () {
    downloadHtmlLayout();
    return false
  });
  $("#edit").click(function () {
    $("body").removeClass("rock-devpreview rock-sourcepreview");
    $("body").addClass("rock-edit");
    removeMenuClasses();
    $(this).addClass("rock-active");
    return false
  });
  $("#clear").click(function (e) {
    e.preventDefault();
    clearDemo()
  });
  $("#devpreview").click(function () {
    $("body").removeClass("rock-edit rock-sourcepreview");
    $("body").addClass("rock-devpreview");
    removeMenuClasses();
    $(this).addClass("rock-active");
    return false
  });
  $("#sourcepreview").click(function () {
    $("body").removeClass("rock-edit");
    $("body").addClass("rock-devpreview rock-sourcepreview");
    removeMenuClasses();
    $(this).addClass("rock-active");
    return false
  });
  $(".rock-nav-header").click(function () {
    $(".rock-sidebar-nav .rock-boxes, .rock-sidebar-nav .rock-rows").hide();
    $(this).next().slideDown()
  });
  removeElm();
  configurationElm();
  gridSystemGenerator();
  setInterval(function () {
    handleSaveLayout()
  }, timerSave)
})