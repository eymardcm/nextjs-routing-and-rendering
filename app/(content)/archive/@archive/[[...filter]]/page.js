import NewsList from "@/components/news-list/news-list";
import Link from "next/link";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";

export default async function FilteredNewsPage({params}) {
    const filter = params.filter
    const selectedYear = filter?.[0]
    const selectedMonth = filter?.[1]

    let news;
    let links = await getAvailableNewsYears()
    const availableNewsYears = links
    const availableNewsMonths = await getAvailableNewsMonths(selectedYear)

    if (selectedYear && !selectedMonth) {
        news = await getNewsForYear(selectedYear)
        links = await getAvailableNewsMonths(selectedYear)
    }

    if (selectedYear && selectedMonth) {
        news = await getNewsForYearAndMonth(selectedYear, selectedMonth)
        links = []
    }

    let newsContent = <p>No news found for the selected period.</p>

    if (news && news.length > 0) {
        newsContent = <NewsList news={news}/>
    }

    if ((selectedYear && !availableNewsYears.includes(+selectedYear)) 
            || (selectedMonth && !availableNewsMonths.includes(+selectedMonth))) {
        throw new Error('Invalid filter')
    }

    return (
        <>
            <header id="archive-header">
                <nav>
                    <ul>
                        {links.map((link) => {
                            const href = selectedYear ? `/archive/${selectedYear}/${link}` :
                                `/archive/${link}`
                            return (
                                <li key={link}>
                                    <Link href={href}>{link}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </header>
            {newsContent}
        </>
    )
}