// タイムラインのアニメーション処理
document.addEventListener("DOMContentLoaded", () => {
    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate"); // クラスを追加してアニメーション開始
            } else {
                entry.target.classList.remove("animate"); // 画面外に出たらリセット
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item) => observer.observe(item));
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

