import { getNewsItemById } from "@/lib/news"
import { notFound } from "next/navigation"

export default async function ImagePage({params}) {
    const item = await getNewsItemById(params.id)

    if (!item) {
        notFound()
    }

    return (
        <div className="fullscreen-image">
            <img src={`/images/news/${item.image}`} alt={item.title} />
        </div>
    )
}