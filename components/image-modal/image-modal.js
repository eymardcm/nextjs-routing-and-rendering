"use client"
import { useRouter } from "next/navigation"

export default function ImageModal({item}) {
    const router = useRouter()

    return (
        <>
            <div className="modal-backdrop" onClick={router.back}/>
            <dialog className="modal" open>
                <div className="fullscreen-image">
                    <img src={`/images/news/${item.image}`} alt={item.title} />
                </div>
            </dialog>
    </>
    )
}