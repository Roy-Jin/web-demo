window.addEventListener('DOMContentLoaded', () => {
  for (const type of ['chrome', 'node', 'electron']) {
    console.info(`${type}-版本号：[ ${process.versions[type]} ]`)
  }
}) 