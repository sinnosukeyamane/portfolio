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

document.addEventListener('DOMContentLoaded', () => {
    const welcomeContainer = document.getElementById('welcome-container');
    const body = document.body;

    // ページロード時にスクロールを無効化
    body.classList.add('no-scroll');

    // フェードアウト後に要素を削除し、スクロールを有効化
    setTimeout(() => {
        welcomeContainer.remove();
        body.classList.remove('no-scroll');
    }, 4500); // 3秒表示＋3秒フェードアウト後に削除
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

// セクションのフェードインを有効にする
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll("section").forEach(section => sectionObserver.observe(section));


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

// NHK動画の拡大表示・ホバー再生対応
document.querySelectorAll('.nhk-video').forEach(video => {
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
        modalVideo.src = video.querySelector('source').src;
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
