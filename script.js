// ナビバーのリンククリック時の動作
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href').replace('#', '');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // スクロール移動を先に実行
            targetSection.scrollIntoView({ behavior: 'smooth' });

            // 少し遅れてアニメーション開始
            setTimeout(() => {
                // アイコンの作成
                const icon = document.createElement('img');
                icon.src = link.querySelector('img.nav-icon').src; // ナビバーのアイコンを使用
                icon.style.position = 'fixed';
                icon.style.left = '50%';
                icon.style.top = '50%';
                icon.style.transform = 'translate(-50%, -50%) scale(0)';
                icon.style.width = '80px'; // 初期サイズ
                icon.style.height = '80px';
                icon.style.zIndex = '2000';
                icon.style.transition = 'transform 1.5s ease-in-out, opacity 1.5s ease-in-out';
                icon.style.opacity = '1'; // 見やすく初期から完全表示

                document.body.appendChild(icon);

                // アニメーション実行
                setTimeout(() => {
                    icon.style.transform = 'translate(-50%, -50%) scale(6) rotateY(720deg)'; // さらに大きく＆回転数アップ
                    icon.style.opacity = '0'; // 消えるように
                }, 10);

                // アニメーション終了後にアイコンを削除
                setTimeout(() => {
                    icon.remove();
                }, 1500);
            }, 500); // スクロール完了後の待機時間
        }
    });
});

// スクロール時のナビバーの透明度を調整
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;

    // スクロール量に応じて透明度を調整
    if (scrollY > 50) {
        navbar.style.opacity = '0.8'; // 少し薄く
    } else {
        navbar.style.opacity = '1'; // 元の透明度に戻す
    }
});
// セクション画像をマッピング
const sectionIcons = {
    about: 'img/about.png',
    history: 'img/history.png',
    links: 'img/links.png',
    skills: 'img/skills.png',
    works: 'img/works.png'
  };
  
  // セクション題名をクリックしたときのアニメーション処理
  document.querySelectorAll('section h2').forEach(title => {
    title.addEventListener('click', (e) => {
      const section = e.target.closest('section');
      const sectionId = section.id;
  
      if (section && sectionIcons[sectionId]) {
        // スクロールして対象セクションに移動
        section.scrollIntoView({ behavior: 'smooth' });
  
        // アニメーションアイコン作成
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('section-animation-icon');
  
        const iconImage = document.createElement('img');
        iconImage.src = sectionIcons[sectionId];
        iconContainer.appendChild(iconImage);
  
        document.body.appendChild(iconContainer);
  
        // 拡大アニメーション
        setTimeout(() => {
          iconContainer.style.transform = 'translate(-50%, -50%) scale(6)';
          iconContainer.style.opacity = '0';
        }, 10);
  
        // アニメーション終了後に削除
        setTimeout(() => {
          iconContainer.remove();
        }, 1500);
      }
    });
  });
  

document.getElementById("emoji-button").addEventListener("click", () => { 
    // 絵文字の種類を増やしたリスト
    const emojis = [
        "🎉", "🥳", "😍", "😭", "❄️", "❤️", "🔥", "🌟", "🌈", "🎶",
        "🍀", "🌸", "💎", "✨", "🦄", "🎁", "🌼", "🎂", "🍎", "🍩",
        "🍕", "⚽", "🚀", "💡", "🎈", "🖤", "🤖", "💻", "🎮", "🎨"
    ];

    const container = document.querySelector(".about-image-container");

    for (let i = 0; i < 20; i++) { // 20個の絵文字を生成
        const emoji = document.createElement("div");
        emoji.classList.add("emoji");
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]; // ランダムな絵文字を選択
        emoji.style.left = `${Math.random() * 100}%`; // 横方向のランダムな位置
        emoji.style.top = `${Math.random() * 100}%`; // 上方向のランダムな位置
        emoji.style.animationDelay = `${Math.random() * 0.5}s`; // アニメーションの遅延をランダム化
        container.appendChild(emoji);

        // アニメーション終了後に削除
        setTimeout(() => {
            emoji.remove();
        }, 2000);
    }

    // meのアニメーションを追加
    const meImage = document.querySelector('.about-image');
    const animations = ['shake', 'bounce', 'flip', 'fade-out']; // 定義されたアニメーション名
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    meImage.classList.add(randomAnimation);

    // アニメーション終了後にクラスを削除
    setTimeout(() => meImage.classList.remove(randomAnimation), 2000);
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
function generateTakoyakiIcons() {
    const rect = document.getElementById('about').getBoundingClientRect();

    for (let i = 0; i < 25; i++) {
        const img = document.createElement('img');
        img.src = 'img/takoyaki.png'; // たこ焼き画像のパス
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
  
// ナビバーのトグル機能
document.getElementById('toggle-navbar').addEventListener('click', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('hidden');

    // ボタンのテキストを切り替え
    const toggleButton = document.getElementById('toggle-navbar');
    if (navbar.classList.contains('hidden')) {
        toggleButton.textContent = '≡'; // ナビバーが引っ込んだとき
    } else {
        toggleButton.textContent = '≪'; // ナビバーが表示されているとき
    }
});




// タイムライン項目を順番に表示する関数
function animateTimelineSequentially() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 項目を順番に表示
                entry.target.classList.add('visible'); // 表示状態にする
            } else {
                // ビューポート外に出たら非表示に戻す
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.2 }); // 20%が見えたらトリガー

    timelineItems.forEach((item) => observer.observe(item));
}

