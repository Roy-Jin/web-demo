var loveDate = {
    specifiedDate: new Date("2023-10-26T20:30:00"), // 的那一天
    show_delay: 999, // 展示时间的计算延迟

    Run: () => {
        loveDate.show_Fun = setInterval(() => { // 计算时间

            // 获取现在的时间
            const now = new Date();
            loveDate.NowString = now.toLocaleString();
            // 计算时间差（以毫秒为单位）
            timeDiff = now.getTime() - loveDate.specifiedDate.getTime();
            // 计算天数
            loveDate.days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            // 计算小时数
            loveDate.hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            // 计算分钟数
            loveDate.minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            // 计算秒数
            loveDate.seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            // 展示 DOM
            try { document.getElementById('Now').innerHTML = loveDate.NowString; } catch { }

            try { document.getElementById('love-D').innerHTML = loveDate.days + " 天 "; } catch { }
            try { document.getElementById('love-H').innerHTML = loveDate.hours + " 时 "; } catch { }
            try { document.getElementById('love-M').innerHTML = loveDate.minutes + " 分 "; } catch { }
            try { document.getElementById('love-S').innerHTML = loveDate.seconds + " 秒 "; } catch { }

            // 仅 Number 的展示
            try { document.getElementById('love-D-num').innerHTML = loveDate.days; } catch { }
            try { document.getElementById('love-H-num').innerHTML = loveDate.hours; } catch { }
            try { document.getElementById('love-M-num').innerHTML = loveDate.minutes; } catch { }
            try { document.getElementById('love-S-num').innerHTML = loveDate.seconds; } catch { }

        }, loveDate.show_delay);
        console.info("%c*loveDate.Run(): 时间展示已开始运行！", "color:skyblue");
    },

    Stop: () => { // 关闭展示，用途：避免占用资源
        try {
            clearInterval(loveDate.show_Fun);
            console.info("%c*loveDate.Stop(): 时间展示已关闭运行！", "color:lightgreen");
        } catch (error) {
            console.error("*cloveDate.Stop():", error);
        }
    }
};

// 手动开始
// loveDate.Run();