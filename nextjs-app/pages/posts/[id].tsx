import { getAllPostIds, getPostData } from '@/lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
  
  interface postDataProps {
    postData: {
      title: string;
      contentHtml: string;
      date: string;
    }
  }
  const Post = ({ postData }: postDataProps) => {
    return (
      <div>
        <div>
          <title>{postData.title}</title>
        </div>
        <article>
          <h1>{postData.title}</h1>
          <div>{postData.date}</div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </div>
    );
  };
  
  export default Post

  export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false // getStaticPaths로 리턴되지 않는 것은 모두 404page
    }
  }

  export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id as string);

    return {
      props: {
        postData
      }
    }
  }