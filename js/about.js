document.addEventListener("DOMContentLoaded", () => {
    const floatingImages = document.querySelectorAll(".floating-image");
    const aboutImage = document.getElementById("emoji-button"); // 僕の画像
    const emojiList = [
        "🎉", "🥳", "😍", "😭", "❄️", "❤️", "🔥", "🌟", "🌈", "🎶",
        "🍀", "🌸", "💎", "✨", "🦄", "🎁", "🌼", "🎂", "🍎", "🍩",
        "🍕", "⚽", "🚀", "💡", "🎈", "🖤", "🤖", "💻", "🎮", "🎨"
    ];

    function animateMeImage() {
        // 🎉 絵文字シャワーを発生させる
        const container = document.querySelector(".about-image-container");
        for (let i = 0; i < 20; i++) {
            const emoji = document.createElement("div");
            emoji.classList.add("emoji");
            emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
            emoji.style.left = `${Math.random() * 100}%`;
            emoji.style.top = `${Math.random() * 100}%`;
            emoji.style.animationDelay = `${Math.random() * 0.5}s`;
            container.appendChild(emoji);

            setTimeout(() => {
                emoji.remove();
            }, 2000);
        }

        // 🎈 僕の画像にランダムなアニメーションを適用
        const animations = ['shake', 'bounce', 'flip', 'fade-out'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        aboutImage.classList.add(randomAnimation);

        setTimeout(() => aboutImage.classList.remove(randomAnimation), 2000);
    }

    // 🔥 「僕の画像」をクリックしたときに発動
    aboutImage.addEventListener("click", animateMeImage);

    // 🔥 「食べ物（floating-image）」をクリックしても同じ動きをする
    floatingImages.forEach(img => {
        img.addEventListener("click", () => {
            animateMeImage(); // 僕の画像を動かす

            // 煙の画像を作成
            const smoke = document.createElement("img");
            smoke.src = "img/kemuri.png"; // 煙画像のパス
            smoke.classList.add("smoke-effect");

            // クリックされた画像の位置を取得
            const rect = img.getBoundingClientRect();
            smoke.style.position = "absolute";
            smoke.style.left = `${rect.left + window.scrollX}px`;
            smoke.style.top = `${rect.top + window.scrollY}px`;
            smoke.style.width = `${img.offsetWidth}px`;
            smoke.style.height = `${img.offsetHeight}px`;
            document.body.appendChild(smoke);

            // 画像を一旦非表示にする
            img.style.display = "none";

            // 0.7秒後に煙を消し、画像を削除
            setTimeout(() => {
                smoke.remove();
            }, 700);

            // 3秒後に元の画像を復活
            setTimeout(() => {
                img.style.display = "block";
            }, 3000);
        });
    });
});

// Aboutセクションが表示されるたびに画像を生成
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                generateTakoyakiIcons(); // About用の画像生成関数を呼び出し
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);
});

// Aboutセクション用の画像生成関数
function generateScatterIcons() {
    const rect = document.getElementById('about').getBoundingClientRect();

    // 画像のリスト（アップロードされたすべての画像）
    const images = [
        'img/takoyaki.png',
    ];

    for (let i = 0; i < 40; i++) {
        const img = document.createElement('img');
        img.src = images[Math.floor(Math.random() * images.length)]; // ランダムな画像を選択
        img.classList.add('scatter-img');

        // ランダムな飛び散る位置と回転角度を設定
        const randomX = (Math.random() - 0.5) * 1000 + 'px';
        const randomY = `${(Math.random() - 0.5) * 600 + 200}px`; // Y方向にもう少し下げる
        const randomRotation = Math.random() * 360 + 'deg';

        img.style.setProperty('--random-x', randomX);
        img.style.setProperty('--random-y', randomY);
        img.style.setProperty('--random-rotation', randomRotation);

        // Aboutセクション内のランダムな位置に配置
        img.style.left = rect.left + Math.random() * rect.width + 'px';
        img.style.top = rect.top + Math.random() * rect.height + 200 + 'px'; // 下にさらに調整

        document.body.appendChild(img);

        // アニメーション終了後に削除
        img.addEventListener('animationend', () => {
            img.remove();
        });
    }
}

