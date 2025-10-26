let beans = []; // 豆子数组
let Bigbeans = []; // 大豆子数组


const beanClass = {
    speed: 3,
    width: 30,
    height: 30
};

const BigbeanClass = {
    speed: 5,
    width: 50,
    height: 50
}

function drawBean() {
    ctx.fillStyle = 'yellow';
    for (let i = 0; i < beans.length; i++) {
        const bean = beans[i];
        ctx.beginPath();
        ctx.ellipse(bean.x, bean.y, beanClass.width / 2, beanClass.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
    }
}

function updateBean() {
    for (let i = beans.length - 1; i >= 0; i--) {
        const bean = beans[i];
        bean.y += beanClass.speed;

        if (bean.y + beanClass.height > (canvas.height - ground.height)) {
            if (MODE == 'Difficult') {
                beans.splice(i, 1);
            } else { beans[i].y -= canvas.height; }
        }

        if (player.x < bean.x + beanClass.width &&
            player.x + player.width > bean.x &&
            player.y < bean.y + beanClass.height &&
            player.y + player.height > bean.y
        ) {
            songsRun('../songs/7.mp3');
            beans.splice(i, 1); // 玩家与豆子相碰撞，移除豆子
            player.score += 2.5; // 分数加一
        } else if (player_2.x < bean.x + beanClass.width &&
            player_2.x + player_2.width > bean.x &&
            player_2.y < bean.y + beanClass.height &&
            player_2.y + player_2.height > bean.y
        ) {
            if (METHOD == '3') {
                songsRun('../songs/7.mp3');
                beans.splice(i, 1); // 玩家与豆子相碰撞，移除豆子
                player.score += 2.5; // 分数加五
            } else {
                songsRun('../songs/7.mp3');
                beans.splice(i, 1); // 玩家与豆子相碰撞，移除豆子
                player_2.score += 2.5;
            }
        }
    }

    // 持续生成豆子
    if (Math.random() < 0.01) {
        const beanX = Math.random() * (canvas.width - beanClass.width);
        beans.push({ x: beanX, y: 0 });
    }
}

function drawBigBean() {
    const colors = ["yellow", "lightgreen", "orange"];
    const color = Math.floor(Math.random() * colors.length);
    ctx.fillStyle = colors[color];
    for (let i = 0; i < Bigbeans.length; i++) {
        const Bigbean = Bigbeans[i];
        ctx.beginPath();
        ctx.ellipse(Bigbean.x, Bigbean.y, BigbeanClass.width / 2, BigbeanClass.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
    }
}

function updateBigBean() {
    for (let i = Bigbeans.length - 1; i >= 0; i--) {
        const Bigbean = Bigbeans[i];
        Bigbean.y += BigbeanClass.speed;

        if (Bigbean.y + BigbeanClass.height > (canvas.height - ground.height)) {
            if (MODE == 'Easy') {
                Bigbeans[i].y -= canvas.height;
            } else { Bigbeans.splice(i, 1); }
        }

        if (player.x < Bigbean.x + BigbeanClass.width &&
            player.x + player.width > Bigbean.x &&
            player.y < Bigbean.y + BigbeanClass.height &&
            player.y + player.height > Bigbean.y
        ) {
            songsRun('../songs/7.mp3');
            Bigbeans.splice(i, 1); // 玩家与豆子相碰撞，移除豆子
            player.score += 5; // 分数加五
        } else if (
            player_2.x < Bigbean.x + BigbeanClass.width &&
            player_2.x + player_2.width > Bigbean.x &&
            player_2.y < Bigbean.y + BigbeanClass.height &&
            player_2.y + player_2.height > Bigbean.y
        ) {
            if (METHOD == '3') {
                songsRun('../songs/7.mp3');
                Bigbeans.splice(i, 1); // 玩家与豆子相碰撞，移除豆子
                player.score += 5; // 分数加五
            } else {
                songsRun('../songs/7.mp3');
                Bigbeans.splice(i, 1); // 玩家与豆子相碰撞，移除豆子
                player_2.score += 5;
            }

        }
    }

    // 持续生成豆子
    if (Math.random() < 0.01) {
        const BigbeanX = Math.random() * (canvas.width - BigbeanClass.width);
        Bigbeans.push({ x: BigbeanX, y: 0 });
    }
}

