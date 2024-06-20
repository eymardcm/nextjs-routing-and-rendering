import ImageModal from "@/components/image-modal/image-modal"
import { getNewsItemById } from "@/lib/news"
import { notFound } from "next/navigation"

export default async function InterceptedImagePage({params}) {

    const item = await getNewsItemById(params.id)

    if (!item) {
        notFound()
    }

    return (
        <ImageModal item={item} />
    )
}