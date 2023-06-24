
export default function Success(text: string, title: string) {
  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
        <p className="font-bold">{title}</p>
        <p>{text}</p>
    </div>
  )
}
