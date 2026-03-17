(function () {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Login button (placeholder — можно подставить свой URL)
  var loginBtn = document.querySelector('.btn-login');
  if (loginBtn) {
    loginBtn.addEventListener('click', function () {
      // window.location.href = 'https://your-login-url';
      console.log('Вход');
    });
  }

  // Games slider: центр 239×239, по бокам 158×158, анимация перескок
  var viewport = document.querySelector('.slider-viewport');
  var track = document.querySelector('.slider-track');
  var slides = document.querySelectorAll('.slider-track .slide');
  var prevBtn = document.querySelector('.slider-prev');
  var nextBtn = document.querySelector('.slider-next');
  var currentIndex = 0;
  var total = slides.length;

  function centerActiveSlide() {
    if (!track || !viewport || !slides.length) return;
    slides.forEach(function (s, i) {
      s.classList.toggle('active', i === currentIndex);
    });
    var activeSlide = slides[currentIndex];
    var apply = function () {
      var vw = viewport.offsetWidth;
      var left = activeSlide.offsetLeft;
      var half = activeSlide.offsetWidth / 2;
      var tx = vw / 2 - left - half;
      track.style.transform = 'translateX(' + tx + 'px)';
    };
    requestAnimationFrame(function () {
      requestAnimationFrame(apply);
    });
  }

  function goNext() {
    currentIndex = (currentIndex + 1) % total;
    centerActiveSlide();
  }

  function goPrev() {
    currentIndex = (currentIndex - 1 + total) % total;
    centerActiveSlide();
  }

  if (prevBtn) prevBtn.addEventListener('click', goPrev);
  if (nextBtn) nextBtn.addEventListener('click', goNext);

  if (slides.length) {
    slides[0].classList.add('active');
    centerActiveSlide();
    window.addEventListener('resize', centerActiveSlide);
  }

  // Карусель игр: правый маленький → большой в центре, центр влево, справа новая игра
  function startGameCarousel() {
    var wrap = document.getElementById('games-carousel');
    if (!wrap) return;
    var viewport = wrap.querySelector('.game-carousel-viewport');
    var track = document.getElementById('games-carousel-track');
    var cells = wrap.querySelectorAll('.game-carousel-cell');
    if (!viewport || !track || cells.length < 2) return;

    var centerIdx = 0;
    var total = cells.length;

    function applyTransform() {
      var leftIdx = (centerIdx - 1 + total) % total;
      var leftEl = cells[leftIdx];
      track.style.transform = 'translate3d(' + (-leftEl.offsetLeft) + 'px, 0, 0)';
    }

    function updateCenter() {
      cells.forEach(function (el, i) {
        el.classList.toggle('center', i === centerIdx);
      });
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          applyTransform();
        });
      });
    }

    function next() {
      centerIdx = (centerIdx + 1) % total;
      updateCenter();
    }

    updateCenter();
    setInterval(next, 2200);
  }

  window.addEventListener('load', function () {
    startGameCarousel();
  });
})();
