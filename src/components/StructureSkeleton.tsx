export default function StructureSkeleton() {

    return <div role="status" class="max-w-sm animate-pulse m-4">
    {Array.from({ length: 10 }).map((_) => {
      return <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
    })}
    <span class="sr-only">Loading...</span>
  </div>
  }
