// Linksセクションが表示されるたびに画像を生成
document.addEventListener('DOMContentLoaded', () => {
    const linksSection = document.getElementById('links');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          generateLinkIcons(); // Links用の画像生成関数を呼び出し
        }
      });
    }, { threshold: 0.5 });
  
    observer.observe(linksSection);
  });
  
  // Linksセクション用の画像生成関数
  function generateLinkIcons() {
    const images = ['img/facebook.png', 'img/github.png', 'img/instagram.png', 'img/X.png'];
    const rect = document.getElementById('links').getBoundingClientRect();
  
    for (let i = 0; i < 50; i++) {
      const img = document.createElement('img');
      img.src = images[Math.floor(Math.random() * images.length)];
      img.classList.add('scatter-img');
  
      // ランダムな飛び散る位置と回転角度を設定
      const randomX = (Math.random() - 0.5) * 1000 + 'px';
      const randomY = (Math.random() - 0.5) * 800 + 'px'; // 高めに表示
      const randomRotation = Math.random() * 360 + 'deg';
  
      img.style.setProperty('--random-x', randomX);
      img.style.setProperty('--random-y', randomY);
      img.style.setProperty('--random-rotation', randomRotation);
  
      // Linksセクション内のランダムな位置に配置
      img.style.left = rect.left + Math.random() * rect.width + 'px';
      img.style.top = rect.top + Math.random() * rect.height - 200 + 'px'; // 少し高めに調整
  
      document.body.appendChild(img);
  
      // アニメーション終了後に削除
      img.addEventListener('animationend', () => {
        img.remove();
      });
    }
  }
  

  
  // linksセクションでのスクロールイベントを監視
  let linksTriggered = false;
  window.addEventListener('scroll', () => {
    const linksSection = document.getElementById('links');
    const linksRect = linksSection.getBoundingClientRect();
  
    if (!linksTriggered && linksRect.top < window.innerHeight && linksRect.bottom > 0) {
      createLinksScatterEffect();
      linksTriggered = true;
    }
  });
