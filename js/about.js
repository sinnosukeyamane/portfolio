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
