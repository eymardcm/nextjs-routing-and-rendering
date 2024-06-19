import { DUMMY_NEWS } from "@/dummy-news"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function NewsDetailPage({params}) {
    const item = DUMMY_NEWS.find(i => i.id === params.id)

    if (!item) return notFound()

    return (
        <article className="news-article">
            <header>
                <Link href={`/news/${item.id}/image`}>
                    <img src={`/images/news/${item.image}`} alt={item.title} />
                </Link>
                <h1>{item.title}</h1>
                <time dateTime={item.date}>{item.date}</time>
            </header>
            <p>{item.content}</p>
        </article>
    )
}