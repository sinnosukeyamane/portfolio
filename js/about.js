document.getElementById("emoji-button").addEventListener("click", () => {
    const emojis = [
        "🎉", "🥳", "😍", "😭", "❄️", "❤️", "🔥", "🌟", "🌈", "🎶",
        "🍀", "🌸", "💎", "✨", "🦄", "🎁", "🌼", "🎂", "🍎", "🍩",
        "🍕", "⚽", "🚀", "💡", "🎈", "🖤", "🤖", "💻", "🎮", "🎨"
    ];
    const container = document.querySelector(".about-image-container");

    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement("div");
        emoji.classList.add("emoji");
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.top = `${Math.random() * 100}%`;
        emoji.style.animationDelay = `${Math.random() * 0.5}s`;
        container.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 2000);
    }

    const meImage = document.querySelector('.about-image');
    const animations = ['shake', 'bounce', 'flip', 'fade-out'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    meImage.classList.add(randomAnimation);

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
