import * as React from "react"
import { Link, PageProps, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

type MarkdownRemark = {
    html: string;
    frontmatter: {
        date: string;
        path: string;
        title: string;
    }
}

interface PageQueryData {
    markdownRemark: MarkdownRemark;
}

interface PostProps extends PageProps {
    data: PageQueryData;
}

const Post = ({ data }: PostProps) => {
    const { html, frontmatter } = data.markdownRemark;
    const { date, title } = frontmatter;

    return (
        <Layout>
            <Seo title={title} />
            <h1>{title}</h1>
            <p>{date}</p>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    )
}

export const pageQuery = graphql`
    query PostPage($path: String!) {
        markdownRemark(frontmatter: {path: {eq: $path }}) {
            html
            frontmatter {
              date
              path
              title
            }
          }
    }
`;

export default Post
