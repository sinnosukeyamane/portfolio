
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