// ページロード時にアニメーションを設定
document.addEventListener('DOMContentLoaded', animateTimelineSequentially);

// 動画拡大表示機能
document.querySelectorAll('.work-item video').forEach(video => {
    // ホバー時に再生開始
    video.addEventListener('mouseover', () => {
        video.play();
    });

    // ホバーが外れたら再生停止
    video.addEventListener('mouseout', () => {
        video.pause();
        video.currentTime = 0; // 再生位置をリセット
    });

    // クリックで拡大表示
    video.addEventListener('click', () => {
        // モーダル作成
        const modal = document.createElement('div');
        modal.classList.add('media-modal');

        // モーダル内の動画
        const modalVideo = document.createElement('video');
        modalVideo.src = video.src;
        modalVideo.controls = true;
        modalVideo.loop = true;
        modalVideo.autoplay = true;
        modalVideo.classList.add('modal-media');

        // 閉じるボタン
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.classList.add('close-modal');

        // モーダル全体をクリックで閉じる
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === closeButton) {
                modal.remove();
                video.pause(); // 元の動画も停止
                video.currentTime = 0; // 再生位置をリセット
            }
        });

        // モーダルに要素を追加
        modal.appendChild(modalVideo);
        modal.appendChild(closeButton);
        document.body.appendChild(modal);
    });
});


// h3をクリックしたときに対応する動画を拡大表示
document.querySelectorAll('.work-description h3').forEach(title => {
    title.addEventListener('click', (e) => {
        const workItem = e.target.closest('.work-item');
        const video = workItem.querySelector('video');

        if (video) {
            // 拡大動画用のモーダル作成
            const modal = document.createElement('div');
            modal.classList.add('media-modal');

            // 拡大動画
            const modalVideo = document.createElement('video');
            modalVideo.src = video.src;
            modalVideo.controls = true; // 動画用の再生コントロールを追加
            modalVideo.loop = true; // ループ再生
            modalVideo.autoplay = true; // 自動再生
            modalVideo.classList.add('modal-media');

            // 閉じるボタン
            const closeButton = document.createElement('button');
            closeButton.textContent = '×';
            closeButton.classList.add('close-modal');

            // モーダル全体をクリックで閉じる
            modal.addEventListener('click', (event) => {
                if (event.target === modal || event.target === closeButton) {
                    modal.remove();
                }
            });

            // モーダルに要素を追加
            modal.appendChild(modalVideo);
            modal.appendChild(closeButton);
            document.body.appendChild(modal);
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const welcomeContainer = document.getElementById('welcome-container');
    const body = document.body;

    // ページロード時にスクロールを無効化
    body.classList.add('no-scroll');

    // フェードアウト後に要素を削除し、スクロールを有効化
    setTimeout(() => {
        welcomeContainer.remove();
        body.classList.remove('no-scroll');
    }, 6000); // 3秒表示＋3秒フェードアウト後に削除
});

// フェードイン/アウトのトリガーを設定する関数
function handleSectionIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}

// Intersection Observerの初期化
const sectionObserver = new IntersectionObserver(handleSectionIntersection, {
    root: null, // ビューポートを基準
    threshold: 0.1 // 10%が見えたときにトリガー
});

// 各セクションを監視
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// スクロールトップボタンの表示/非表示制御
const scrollToTopButton = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) { // スクロール量が200pxを超えたら表示
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// スクロールトップボタンが押されたときの動作
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
