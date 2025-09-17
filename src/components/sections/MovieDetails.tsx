interface MovieDetailsProps {
  id: string
}

export default function MovieDetails({ id }: MovieDetailsProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white text-xl">Movie Details for ID: {id}</p>
    </div>
  )
}