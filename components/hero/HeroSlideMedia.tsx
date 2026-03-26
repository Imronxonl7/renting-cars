/* eslint-disable @next/next/no-img-element */
import { Cars } from '@/types/Cars'

const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null

  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch) {
    const id = shortMatch[1]
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=0`
  }

  const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (longMatch) {
    const id = longMatch[1]
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=0`
  }

  return null
}

const HeroSlideMedia = ({ car }: { car: Cars }) => {
  const videoUrl = car.videos?.[0]
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null

  if (embedUrl) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={embedUrl}
          className="pointer-events-none absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.35] sm:scale-[1.2] xl:scale-[1.08]"
          allow="autoplay; encrypted-media"
          title={car.model}
        />
      </div>
    )
  }

  const imageUrl = car.images?.[0]
  if (imageUrl) {
    return <img src={imageUrl} alt={car.model} className="absolute inset-0 h-100 w-full object-cover" />
  }

  return <div className="absolute inset-0 bg-zinc-900" />
}

export default HeroSlideMedia
