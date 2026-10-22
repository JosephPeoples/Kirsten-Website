/* Kirsten Peoples portfolio: small vanilla JS enhancements (no dependencies). */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Mobile menu drawer (with aria-expanded) */
  var menuBtn = document.getElementById('mobile-menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var barsIcon = document.getElementById('menu-icon-bars');
  var closeIcon = document.getElementById('menu-icon-close');
  function setMobileMenu(open) {
    mobileMenu.classList.toggle('hidden', !open);
    barsIcon.classList.toggle('hidden', open);
    closeIcon.classList.toggle('hidden', !open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () { setMobileMenu(mobileMenu.classList.contains('hidden')); });
    document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', function () { setMobileMenu(false); });
    });
  }

  /* 2. Copy email to clipboard */
  var copyBtn = document.getElementById('copy-email-btn');
  var copyText = document.getElementById('copy-email-text');
  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', function () {
      if (!navigator.clipboard) { window.location.href = 'mailto:peoples.socialmarketing@gmail.com'; return; }
      navigator.clipboard.writeText('peoples.socialmarketing@gmail.com').then(function () {
        copyText.textContent = 'Copied to Clipboard!';
        copyBtn.classList.add('border-pink-500', 'text-pink-300');
        setTimeout(function () {
          copyText.textContent = 'Copy Email';
          copyBtn.classList.remove('border-pink-500', 'text-pink-300');
        }, 2500);
      }).catch(function () { window.location.href = 'mailto:peoples.socialmarketing@gmail.com'; });
    });
  }

  /* 3. "Case Studies" dropdown (hover / focus handled in CSS; button + Escape here) */
  var workNav = document.getElementById('work-nav');
  var workBtn = document.getElementById('work-menu-btn');
  var workMenu = document.getElementById('work-menu');
  function setWorkMenu(open) {
    if (!workMenu) return;
    if (open) workMenu.setAttribute('data-open', ''); else workMenu.removeAttribute('data-open');
    workBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (workNav && workBtn && workMenu) {
    workBtn.addEventListener('click', function () { setWorkMenu(!workMenu.hasAttribute('data-open')); });
    workNav.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setWorkMenu(false); workBtn.focus(); workBtn.blur(); }
    });
    document.addEventListener('click', function (e) { if (!workNav.contains(e.target)) setWorkMenu(false); });
    // After choosing a case study, hide the panel even though the pointer is still over it
    workMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setWorkMenu(false); workMenu.setAttribute('data-closed', ''); a.blur(); });
    });
    workNav.addEventListener('mouseleave', function () { workMenu.removeAttribute('data-closed'); });
    workNav.addEventListener('focusin', function (e) { if (!workMenu.contains(e.target)) workMenu.removeAttribute('data-closed'); });
    workBtn.addEventListener('click', function () { workMenu.removeAttribute('data-closed'); });
  }

  /* 4. Active-section highlighting in the nav */
  var navLinks = document.querySelectorAll('[data-nav]');
  if ('IntersectionObserver' in window && navLinks.length) {
    var setActive = function (id) {
      navLinks.forEach(function (l) {
        var on = l.getAttribute('data-nav') === id;
        l.classList.toggle('text-pink-600', on);
        if (on) l.setAttribute('aria-current', 'location'); else l.removeAttribute('aria-current');
      });
    };
    var ids = ['about', 'what-i-do', 'work', 'skills', 'endorsements', 'contact'];
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var current = null;
      ids.forEach(function (id) { if (visible[id]) current = id; });
      setActive(current);
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* 5. Back-to-top button */
  var toTop = document.getElementById('back-to-top');
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 800) toTop.setAttribute('data-show', ''); else toTop.removeAttribute('data-show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      var first = document.querySelector('header a');
      if (first) first.focus({ preventScroll: true });
    });
  }

  /* 6. Sisense video: preload="none", play muted only while in view */
  document.querySelectorAll('video[data-autoplay-inview]').forEach(function (v) {
    var userPaused = false;
    v.addEventListener('pause', function () { if (v.dataset.autoPausing !== '1') userPaused = true; v.dataset.autoPausing = ''; });
    v.addEventListener('play', function () { userPaused = false; });
    if (reduceMotion) return; // respect reduced-motion: user can still press play
    if (!('IntersectionObserver' in window)) { v.play().catch(function () {}); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { if (!userPaused) v.play().catch(function () {}); }
        else if (!v.paused) { v.dataset.autoPausing = '1'; v.pause(); }
      });
    }, { threshold: 0.35 }).observe(v);
  });

  /* 7. Chart lightbox */
  var dlg = document.getElementById('lightbox');
  if (dlg && typeof dlg.showModal === 'function') {
    var lbImg = document.getElementById('lightbox-img');
    var lbCap = document.getElementById('lightbox-caption');
    var lastTrigger = null;
    var close = function () { if (dlg.open) dlg.close(); };
    document.querySelectorAll('[data-lightbox]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        lastTrigger = btn;
        lbImg.src = btn.getAttribute('data-lightbox');
        lbImg.alt = btn.getAttribute('data-lightbox-alt') || '';
        lbCap.textContent = btn.getAttribute('data-lightbox-alt') || '';
        document.documentElement.classList.add('overflow-hidden');
        dlg.showModal();
      });
    });
    dlg.querySelector('[data-lightbox-close]').addEventListener('click', close);
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.hasAttribute('data-lightbox-scroller')) close();
    });
    dlg.addEventListener('close', function () {
      document.documentElement.classList.remove('overflow-hidden');
      if (lastTrigger) lastTrigger.focus();
    });
  } else {
    // Very old browsers: open the large image directly
    document.querySelectorAll('[data-lightbox]').forEach(function (btn) {
      btn.addEventListener('click', function () { window.open(btn.getAttribute('data-lightbox'), '_blank', 'noopener'); });
    });
  }

  /* 8. Testimonial carousel (progressive enhancement of the 2-column grid) */
  var root = document.getElementById('testimonial-carousel');
  if (root) {
    var track = root.querySelector('[data-track]');
    var viewport = root.querySelector('[data-viewport]');
    var slides = Array.prototype.slice.call(track.querySelectorAll('[data-slide]'));
    var controls = root.querySelector('[data-controls]');
    var dotsWrap = root.querySelector('[data-dots]');
    var toggle = root.querySelector('[data-toggle]');
    var GAP = 32; // matches gap-8
    var mq = window.matchMedia('(min-width: 768px)');
    var page = 0, timer = null, userStopped = reduceMotion, hoverPause = false;

    track.classList.remove('grid', 'md:grid-cols-2');
    track.classList.add('flex', 'transition-transform', 'duration-700', 'ease-in-out', 'motion-reduce:transition-none');
    viewport.classList.add('overflow-hidden', 'p-1', '-m-1');
    slides.forEach(function (s, i) {
      s.classList.add('shrink-0', 'w-full', 'md:w-[calc((100%-2rem)/2)]');
      s.setAttribute('role', 'group');
      s.setAttribute('aria-roledescription', 'slide');
      s.setAttribute('aria-label', (i + 1) + ' of ' + slides.length);
    });
    controls.hidden = false;

    function perView() { return mq.matches ? 2 : 1; }
    function pages() { return Math.ceil(slides.length / perView()); }
    function buildDots() {
      dotsWrap.innerHTML = '';
      for (var p = 0; p < pages(); p++) {
        var d = document.createElement('button');
        d.type = 'button';
        d.className = 'h-2.5 rounded-full transition-all duration-300 bg-pink-200 hover:bg-pink-400 w-2.5';
        d.setAttribute('aria-label', 'Show testimonial ' + (perView() === 1 ? (p + 1) : ('page ' + (p + 1))) + ' of ' + pages());
        d.addEventListener('click', (function (n) { return function () { go(n); }; })(p));
        dotsWrap.appendChild(d);
      }
    }
    function render() {
      var pv = perView();
      var first = Math.min(page * pv, slides.length - pv);
      var w = slides[0].getBoundingClientRect().width + GAP;
      track.style.transform = 'translateX(' + (-first * w) + 'px)';
      slides.forEach(function (s, i) {
        var shown = i >= first && i < first + pv;
        s.toggleAttribute('inert', !shown);
        s.setAttribute('aria-hidden', shown ? 'false' : 'true');
      });
      Array.prototype.forEach.call(dotsWrap.children, function (d, i) {
        var on = i === page;
        d.classList.toggle('bg-pink-600', on); d.classList.toggle('w-6', on);
        d.classList.toggle('bg-pink-200', !on); d.classList.toggle('w-2.5', !on);
        if (on) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
    }
    function go(n) { page = (n + pages()) % pages(); render(); }
    function stop() { clearInterval(timer); timer = null; }
    function start() { stop(); if (!userStopped && !hoverPause) timer = setInterval(function () { go(page + 1); }, 7000); }
    function syncToggle() {
      toggle.setAttribute('aria-label', userStopped ? 'Start automatic rotation' : 'Pause automatic rotation');
      toggle.querySelector('[data-icon-pause]').classList.toggle('hidden', userStopped);
      toggle.querySelector('[data-icon-play]').classList.toggle('hidden', !userStopped);
      viewport.setAttribute('aria-live', userStopped ? 'polite' : 'off');
    }
    root.querySelector('[data-prev]').addEventListener('click', function () { go(page - 1); start(); });
    root.querySelector('[data-next]').addEventListener('click', function () { go(page + 1); start(); });
    toggle.addEventListener('click', function () { userStopped = !userStopped; syncToggle(); start(); });
    root.addEventListener('mouseenter', function () { hoverPause = true; stop(); });
    root.addEventListener('mouseleave', function () { hoverPause = false; start(); });
    root.addEventListener('focusin', function () { hoverPause = true; stop(); });
    root.addEventListener('focusout', function (e) { if (!root.contains(e.relatedTarget)) { hoverPause = false; start(); } });
    var onMq = function () { page = 0; buildDots(); render(); };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else mq.addListener(onMq);
    window.addEventListener('resize', render);
    buildDots(); syncToggle(); render(); start();
  }
  /* 9. Leadtail calendar stack: 3 screenshots layered by ~1/3, front card rotates to the back */
  var calRoot = document.getElementById('calendar-stack');
  if (calRoot) {
    var calStage = calRoot.querySelector('[data-cal-stage]');
    var calCards = Array.prototype.slice.call(calRoot.querySelectorAll('[data-cal-card]'));
    var calDots = Array.prototype.slice.call(calRoot.querySelectorAll('[data-cal-dot]'));
    var calLabel = calRoot.querySelector('[data-cal-label]');
    var calToggle = calRoot.querySelector('[data-cal-toggle]');
    var lightboxDlg = document.getElementById('lightbox');
    var calCur = 0, calTimer = null, calUserStopped = reduceMotion, calHover = false, calInView = true;
    var calN = calCards.length;
    calRoot.querySelector('[data-cal-controls]').hidden = false;

    function calRender(announce) {
      calCards.forEach(function (c, i) {
        var pos = (i - calCur + calN) % calN;
        var name = c.getAttribute('data-cal-name');
        c.setAttribute('data-pos', pos);
        if (pos === 0) {
          c.setAttribute('aria-label', 'Enlarge: ' + c.getAttribute('data-lightbox-alt'));
          c.removeAttribute('tabindex');
        } else {
          c.setAttribute('aria-label', 'Bring ' + name + ' calendar to front');
          c.setAttribute('tabindex', '-1');
        }
      });
      calDots.forEach(function (d, i) {
        var on = i === calCur;
        d.classList.toggle('bg-pink-600', on); d.classList.toggle('w-6', on);
        d.classList.toggle('bg-pink-200', !on); d.classList.toggle('w-2.5', !on);
        if (on) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
      if (announce !== false) {
        calLabel.textContent = 'Showing ' + calCards[calCur].getAttribute('data-cal-name') + ' calendar (' + (calCur + 1) + ' of ' + calN + ')';
      }
    }
    function calGo(n) { calCur = (n + calN) % calN; calRender(); }
    function calStop() { clearInterval(calTimer); calTimer = null; }
    function calStart() {
      calStop();
      if (!calUserStopped && !calHover && calInView) {
        calTimer = setInterval(function () { if (!(lightboxDlg && lightboxDlg.open)) calGo(calCur + 1); }, 4000);
      }
    }
    function calSyncToggle() {
      calToggle.setAttribute('aria-label', calUserStopped ? 'Start automatic rotation' : 'Pause automatic rotation');
      calToggle.querySelector('[data-icon-pause]').classList.toggle('hidden', calUserStopped);
      calToggle.querySelector('[data-icon-play]').classList.toggle('hidden', !calUserStopped);
    }
    // A back card comes to the front instead of opening the lightbox (capture phase runs before the lightbox handler)
    calStage.addEventListener('click', function (e) {
      var card = e.target.closest('[data-cal-card]');
      if (!card || card.getAttribute('data-pos') === '0') return;
      e.preventDefault(); e.stopPropagation();
      calGo(calCards.indexOf(card)); calStart();
    }, true);
    calRoot.querySelector('[data-cal-prev]').addEventListener('click', function () { calGo(calCur - 1); calStart(); });
    calRoot.querySelector('[data-cal-next]').addEventListener('click', function () { calGo(calCur + 1); calStart(); });
    calDots.forEach(function (d, i) { d.addEventListener('click', function () { calGo(i); calStart(); }); });
    calToggle.addEventListener('click', function () { calUserStopped = !calUserStopped; calSyncToggle(); calStart(); });
    calRoot.addEventListener('mouseenter', function () { calHover = true; calStop(); });
    calRoot.addEventListener('mouseleave', function () { calHover = false; calStart(); });
    calRoot.addEventListener('focusin', function () { calHover = true; calStop(); });
    calRoot.addEventListener('focusout', function (e) { if (!calRoot.contains(e.relatedTarget)) { calHover = false; calStart(); } });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { calInView = en.isIntersecting; calStart(); });
      }, { threshold: 0.2 }).observe(calStage);
    }
    calSyncToggle(); calRender(); calStart();
  }
})();
