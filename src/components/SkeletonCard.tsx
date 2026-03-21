function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-[180px] sm:w-[calc((100%-4px)/2)] md:w-[calc((100%-8px)/3)] min-[800px]:w-[calc((100%-12px)/4)] 4xl:w-[calc((100%-16px)/5)] min-[1280px]:w-[calc((100%-20px)/6)]">
      <div className="aspect-video rounded-sm bg-[#2f2f2f] animate-pulse" />
    </div>
  )
}

export default SkeletonCard