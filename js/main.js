/* ============================================
   刘佳鑫 · 潮玩产品人作品集
   JavaScript - 交互与动画
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 导航栏滚动效果 ---------- */
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------- 移动端菜单 ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMobile.classList.toggle('open');
  });

  // 点击移动端链接后关闭菜单
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMobile.classList.remove('open');
    });
  });

  /* ---------- 平滑滚动 ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80; // 导航栏高度
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- 滚动渐现动画 (Intersection Observer) ---------- */
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // 添加递进延迟，让同时出现的元素有序进入
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- 画廊筛选 ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const masonryItems = document.querySelectorAll('.masonry-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 切换 active 状态
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      masonryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
          // 重新触发动画
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ---------- 图片懒加载容错 ---------- */
  document.querySelectorAll('.masonry-img-wrap img').forEach(img => {
    img.addEventListener('error', () => {
      // 图片加载失败时显示优雅的占位
      img.style.display = 'none';
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        width: 100%;
        padding-top: 100%;
        background: linear-gradient(135deg, #f5f0eb 0%, #e8e3de 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      `;
      const text = document.createElement('span');
      text.textContent = '图片待替换';
      text.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #aaa;
        font-size: 14px;
      `;
      placeholder.appendChild(text);
      img.parentNode.appendChild(placeholder);
    });
  });

});
