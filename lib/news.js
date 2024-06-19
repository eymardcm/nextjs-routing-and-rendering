import { DUMMY_NEWS } from '@/dummy-news';

export function getAllNews() {
    return new Promise((resolve, reject) => {
        resolve(DUMMY_NEWS)
    })
}

export function getLatestNews() {
    return new Promise((resolve, reject) => {
        const results = DUMMY_NEWS.slice(0, 3);
        resolve(results)
    })
  
}

export function getAvailableNewsYears() {
    return new Promise((resolve, reject) => {
        const results = DUMMY_NEWS.reduce((years, news) => {
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
        const results = DUMMY_NEWS.reduce((months, news) => {
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
        const results = DUMMY_NEWS.filter(
            (news) => new Date(news.date).getFullYear() === +year
        );
        resolve(results)
    }) 
}

export function getNewsForYearAndMonth(year, month) {
    return new Promise((resolve, reject) => {
        const results = DUMMY_NEWS.filter((news) => {
            const newsYear = new Date(news.date).getFullYear();
            const newsMonth = new Date(news.date).getMonth() + 1;
            return newsYear === +year && newsMonth === +month;
          });
          resolve(results)
    })
}