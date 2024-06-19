import NewsList from "@/components/news-list/news-list"
import { getLatestNews } from "@/lib/news"

export default async function LatestNewsPage() {
    const news = await getLatestNews()
    return (
        <>
            <h2>Latest News Page</h2>
            <NewsList news={news} />
        </>
        
    )
}