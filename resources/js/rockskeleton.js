/**
 * Copyright 2020 Meggis
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * Rockskeleton 1.3.7
 */
if ("undefined" == typeof jQuery) throw new Error("The jQuery file reference must come before the Rockskeleton 1.3.7 reference");
! function() {
  "use strict";
  var t = jQuery.fn.jquery.split(" ")[0].split(".");
  if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1 || 3 < t[0]) throw new Error("According to description, Rockskeleton requires jQuery version >1.9.1 and <4.0")
}(),
function(i) {
  "use strict";
  i.fn.emulateTransitionEnd = function(t) {
    var e = !1,
      o = this;
    i(this).one("bsTransitionEnd", function() {
      e = !0
    });
    return setTimeout(function() {
      e || i(o).trigger(i.support.transition.end)
    }, t), this
  }, i(function() {
    i.support.transition = function() {
      var t, e = document.createElement("rockskeleton"),
        o = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend"
        };
      for (t in o)
        if (void 0 !== e.style[t]) return {
          end: o[t]
        };
      return !1
    }(), i.support.transition && (i.event.special.bsTransitionEnd = {
      bindType: i.support.transition.end,
      delegateType: i.support.transition.end,
      handle: function(t) {
        if (i(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
      }
    })
  })
}(jQuery),
function(r) {
  "use strict";

  function s(t) {
    r(t).on("click", e, this.close)
  }
  var e = '[data-dismiss="alert"]';
  s.VERSION = "1.3.7", s.TRANSITION_DURATION = 150, s.prototype.close = function(t) {
    var e = r(this),
      o = (o = e.attr("data-target")) || (o = e.attr("href")) && o.replace(/.*(?=#[^\s]*$)/, ""),
      i = r("#" === o ? [] : o);

    function n() {
      i.detach().trigger("closed.rk.alert").remove()
    }
    t && t.preventDefault(), i.length || (i = e.closest(".rock-alert")), i.trigger(t = r.Event("close.rk.alert")), t.isDefaultPrevented() || (i.removeClass("rock-in"), r.support.transition && i.hasClass("rock-fade") ? i.one("bsTransitionEnd", n).emulateTransitionEnd(s.TRANSITION_DURATION) : n())
  };
  var t = r.fn.alert;
  r.fn.alert = function(o) {
    return this.each(function() {
      var t = r(this),
        e = t.data("rk.alert");
      e || t.data("rk.alert", e = new s(this)), "string" == typeof o && e[o].call(t)
    })
  }, r.fn.alert.Constructor = s, r.fn.alert.noConflict = function() {
    return r.fn.alert = t, this
  }, r(document).on("click.rk.alert.data-api", e, s.prototype.close)
}(jQuery),
function(r) {
  "use strict";
  var n = function(t, e) {
    this.$element = r(t), this.options = r.extend({}, n.DEFAULTS, e), this.isLoading = !1
  };

  function o(i) {
    return this.each(function() {
      var t = r(this),
        e = t.data("rk.button"),
        o = "object" == typeof i && i;
      e || t.data("rk.button", e = new n(this, o)), "toggle" == i ? e.toggle() : i && e.setState(i)
    })
  }
  n.VERSION = "1.3.7", n.DEFAULTS = {
    loadingText: "loading..."
  }, n.prototype.setState = function(t) {
    var e = "disabled",
      o = this.$element,
      i = o.is("input") ? "val" : "html",
      n = o.data();
    t += "Text", null == n.resetText && o.data("resetText", o[i]()), setTimeout(r.proxy(function() {
      o[i]((null == n[t] ? this.options : n)[t]), "loadingText" == t ? (this.isLoading = !0, o.addClass(e).attr(e, e).prop(e, !0)) : this.isLoading && (this.isLoading = !1, o.removeClass(e).removeAttr(e).prop(e, !1))
    }, this), 0)
  }, n.prototype.toggle = function() {
    var t, e = !0,
      o = this.$element.closest('[data-toggle="buttons"]');
    o.length ? ("radio" == (t = this.$element.find("input")).prop("type") ? (t.prop("checked") && (e = !1), o.find(".rock-active").removeClass("rock-active"), this.$element.addClass("rock-active")) : "checkbox" == t.prop("type") && (t.prop("checked") !== this.$element.hasClass("rock-active") && (e = !1), this.$element.toggleClass("rock-active")), t.prop("checked", this.$element.hasClass("rock-active")), e && t.trigger("change")) : (this.$element.attr("aria-pressed", !this.$element.hasClass("rock-active")), this.$element.toggleClass("rock-active"))
  };
  var t = r.fn.button;
  r.fn.button = o, r.fn.button.Constructor = n, r.fn.button.noConflict = function() {
    return r.fn.button = t, this
  }, r(document).on("click.rk.button.data-api", '[data-toggle^="button"]', function(t) {
    var e = r(t.target).closest(".rock-button");
    o.call(e, "toggle"), r(t.target).is('input[type="radio"], input[type="checkbox"]') || (t.preventDefault(), (e.is("input,button") ? e : e.find("input:visible,button:visible").first()).trigger("focus"))
  }).on("focus.rk.button.data-api blur.rk.button.data-api", '[data-toggle^="button"]', function(t) {
    r(t.target).closest(".rock-button").toggleClass("rock-focus", /^rock-focus(rock-in)?$/.test(t.type))
  })
}(jQuery),
function(c) {
  function h(t, e) {
    this.$element = c(t), this.$indicators = this.$element.find(".rock-carousel-indicators"), this.options = e, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.rk.carousel", c.proxy(this.keydown, this)), "hover" != this.options.pause || "ontouchstart" in document.documentElement || this.$element.on("mouseenter.rk.carousel", c.proxy(this.pause, this)).on("mouseleave.rk.carousel", c.proxy(this.cycle, this))
  }

  function n(n) {
    return this.each(function() {
      var t = c(this),
        e = t.data("rk.carousel"),
        o = c.extend({}, h.DEFAULTS, t.data(), "object" == typeof n && n),
        i = "string" == typeof n ? n : o.slide;
      e || t.data("rk.carousel", e = new h(this, o)), "number" == typeof n ? e.to(n) : i ? e[i]() : o.interval && e.pause().cycle()
    })
  }
  h.VERSION = "1.3.7", h.TRANSITION_DURATION = 600, h.DEFAULTS = {
    interval: 5e3,
    pause: "hover",
    wrap: !0,
    keyboard: !0
  }, h.prototype.keydown = function(t) {
    if (!/input|textarea/i.test(t.target.tagName)) {
      switch (t.which) {
        case 37:
          this.prev();
          break;
        case 39:
          this.next();
          break;
        default:
          return
      }
      t.preventDefault()
    }
  }, h.prototype.cycle = function(t) {
    return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(c.proxy(this.next, this), this.options.interval)), this
  }, h.prototype.getItemIndex = function(t) {
    return this.$items = t.parent().children(".rock-item"), this.$items.index(t || this.$active)
  }, h.prototype.getItemForDirection = function(t, e) {
    var o = this.getItemIndex(e);
    if (("prev" == t && 0 === o || "next" == t && o == this.$items.length - 1) && !this.options.wrap) return e;
    t = (o + ("prev" == t ? -1 : 1)) % this.$items.length;
    return this.$items.eq(t)
  }, h.prototype.to = function(t) {
    var e = this,
      o = this.getItemIndex(this.$active = this.$element.find(".rock-item.rock-active"));
    if (!(t > this.$items.length - 1 || t < 0)) return this.sliding ? this.$element.one("slid.rk.carousel", function() {
      e.to(t)
    }) : o == t ? this.pause().cycle() : this.slide(o < t ? "next" : "prev", this.$items.eq(t))
  }, h.prototype.pause = function(t) {
    return t || (this.paused = !0), this.$element.find(".rock-next, .rock-prev").length && c.support.transition && (this.$element.trigger(c.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
  }, h.prototype.next = function() {
    if (!this.sliding) return this.slide("next")
  }, h.prototype.prev = function() {
    if (!this.sliding) return this.slide("prev")
  }, h.prototype.slide = function(t, e) {
    var o = this.$element.find(".rock-item.rock-active"),
      i = e || this.getItemForDirection(t, o),
      n = this.interval,
      r = "next" == t ? "left" : "right",
      s = this;
    if (i.hasClass("rock-active")) return this.sliding = !1;
    var a = i[0],
      e = c.Event("slide.rk.carousel", {
        relatedTarget: a,
        direction: r
      });
    if (this.$element.trigger(e), !e.isDefaultPrevented()) {
      this.sliding = !0, n && this.pause(), this.$indicators.length && (this.$indicators.find(".rock-active").removeClass("rock-active"), (e = c(this.$indicators.children()[this.getItemIndex(i)])) && e.addClass("rock-active"));
      var l = c.Event("slid.rk.carousel", {
        relatedTarget: a,
        direction: r
      });
      return c.support.transition && this.$element.hasClass("rock-slide") ? (i.addClass(t), i[0].offsetWidth, o.addClass(r), i.addClass(r), o.one("bsTransitionEnd", function() {
        i.removeClass([t, r].join(" ")).addClass("rock-active"), o.removeClass(["rock-active", r].join(" ")), s.sliding = !1, setTimeout(function() {
          s.$element.trigger(l)
        }, 0)
      }).emulateTransitionEnd(h.TRANSITION_DURATION)) : (o.removeClass("rock-active"), i.addClass("rock-active"), this.sliding = !1, this.$element.trigger(l)), n && this.cycle(), this
    }
  };
  var t = c.fn.carousel;

  function e(t) {
    var e, o = c(this),
      i = c(o.attr("data-target") || (e = o.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""));
    i.hasClass("rock-carousel") && (e = c.extend({}, i.data(), o.data()), (o = o.attr("data-slide-to")) && (e.interval = !1), n.call(i, e), o && i.data("rk.carousel").to(o), t.preventDefault())
  }
  c.fn.carousel = n, c.fn.carousel.Constructor = h, c.fn.carousel.noConflict = function() {
    return c.fn.carousel = t, this
  }, c(document).on("click.rk.carousel.data-api", "[data-slide]", e).on("click.rk.carousel.data-api", "[data-slide-to]", e), c(window).on("load", function() {
    c('[data-ride="carousel"]').each(function() {
      var t = c(this);
      n.call(t, t.data())
    })
  })
}(jQuery),
function(n) {
  "use strict";
  var r = function(t, e) {
    this.$element = n(t), this.options = n.extend({}, r.DEFAULTS, e), this.$trigger = n('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
  };

  function o(t) {
    var e = t.attr("data-target") || (e = t.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "");
    return n(e)
  }

  function s(i) {
    return this.each(function() {
      var t = n(this),
        e = t.data("rk.collapse"),
        o = n.extend({}, r.DEFAULTS, t.data(), "object" == typeof i && i);
      !e && o.toggle && /show|hide/.test(i) && (o.toggle = !1), e || t.data("rk.collapse", e = new r(this, o)), "string" == typeof i && e[i]()
    })
  }
  r.VERSION = "1.3.7", r.TRANSITION_DURATION = 350, r.DEFAULTS = {
    toggle: !0
  }, r.prototype.dimension = function() {
    return this.$element.hasClass("width") ? "width" : "height"
  }, r.prototype.show = function() {
    if (!this.transitioning && !this.$element.hasClass("rock-in")) {
      var t = this.$parent && this.$parent.children(".rock-panel").children(".rock-in, .rock-collapsing");
      if (!(t && t.length && (i = t.data("rk.collapse")) && i.transitioning)) {
        var e = n.Event("show.rk.collapse");
        if (this.$element.trigger(e), !e.isDefaultPrevented()) {
          t && t.length && (s.call(t, "hide"), i || t.data("rk.collapse", null));
          var o = this.dimension();
          this.$element.removeClass("rock-collapse").addClass("rock-collapsing")[o](0).attr("aria-expanded", !0), this.$trigger.removeClass("rock-collapsed").attr("aria-expanded", !0), this.transitioning = 1;
          var i = function() {
            this.$element.removeClass("rock-collapsing").addClass("rock-collapse rock-in")[o](""), this.transitioning = 0, this.$element.trigger("shown.rk.collapse")
          };
          if (!n.support.transition) return i.call(this);
          t = n.camelCase(["scroll", o].join("-"));
          this.$element.one("bsTransitionEnd", n.proxy(i, this)).emulateTransitionEnd(r.TRANSITION_DURATION)[o](this.$element[0][t])
        }
      }
    }
  }, r.prototype.hide = function() {
    if (!this.transitioning && this.$element.hasClass("rock-in")) {
      var t = n.Event("hide.rk.collapse");
      if (this.$element.trigger(t), !t.isDefaultPrevented()) {
        var e = this.dimension();
        this.$element[e](this.$element[e]())[0].offsetHeight, this.$element.addClass("rock-collapsing").removeClass("rock-collapse rock-in").attr("aria-expanded", !1), this.$trigger.addClass("rock-collapsed").attr("aria-expanded", !1), this.transitioning = 1;
        t = function() {
          this.transitioning = 0, this.$element.removeClass("rock-collapsing").addClass("rock-collapse").trigger("hidden.rk.collapse")
        };
        if (!n.support.transition) return t.call(this);
        this.$element[e](0).one("bsTransitionEnd", n.proxy(t, this)).emulateTransitionEnd(r.TRANSITION_DURATION)
      }
    }
  }, r.prototype.toggle = function() {
    this[this.$element.hasClass("rock-in") ? "hide" : "show"]()
  }, r.prototype.getParent = function() {
    return n(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(n.proxy(function(t, e) {
      e = n(e);
      this.addAriaAndCollapsedClass(o(e), e)
    }, this)).end()
  }, r.prototype.addAriaAndCollapsedClass = function(t, e) {
    var o = t.hasClass("rock-in");
    t.attr("aria-expanded", o), e.toggleClass("rock-collapsed", !o).attr("aria-expanded", o)
  };
  var t = n.fn.collapse;
  n.fn.collapse = s, n.fn.collapse.Constructor = r, n.fn.collapse.noConflict = function() {
    return n.fn.collapse = t, this
  }, n(document).on("click.rk.collapse.data-api", '[data-toggle="collapse"]', function(t) {
    var e = n(this);
    e.attr("data-target") || t.preventDefault();
    t = o(e), e = t.data("rk.collapse") ? "toggle" : e.data();
    s.call(t, e)
  })
}(jQuery),
function(n) {
  "use strict";

  function i(t) {
    n(t).on("click.rk.dropdown", this.toggle)
  }
  var r = '[data-toggle="dropdown"]';

  function s(t) {
    var e = t.attr("data-target"),
      e = (e = e || (e = t.attr("href")) && /#[A-Za-z]/.test(e) && e.replace(/.*(?=#[^\s]*$)/, "")) && n(e);
    return e && e.length ? e : t.parent()
  }

  function a(i) {
    i && 3 === i.which || (n(".rock-dropdown-backdrop").remove(), n(r).each(function() {
      var t = n(this),
        e = s(t),
        o = {
          relatedTarget: this
        };
      e.hasClass("rock-open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && n.contains(e[0], i.target) || (e.trigger(i = n.Event("hide.rk.dropdown", o)), i.isDefaultPrevented() || (t.attr("aria-expanded", "false"), e.removeClass("rock-open").trigger(n.Event("hidden.rk.dropdown", o)))))
    }))
  }
  i.VERSION = "1.3.7", i.prototype.toggle = function(t) {
    var e = n(this);
    if (!e.is(".disabled, :disabled")) {
      var o = s(e),
        i = o.hasClass("rock-open");
      if (a(), !i) {
        "ontouchstart" in document.documentElement && !o.closest(".rock-navbar-nav").length && n(document.createElement("div")).addClass("rock-dropdown-backdrop").insertAfter(n(this)).on("click", a);
        i = {
          relatedTarget: this
        };
        if (o.trigger(t = n.Event("show.rk.dropdown", i)), t.isDefaultPrevented()) return;
        e.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("rock-open").trigger(n.Event("shown.rk.dropdown", i))
      }
      return !1
    }
  }, i.prototype.keydown = function(t) {
    if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName)) {
      var e = n(this);
      if (t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled")) {
        var o = s(e),
          i = o.hasClass("rock-open");
        if (!i && 27 != t.which || i && 27 == t.which) return 27 == t.which && o.find(r).trigger("focus"), e.trigger("click");
        e = o.find(".rock-dropdown-menu li:not(.disabled):visible a");
        e.length && (o = e.index(t.target), 38 == t.which && 0 < o && o--, 40 == t.which && o < e.length - 1 && o++, ~o || (o = 0), e.eq(o).trigger("focus"))
      }
    }
  };
  var t = n.fn.dropdown;
  n.fn.dropdown = function(o) {
    return this.each(function() {
      var t = n(this),
        e = t.data("rk.dropdown");
      e || t.data("rk.dropdown", e = new i(this)), "string" == typeof o && e[o].call(t)
    })
  }, n.fn.dropdown.Constructor = i, n.fn.dropdown.noConflict = function() {
    return n.fn.dropdown = t, this
  }, n(document).on("click.rk.dropdown.data-api", a).on("click.rk.dropdown.data-api", ".rock-dropdown rock-form", function(t) {
    t.stopPropagation()
  }).on("click.rk.dropdown.data-api", r, i.prototype.toggle).on("keydown.rk.dropdown.data-api", r, i.prototype.keydown).on("keydown.rk.dropdown.data-api", ".rock-dropdown-menu", i.prototype.keydown)
}(jQuery),
function(r) {
  "use strict";

  function s(t, e) {
    this.options = e, this.$body = r(document.body), this.$element = r(t), this.$dialog = this.$element.find(".rock-modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".rock-modal-content").load(this.options.remote, r.proxy(function() {
      this.$element.trigger("loaded.rk.modal")
    }, this))
  }

  function n(i, n) {
    return this.each(function() {
      var t = r(this),
        e = t.data("rk.modal"),
        o = r.extend({}, s.DEFAULTS, t.data(), "object" == typeof i && i);
      e || t.data("rk.modal", e = new s(this, o)), "string" == typeof i ? e[i](n) : o.show && e.show(n)
    })
  }
  s.VERSION = "1.3.7", s.TRANSITION_DURATION = 300, s.BACKDROP_TRANSITION_DURATION = 150, s.DEFAULTS = {
    backdrop: !0,
    keyboard: !0,
    show: !0
  }, s.prototype.toggle = function(t) {
    return this.isShown ? this.hide() : this.show(t)
  }, s.prototype.show = function(o) {
    var i = this,
      t = r.Event("show.rk.modal", {
        relatedTarget: o
      });
    this.$element.trigger(t), this.isShown || t.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("rock-modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.rk.modal", '[data-dismiss="modal"]', r.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.rk.modal", function() {
      i.$element.one("mouseup.dismiss.rk.modal", function(t) {
        r(t.target).is(i.$element) && (i.ignoreBackdropClick = !0)
      })
    }), this.backdrop(function() {
      var t = r.support.transition && i.$element.hasClass("rock-fade");
      i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), i.adjustDialog(), t && i.$element[0].offsetWidth, i.$element.addClass("rock-in"), i.enforceFocus();
      var e = r.Event("shown.rk.modal", {
        relatedTarget: o
      });
      t ? i.$dialog.one("bsTransitionEnd", function() {
        i.$element.trigger("focus").trigger(e)
      }).emulateTransitionEnd(s.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(e)
    }))
  }, s.prototype.hide = function(t) {
    t && t.preventDefault(), t = r.Event("hide.rk.modal"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), r(document).off("focusin.rk.modal"), this.$element.removeClass("rock-in").off("click.dismiss.rk.modal").off("mouseup.dismiss.rk.modal"), this.$dialog.off("mousedown.dismiss.rk.modal"), r.support.transition && this.$element.hasClass("rock-fade") ? this.$element.one("bsTransitionEnd", r.proxy(this.hideModal, this)).emulateTransitionEnd(s.TRANSITION_DURATION) : this.hideModal())
  }, s.prototype.enforceFocus = function() {
    r(document).off("focusin.rk.modal").on("focusin.rk.modal", r.proxy(function(t) {
      document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
    }, this))
  }, s.prototype.escape = function() {
    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.rk.modal", r.proxy(function(t) {
      27 == t.which && this.hide()
    }, this)) : this.isShown || this.$element.off("keydown.dismiss.rk.modal")
  }, s.prototype.resize = function() {
    this.isShown ? r(window).on("resize.rk.modal", r.proxy(this.handleUpdate, this)) : r(window).off("resize.rk.modal")
  }, s.prototype.hideModal = function() {
    var t = this;
    this.$element.hide(), this.backdrop(function() {
      t.$body.removeClass("rock-modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.rk.rock-modal")
    })
  }, s.prototype.removeBackdrop = function() {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
  }, s.prototype.backdrop = function(t) {
    var e, o = this,
      i = this.$element.hasClass("rock-fade") ? "rock-fade" : "";
    this.isShown && this.options.backdrop ? (e = r.support.transition && i, this.$backdrop = r(document.createElement("div")).addClass("rock-modal-backdrop " + i).appendTo(this.$body), this.$element.on("click.dismiss.rk.modal", r.proxy(function(t) {
      this.ignoreBackdropClick ? this.ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide())
    }, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("rock-in"), t && (e ? this.$backdrop.one("bsTransitionEnd", t).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION) : t())) : !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("rock-in"), e = function() {
      o.removeBackdrop(), t && t()
    }, r.support.transition && this.$element.hasClass("rock-fade") ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION) : e()) : t && t()
  }, s.prototype.handleUpdate = function() {
    this.adjustDialog()
  }, s.prototype.adjustDialog = function() {
    var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
      paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
    })
  }, s.prototype.resetAdjustments = function() {
    this.$element.css({
      paddingLeft: "",
      paddingRight: ""
    })
  }, s.prototype.checkScrollbar = function() {
    var t, e = window.innerWidth;
    e || (e = (t = document.documentElement.getBoundingClientRect()).right - Math.abs(t.left)), this.bodyIsOverflowing = document.body.clientWidth < e, this.scrollbarWidth = this.measureScrollbar()
  }, s.prototype.setScrollbar = function() {
    var t = parseInt(this.$body.css("padding-right") || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
  }, s.prototype.resetScrollbar = function() {
    this.$body.css("padding-right", this.originalBodyPad)
  }, s.prototype.measureScrollbar = function() {
    var t = document.createElement("div");
    t.className = "rock-modal-scrollbar-measure", this.$body.append(t);
    var e = t.offsetWidth - t.clientWidth;
    return this.$body[0].removeChild(t), e
  };
  var t = r.fn.modal;
  r.fn.modal = n, r.fn.modal.Constructor = s, r.fn.modal.noConflict = function() {
    return r.fn.modal = t, this
  }, r(document).on("click.rk.modal.data-api", '[data-toggle="modal"]', function(t) {
    var e = r(this),
      o = e.attr("href"),
      i = r(e.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")),
      o = i.data("rk.modal") ? "toggle" : r.extend({
        remote: !/#/.test(o) && o
      }, i.data(), e.data());
    e.is("a") && t.preventDefault(), i.one("show.rk.modal", function(t) {
      t.isDefaultPrevented() || i.one("hidden.rk.modal", function() {
        e.is(":visible") && e.trigger("focus")
      })
    }), n.call(i, o, this)
  })
}(jQuery),
function(l) {
  "use strict";

  function c(t, e) {
    this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
  }
  c.VERSION = "1.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="rock-tooltip" role="tooltip"><div class="rock-tooltip-arrow"></div><div class="rock-tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1,
    viewport: {
      selector: "body",
      padding: 0
    }
  }, c.prototype.init = function(t, e, o) {
    if (this.enabled = !0, this.type = t, this.$element = l(e), this.options = this.getOptions(o), this.$viewport = this.options.viewport && l(l.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
        click: !1,
        hover: !1,
        focus: !1
      }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
    for (var i = this.options.trigger.split(" "), n = i.length; n--;) {
      var r, s = i[n];
      "click" == s ? this.$element.on("click." + this.type, this.options.selector, l.proxy(this.toggle, this)) : "manual" != s && (r = "hover" == s ? "mouseenter" : "focusin", s = "hover" == s ? "mouseleave" : "focusout", this.$element.on(r + "." + this.type, this.options.selector, l.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, l.proxy(this.leave, this)))
    }
    this.options.selector ? this._options = l.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle()
  }, c.prototype.getDefaults = function() {
    return c.DEFAULTS
  }, c.prototype.getOptions = function(t) {
    return (t = l.extend({}, this.getDefaults(), this.$element.data(), t)).delay && "number" == typeof t.delay && (t.delay = {
      show: t.delay,
      hide: t.delay
    }), t
  }, c.prototype.getDelegateOptions = function() {
    var o = {},
      i = this.getDefaults();
    return this._options && l.each(this._options, function(t, e) {
      i[t] != e && (o[t] = e)
    }), o
  }, c.prototype.enter = function(t) {
    var e = t instanceof this.constructor ? t : l(t.currentTarget).data("rk." + this.type);
    if (e || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), l(t.currentTarget).data("rk." + this.type, e)), t instanceof l.Event && (e.inState["focusin" == t.type ? "focus" : "hover"] = !0), e.tip().hasClass("rock-in") || "rock-in" == e.hoverState) e.hoverState = "in";
    else {
      if (clearTimeout(e.timeout), e.hoverState = "in", !e.options.delay || !e.options.delay.show) return e.show();
      e.timeout = setTimeout(function() {
        "in" == e.hoverState && e.show()
      }, e.options.delay.show)
    }
  }, c.prototype.isInStateTrue = function() {
    for (var t in this.inState)
      if (this.inState[t]) return !0;
    return !1
  }, c.prototype.leave = function(t) {
    var e = t instanceof this.constructor ? t : l(t.currentTarget).data("rk." + this.type);
    if (e || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), l(t.currentTarget).data("rk." + this.type, e)), t instanceof l.Event && (e.inState["focusout" == t.type ? "focus" : "hover"] = !1), !e.isInStateTrue()) {
      if (clearTimeout(e.timeout), e.hoverState = "out", !e.options.delay || !e.options.delay.hide) return e.hide();
      e.timeout = setTimeout(function() {
        "out" == e.hoverState && e.hide()
      }, e.options.delay.hide)
    }
  }, c.prototype.show = function() {
    var e, t, o, i, n, r, s, a = l.Event("show.rk." + this.type);
    this.hasContent() && this.enabled && (this.$element.trigger(a), o = l.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]), !a.isDefaultPrevented() && o && (t = (e = this).tip(), r = this.getUID(this.type), this.setContent(), t.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && t.addClass("rock-fade"), s = "function" == typeof this.options.placement ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, (n = (i = /\s?auto?\s?/i).test(s)) && (s = s.replace(i, "") || "top"), t.detach().css({
      top: 0,
      left: 0,
      display: "block"
    }).addClass(s).data("rk." + this.type, this), this.options.container ? t.appendTo(this.options.container) : t.insertAfter(this.$element), this.$element.trigger("inserted.rk." + this.type), a = this.getPosition(), o = t[0].offsetWidth, r = t[0].offsetHeight, n && (i = s, n = this.getPosition(this.$viewport), s = "bottom" == s && a.bottom + r > n.bottom ? "top" : "top" == s && a.top - r < n.top ? "bottom" : "right" == s && a.right + o > n.width ? "left" : "left" == s && a.left - o < n.left ? "right" : s, t.removeClass(i).addClass(s)), r = this.getCalculatedOffset(s, a, o, r), this.applyPlacement(r, s), s = function() {
      var t = e.hoverState;
      e.$element.trigger("shown.rk." + e.type), e.hoverState = null, "out" == t && e.leave(e)
    }, l.support.transition && this.$tip.hasClass("rock-fade") ? t.one("bsTransitionEnd", s).emulateTransitionEnd(c.TRANSITION_DURATION) : s()))
  }, c.prototype.applyPlacement = function(t, e) {
    var o = this.tip(),
      i = o[0].offsetWidth,
      n = o[0].offsetHeight,
      r = parseInt(o.css("margin-top"), 10),
      s = parseInt(o.css("margin-left"), 10);
    isNaN(r) && (r = 0), isNaN(s) && (s = 0), t.top += r, t.left += s, l.offset.setOffset(o[0], l.extend({
      using: function(t) {
        o.css({
          top: Math.round(t.top),
          left: Math.round(t.left)
        })
      }
    }, t), 0), o.addClass("rock-in");
    var a = o[0].offsetWidth,
      r = o[0].offsetHeight;
    "top" == e && r != n && (t.top = t.top + n - r);
    s = this.getViewportAdjustedDelta(e, t, a, r);
    s.left ? t.left += s.left : t.top += s.top;
    e = /top|bottom/.test(e), n = e ? 2 * s.left - i + a : 2 * s.top - n + r, r = e ? "offsetWidth" : "offsetHeight";
    o.offset(t), this.replaceArrow(n, o[0][r], e)
  }, c.prototype.replaceArrow = function(t, e, o) {
    this.arrow().css(o ? "left" : "top", 50 * (1 - t / e) + "%").css(o ? "top" : "left", "")
  }, c.prototype.setContent = function() {
    var t = this.tip(),
      e = this.getTitle();
    t.find(".rock-tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("rock-fade rock-in rock-top rock-bottom rock-left rock-right")
  }, c.prototype.hide = function(t) {
    var e = this,
      o = l(this.$tip),
      i = l.Event("hide.rk." + this.type);

    function n() {
      "in" != e.hoverState && o.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.rk." + e.type), t && t()
    }
    if (this.$element.trigger(i), !i.isDefaultPrevented()) return o.removeClass("rock-in"), l.support.transition && o.hasClass("rock-fade") ? o.one("bsTransitionEnd", n).emulateTransitionEnd(c.TRANSITION_DURATION) : n(), this.hoverState = null, this
  }, c.prototype.fixTitle = function() {
    var t = this.$element;
    !t.attr("title") && "string" == typeof t.attr("data-original-title") || t.attr("data-original-title", t.attr("title") || "").attr("title", "")
  }, c.prototype.hasContent = function() {
    return this.getTitle()
  }, c.prototype.getPosition = function(t) {
    var e = (t = t || this.$element)[0],
      o = "BODY" == e.tagName,
      i = e.getBoundingClientRect();
    null == i.width && (i = l.extend({}, i, {
      width: i.right - i.left,
      height: i.bottom - i.top
    }));
    e = window.SVGElement && e instanceof window.SVGElement, e = o ? {
      top: 0,
      left: 0
    } : e ? null : t.offset(), t = {
      scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
    }, o = o ? {
      width: l(window).width(),
      height: l(window).height()
    } : null;
    return l.extend({}, i, t, o, e)
  }, c.prototype.getCalculatedOffset = function(t, e, o, i) {
    return "bottom" == t ? {
      top: e.top + e.height,
      left: e.left + e.width / 2 - o / 2
    } : "top" == t ? {
      top: e.top - i,
      left: e.left + e.width / 2 - o / 2
    } : "left" == t ? {
      top: e.top + e.height / 2 - i / 2,
      left: e.left - o
    } : {
      top: e.top + e.height / 2 - i / 2,
      left: e.left + e.width
    }
  }, c.prototype.getViewportAdjustedDelta = function(t, e, o, i) {
    var n = {
      top: 0,
      left: 0
    };
    if (!this.$viewport) return n;
    var r, s = this.options.viewport && this.options.viewport.padding || 0,
      a = this.getPosition(this.$viewport);
    return /right|left/.test(t) ? (t = e.top - s - a.scroll, r = e.top + s - a.scroll + i, t < a.top ? n.top = a.top - t : r > a.top + a.height && (n.top = a.top + a.height - r)) : (r = e.left - s, o = e.left + s + o, r < a.left ? n.left = a.left - r : o > a.right && (n.left = a.left + a.width - o)), n
  }, c.prototype.getTitle = function() {
    var t = this.$element,
      e = this.options;
    return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
  }, c.prototype.getUID = function(t) {
    for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
    return t
  }, c.prototype.tip = function() {
    if (!this.$tip && (this.$tip = l(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
    return this.$tip
  }, c.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".rock-tooltip-arrow")
  }, c.prototype.enable = function() {
    this.enabled = !0
  }, c.prototype.disable = function() {
    this.enabled = !1
  }, c.prototype.toggleEnabled = function() {
    this.enabled = !this.enabled
  }, c.prototype.toggle = function(t) {
    var e = this;
    t && ((e = l(t.currentTarget).data("rk." + this.type)) || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), l(t.currentTarget).data("rk." + this.type, e))), t ? (e.inState.click = !e.inState.click, e.isInStateTrue() ? e.enter(e) : e.leave(e)) : e.tip().hasClass("rock-in") ? e.leave(e) : e.enter(e)
  }, c.prototype.destroy = function() {
    var t = this;
    clearTimeout(this.timeout), this.hide(function() {
      t.$element.off("." + t.type).removeData("rk." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
    })
  };
  var t = l.fn.tooltip;
  l.fn.tooltip = function(i) {
    return this.each(function() {
      var t = l(this),
        e = t.data("rk.tooltip"),
        o = "object" == typeof i && i;
      !e && /destroy|hide/.test(i) || (e || t.data("rk.tooltip", e = new c(this, o)), "string" == typeof i && e[i]())
    })
  }, l.fn.tooltip.Constructor = c, l.fn.tooltip.noConflict = function() {
    return l.fn.tooltip = t, this
  }
}(jQuery),
function(n) {
  "use strict";

  function r(t, e) {
    this.init("popover", t, e)
  }
  if (!n.fn.tooltip) throw new Error("Popover requires tooltip.js");
  r.VERSION = "1.3.7", r.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="rock-popover" role="tooltip"><div class="rock-arrow"></div><h3 class="rock-popover-title"></h3><div class="rock-popover-content"></div></div>'
  }), ((r.prototype = n.extend({}, n.fn.tooltip.Constructor.prototype)).constructor = r).prototype.getDefaults = function() {
    return r.DEFAULTS
  }, r.prototype.setContent = function() {
    var t = this.tip(),
      e = this.getTitle(),
      o = this.getContent();
    t.find(".rock-popover-title")[this.options.html ? "html" : "text"](e), t.find(".rock-popover-content").children().detach().end()[this.options.html ? "string" == typeof o ? "html" : "append" : "text"](o), t.removeClass("rock-fade rock-top rock-bottom rock-left rock-right rock-in"), t.find(".rock-popover-title").html() || t.find(".rock-popover-title").hide()
  }, r.prototype.hasContent = function() {
    return this.getTitle() || this.getContent()
  }, r.prototype.getContent = function() {
    var t = this.$element,
      e = this.options;
    return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
  }, r.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".rock-arrow")
  };
  var t = n.fn.popover;
  n.fn.popover = function(i) {
    return this.each(function() {
      var t = n(this),
        e = t.data("rk.popover"),
        o = "object" == typeof i && i;
      !e && /destroy|hide/.test(i) || (e || t.data("rk.popover", e = new r(this, o)), "string" == typeof i && e[i]())
    })
  }, n.fn.popover.Constructor = r, n.fn.popover.noConflict = function() {
    return n.fn.popover = t, this
  }
}(jQuery),
function(n) {
  "use strict";

  function r(t, e) {
    this.$body = n(document.body), this.$scrollElement = n(t).is(document.body) ? n(window) : n(t), this.options = n.extend({}, r.DEFAULTS, e), this.selector = (this.options.target || "") + " .rock-nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.rk.scrollspy", n.proxy(this.process, this)), this.refresh(), this.process()
  }

  function e(i) {
    return this.each(function() {
      var t = n(this),
        e = t.data("rk.scrollspy"),
        o = "object" == typeof i && i;
      e || t.data("rk.scrollspy", e = new r(this, o)), "string" == typeof i && e[i]()
    })
  }
  r.VERSION = "1.3.7", r.DEFAULTS = {
    offset: 10
  }, r.prototype.getScrollHeight = function() {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }, r.prototype.refresh = function() {
    var t = this,
      o = "offset",
      i = 0;
    this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), n.isWindow(this.$scrollElement[0]) || (o = "position", i = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
      var t = n(this),
        e = t.data("target") || t.attr("href"),
        t = /^#./.test(e) && n(e);
      return t && t.length && t.is(":visible") ? [
        [t[o]().top + i, e]
      ] : null
    }).sort(function(t, e) {
      return t[0] - e[0]
    }).each(function() {
      t.offsets.push(this[0]), t.targets.push(this[1])
    })
  }, r.prototype.process = function() {
    var t, e = this.$scrollElement.scrollTop() + this.options.offset,
      o = this.getScrollHeight(),
      i = this.options.offset + o - this.$scrollElement.height(),
      n = this.offsets,
      r = this.targets,
      s = this.activeTarget;
    if (this.scrollHeight != o && this.refresh(), i <= e) return s != (t = r[r.length - 1]) && this.activate(t);
    if (s && e < n[0]) return this.activeTarget = null, this.clear();
    for (t = n.length; t--;) s != r[t] && e >= n[t] && (void 0 === n[t + 1] || e < n[t + 1]) && this.activate(r[t])
  }, r.prototype.activate = function(t) {
    this.activeTarget = t, this.clear();
    t = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', t = n(t).parents("li").addClass("rock-active");
    t.parent(".rock-dropdown-menu").length && (t = t.closest("li.rock-dropdown").addClass("rock-active")), t.trigger("activate.rk.scrollspy")
  }, r.prototype.clear = function() {
    n(this.selector).parentsUntil(this.options.target, ".rock-active").removeClass("rock-active")
  };
  var t = n.fn.scrollspy;
  n.fn.scrollspy = e, n.fn.scrollspy.Constructor = r, n.fn.scrollspy.noConflict = function() {
    return n.fn.scrollspy = t, this
  }, n(window).on("load.rk.scrollspy.data-api", function() {
    n('[data-spy="scroll"]').each(function() {
      var t = n(this);
      e.call(t, t.data())
    })
  })
}(jQuery),
function(s) {
  "use strict";

  function a(t) {
    this.element = s(t)
  }

  function e(o) {
    return this.each(function() {
      var t = s(this),
        e = t.data("rk.tab");
      e || t.data("rk.tab", e = new a(this)), "string" == typeof o && e[o]()
    })
  }
  a.VERSION = "1.3.7", a.TRANSITION_DURATION = 150, a.prototype.show = function() {
    var t, e, o, i = this.element,
      n = i.closest("ul:not(.rock-dropdown-menu)"),
      r = (r = i.data("target")) || (r = i.attr("href")) && r.replace(/.*(?=#[^\s]*$)/, "");
    i.parent("li").hasClass("rock-active") || (t = n.find(".rock-active:last a"), e = s.Event("hide.rk.tab", {
      relatedTarget: i[0]
    }), o = s.Event("show.rk.tab", {
      relatedTarget: t[0]
    }), t.trigger(e), i.trigger(o), o.isDefaultPrevented() || e.isDefaultPrevented() || (r = s(r), this.activate(i.closest("li"), n), this.activate(r, r.parent(), function() {
      t.trigger({
        type: "hidden.rk.tab",
        relatedTarget: i[0]
      }), i.trigger({
        type: "shown.rk.tab",
        relatedTarget: t[0]
      })
    })))
  }, a.prototype.activate = function(t, e, o) {
    var i = e.find("> .rock-active"),
      n = o && s.support.transition && (i.length && i.hasClass("rock-fade") || !!e.find("> .fade").length);

    function r() {
      i.removeClass("rock-active").find("> .rock-dropdown-menu > .rock-active").removeClass("rock-active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), t.addClass("rock-active").find('[data-toggle="tab"]').attr("aria-expanded", !0), n ? (t[0].offsetWidth, t.addClass("rock-in")) : t.removeClass("rock-fade"), t.parent(".rock-dropdown-menu").length && t.closest("li.rock-dropdown").addClass("rock-active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), o && o()
    }
    i.length && n ? i.one("bsTransitionEnd", r).emulateTransitionEnd(a.TRANSITION_DURATION) : r(), i.removeClass("rock-in")
  };
  var t = s.fn.tab;

  function o(t) {
    t.preventDefault(), e.call(s(this), "show")
  }
  s.fn.tab = e, s.fn.tab.Constructor = a, s.fn.tab.noConflict = function() {
    return s.fn.tab = t, this
  }, s(document).on("click.rk.tab.data-api", '[data-toggle="tab"]', o).on("click.rk.tab.data-api", '[data-toggle="pill"]', o)
}(jQuery),
function(s) {
  "use strict";
  var a = function(t, e) {
    this.options = s.extend({}, a.DEFAULTS, e), this.$target = s(this.options.target).on("scroll.rk.affix.data-api", s.proxy(this.checkPosition, this)).on("click.rk.affix.data-api", s.proxy(this.checkPositionWithEventLoop, this)), this.$element = s(t), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
  };

  function o(i) {
    return this.each(function() {
      var t = s(this),
        e = t.data("rk.affix"),
        o = "object" == typeof i && i;
      e || t.data("rk.affix", e = new a(this, o)), "string" == typeof i && e[i]()
    })
  }
  a.VERSION = "1.3.7", a.RESET = "rock-affix rock-affix-top rock-affix-bottom", a.DEFAULTS = {
    offset: 0,
    target: window
  }, a.prototype.getState = function(t, e, o, i) {
    var n = this.$target.scrollTop(),
      r = this.$element.offset(),
      s = this.$target.height();
    if (null != o && "top" == this.affixed) return n < o && "top";
    if ("bottom" == this.affixed) return null != o ? !(n + this.unpin <= r.top) && "bottom" : !(n + s <= t - i) && "bottom";
    var a = null == this.affixed,
      r = a ? n : r.top;
    return null != o && n <= o ? "top" : null != i && t - i <= r + (a ? s : e) && "bottom"
  }, a.prototype.getPinnedOffset = function() {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(a.RESET).addClass("rock-affix");
    var t = this.$target.scrollTop(),
      e = this.$element.offset();
    return this.pinnedOffset = e.top - t
  }, a.prototype.checkPositionWithEventLoop = function() {
    setTimeout(s.proxy(this.checkPosition, this), 1)
  }, a.prototype.checkPosition = function() {
    if (this.$element.is(":visible")) {
      var t = this.$element.height(),
        e = this.options.offset,
        o = e.top,
        i = e.bottom,
        n = Math.max(s(document).height(), s(document.body).height());
      "object" != typeof e && (i = o = e), "function" == typeof o && (o = e.top(this.$element)), "function" == typeof i && (i = e.bottom(this.$element));
      var r = this.getState(n, t, o, i);
      if (this.affixed != r) {
        null != this.unpin && this.$element.css("top", "");
        e = "rock-affix" + (r ? "-" + r : ""), o = s.Event(e + ".rk.affix");
        if (this.$element.trigger(o), o.isDefaultPrevented()) return;
        this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset() : null, this.$element.removeClass(a.RESET).addClass(e).trigger(e.replace("rock-affix", "rock-affixed") + ".rk.affix")
      }
      "bottom" == r && this.$element.offset({
        top: n - t - i
      })
    }
  };
  var t = s.fn.affix;
  s.fn.affix = o, s.fn.affix.Constructor = a, s.fn.affix.noConflict = function() {
    return s.fn.affix = t, this
  }, s(window).on("load", function() {
    s('[data-spy="affix"]').each(function() {
      var t = s(this),
        e = t.data();
      e.offset = e.offset || {}, null != e.offsetBottom && (e.offset.bottom = e.offsetBottom), null != e.offsetTop && (e.offset.top = e.offsetTop), o.call(t, e)
    })
  })
}(jQuery);
