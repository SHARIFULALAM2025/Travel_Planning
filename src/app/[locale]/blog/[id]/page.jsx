import SingleBlog from '@/Components/SingleBlog/SingleBlog'
import { useTranslations } from 'next-intl'
import React, { use } from 'react'

const SingleBlogDetails = ({ params }) => {
  const resolveParams = use(params)
  const id =resolveParams.id

   const t = useTranslations('blogsData')
  const blogs = t.raw("items") || []
  const currentBlog=blogs.find(item=>item.id.toString()===id)

  return (
    <div>
      <SingleBlog currentBlog={currentBlog}></SingleBlog>
    </div>
  )
}

export default SingleBlogDetails
