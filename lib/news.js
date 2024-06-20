import sql from 'better-sqlite3'

const db = sql('data.db')

export function getAllNews() {
    return new Promise((resolve, reject) => {
        const results = db.prepare('SELECT * FROM news').all()
        resolve(results)
    })
}

export function getNewsItemById(id) {
    return new Promise((resolve, reject) => {
        const news = db.prepare('SELECT * FROM news').all()
        const results = news.filter(
            (news) => news.id === +id
        );
        resolve(results[0])
    }) 
}

export function getLatestNews() {
    return new Promise((resolve, reject) => {
        const news = db.prepare('SELECT * FROM news').all()
        const results = news.slice(0, 3);
        resolve(results)
    })
}

export function getAvailableNewsYears() {
    return new Promise((resolve, reject) => {
        const news = db.prepare('SELECT * FROM news').all()
        const results = news.reduce((years, news) => {
            const year = new Date(news.date).getFullYear();
            if (!years.includes(year)) {
              years.push(year);
            }
            return years;
        }, []).sort((a, b) => b - a);
        resolve(results)
    })
}

export function getAvailableNewsMonths(year) {
    return new Promise((resolve, reject) => {
        const news = db.prepare('SELECT * FROM news').all()
        const results = news.reduce((months, news) => {
            const newsYear = new Date(news.date).getFullYear();
            if (newsYear === +year) {
              const month = new Date(news.date).getMonth();
              if (!months.includes(month)) {
                months.push(month + 1);
              }
            }
            return months;
          }, []).sort((a, b) => b - a);
          resolve(results)
    })
}

export function getNewsForYear(year) {
    return new Promise((resolve, reject) => {
        const news = db.prepare('SELECT * FROM news').all()
        const results = news.filter(
            (news) => new Date(news.date).getFullYear() === +year
        );
        resolve(results)
    }) 
}

export function getNewsForYearAndMonth(year, month) {
    return new Promise((resolve, reject) => {
        const news = db.prepare('SELECT * FROM news').all()
        const results = news.filter((news) => {
            const newsYear = new Date(news.date).getFullYear();
            const newsMonth = new Date(news.date).getMonth() + 1;
            return newsYear === +year && newsMonth === +month;
        });
        resolve(results)
    })
}