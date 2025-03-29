const fs = require('fs');
const path = require('path');

// 读取游戏数据
const gamesData = JSON.parse(fs.readFileSync('games.json', 'utf8'));
const games = gamesData.games;

// 确保games目录存在
const gamesDir = path.join(__dirname, 'games');
if (!fs.existsSync(gamesDir)) {
    fs.mkdirSync(gamesDir);
}

// 读取模板文件
const templateContent = fs.readFileSync('template.html', 'utf8');

// 为每个游戏生成页面
games.forEach(game => {
    console.log(`正在生成游戏页面: ${game.name}`);
    
    // 替换模板中的占位符
    let gamePageContent = templateContent
        .replace(/{{游戏名称}}/g, game.name)
        .replace(/{{游戏简介}}/g, game.description)
        .replace(/{{游戏URL}}/g, game.url)
        .replace(/{{游戏说明}}/g, game.instructions);
    
    // 写入游戏页面文件
    fs.writeFileSync(path.join(gamesDir, `${game.id}.html`), gamePageContent);
});

// 更新主页和游戏列表页面中的游戏卡片
function generateGameCard(game) {
    return `
    <div class="game-card">
        <img src="${game.thumbnail}" alt="${game.name}">
        <div class="game-card-content">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <a href="games/${game.id}.html">开始游戏</a>
        </div>
    </div>`;
}

// 生成首页特色游戏
function updateHomepage() {
    console.log('正在更新首页游戏列表');
    
    // 从所有游戏中随机选择3个作为特色游戏
    const featuredGames = [...games]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    
    // 生成特色游戏HTML
    const featuredGamesHtml = featuredGames
        .map(game => generateGameCard(game))
        .join('\n');
    
    // 读取首页HTML
    let homepageContent = fs.readFileSync('index.html', 'utf8');
    
    // 替换特色游戏部分
    homepageContent = homepageContent.replace(
        /<div class="games-grid" id="featured-games-grid">[\s\S]*?<\/div>/,
        `<div class="games-grid" id="featured-games-grid">\n${featuredGamesHtml}\n</div>`
    );
    
    // 保存更新后的首页
    fs.writeFileSync('index.html', homepageContent);
}

// 生成所有游戏列表页面
function updateGamesPage() {
    console.log('正在更新全部游戏列表');
    
    // 生成所有游戏HTML
    const allGamesHtml = games
        .map(game => generateGameCard(game))
        .join('\n');
    
    // 读取游戏列表页面HTML
    let gamesPageContent = fs.readFileSync('games.html', 'utf8');
    
    // 替换所有游戏部分
    gamesPageContent = gamesPageContent.replace(
        /<div class="games-grid" id="all-games-grid">[\s\S]*?<\/div>/,
        `<div class="games-grid" id="all-games-grid">\n${allGamesHtml}\n</div>`
    );
    
    // 保存更新后的游戏列表页面
    fs.writeFileSync('games.html', gamesPageContent);
}

// 执行更新
updateHomepage();
updateGamesPage();

console.log('游戏页面生成完成！');
console.log(`共生成了 ${games.length} 个游戏页面。`);
console.log('首页和游戏列表页面已更新。'); 