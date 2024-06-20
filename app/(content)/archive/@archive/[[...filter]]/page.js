import NewsList from "@/components/news-list/news-list";
import Link from "next/link";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import { Suspense } from "react";

async function FilterHeader({selectedYear, selectedMonth}) {
    let availableYears = await getAvailableNewsYears()
    let links = availableYears

    const availableNewsYears = links
    const availableNewsMonths = await getAvailableNewsMonths(selectedYear)

    if (selectedYear && !selectedMonth) {
        links = await getAvailableNewsMonths(selectedYear)
    }

    if (selectedYear && selectedMonth) {
        links = []
    }

    if ((selectedYear && !availableNewsYears.includes(+selectedYear)) 
        || (selectedMonth && !availableNewsMonths.includes(+selectedMonth))) {
    
        throw new Error('Invalid filter')
    }

    return (
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
    )
}

async function FilteredNews({selectedYear, selectedMonth}) {
    let news

    if (selectedYear && !selectedMonth) {
        news = await getNewsForYear(selectedYear)
    } else if (selectedYear && selectedMonth) {
        news = await getNewsForYearAndMonth(selectedYear, selectedMonth)
    }

    let newsContent = <p>No news found for the selected period.</p>

    if (news && news.length > 0) {
        newsContent = <NewsList news={news}/>
    }

    return newsContent
}

export default async function FilteredNewsPage({params}) {
    const filter = params.filter
    const selectedYear = filter?.[0]
    const selectedMonth = filter?.[1]

    return (
        <>
            <Suspense fallback={<p>Loading header...</p>}>
                <FilterHeader selectedYear={selectedYear} selectedMonth={selectedMonth} />
            </Suspense>
            <Suspense fallback={<p>Loading news...</p>}>
                <FilteredNews selectedYear={selectedYear} selectedMonth={selectedMonth} />
            </Suspense> 
        </>
    )
}