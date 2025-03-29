// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('游戏页面加载完成');
    
    // 如果在游戏页面，设置iframe响应式调整
    const gameIframe = document.querySelector('.game-iframe');
    if (gameIframe) {
        window.addEventListener('resize', function() {
            // 可以在这里添加额外的响应式调整逻辑
        });
    }
}); 