// About セクションが表示されたら発動
document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.getElementById("about");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                generateScatterIcons();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);
});

document.addEventListener("DOMContentLoaded", () => {
    const floatingImages = document.querySelectorAll(".floating-image");

    floatingImages.forEach(img => {
        img.addEventListener("click", () => {
            img.style.display = "none"; // クリックで消える
            setTimeout(() => {
                img.style.display = "block"; // 3秒後に復活
            }, 3000);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const openRoulette = document.getElementById("open-roulette");
    const modal = document.getElementById("roulette-modal");
    const grid = document.getElementById("calendar-grid");
    const resultText = document.getElementById("roulette-result");
    const closeBtn = document.getElementById("close-roulette");
    const flash = document.getElementById("flash-screen");
  
    let flashInterval = null;
    let activeInterval = null;
    let animationRunning = false;
    let stars = [];
  
    // カレンダー31マス生成（初回のみ）
    if (grid.children.length === 0) {
      for (let i = 1; i <= 31; i++) {
        const cell = document.createElement("div");
        cell.classList.add("calendar-cell");
        cell.textContent = i;
        grid.appendChild(cell);
      }
    }
  
    const cells = document.querySelectorAll(".calendar-cell");
  
    // モーダルを開く
    openRoulette.addEventListener("click", () => {
      modal.style.display = "flex";
      resultText.textContent = "今月のラッキーデーを選んでいます...";
      animationRunning = true;
  
      let previousIndex = null;
      let count = 0;
      const maxFlashes = Math.floor(Math.random() * 30) + 40;
  
      activeInterval = setInterval(() => {
        if (!animationRunning) return;
  
        if (previousIndex !== null) {
          cells[previousIndex].classList.remove("active");
        }
  
        const randomIndex = Math.floor(Math.random() * cells.length);
        previousIndex = randomIndex;
        cells[randomIndex].classList.add("active");
  
        count++;
        if (count >= maxFlashes) {
          clearInterval(activeInterval);
  
          // 最終決定の演出
          const lucky = parseInt(cells[randomIndex].textContent);
          setTimeout(() => {
            if (!animationRunning) return;
  
            resultText.textContent = `🎉 今月のラッキーデーは ${lucky}日 です！`;
  
            // ピカッ！
            flash.classList.add("flash-visible");
            setTimeout(() => {
              flash.classList.remove("flash-visible");
            }, 300);
  
            // 星の演出
            for (let i = 0; i < 20; i++) {
              const star = document.createElement("div");
              star.classList.add("star");
              star.textContent = "✨";
              star.style.left = `${cells[randomIndex].offsetLeft + 30}px`;
              star.style.top = `${cells[randomIndex].offsetTop + 30}px`;
              star.style.setProperty("--x", `${(Math.random() - 0.5) * 300}px`);
              star.style.setProperty("--y", `${(Math.random() - 0.5) * 300}px`);
              grid.appendChild(star);
              stars.push(star);
              setTimeout(() => star.remove(), 1000);
            }
  
            // ズームぷるぷる
            cells[randomIndex].animate([
              { transform: "scale(1.4) rotate(0deg)" },
              { transform: "scale(1.6) rotate(5deg)" },
              { transform: "scale(1.4) rotate(-5deg)" },
              { transform: "scale(1.5) rotate(0deg)" }
            ], {
              duration: 600,
              easing: "ease-in-out"
            });
  
            // 見た目強調
            cells[randomIndex].classList.add("final-hit");
          }, 300);
        }
      }, 80);
    });
  
    // モーダルを閉じる & アニメーション強制終了
    closeBtn.addEventListener("click", () => {
      animationRunning = false;
  
      modal.style.display = "none";
      resultText.textContent = "";
  
      clearInterval(activeInterval);
      flash.classList.remove("flash-visible");
  
      cells.forEach(cell => {
        cell.classList.remove("active", "final-hit");
        cell.style.boxShadow = "";
        cell.style.backgroundColor = "";
      });
  
      // 星も削除
      stars.forEach(star => star.remove());
      stars = [];
    });
  });
  