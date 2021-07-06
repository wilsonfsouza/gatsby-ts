import * as React from "react"
import { Link, PageProps, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

type Edge = {
  node: {
    html: React.ReactNode;
    frontmatter: {
      date: string;
      path: string;
      title: string;
    }
  }
}

interface AllMarkdownRemark {
  edges: Edge[];
}

interface PageQueryData {
  allMarkdownRemark: AllMarkdownRemark;
}

interface IndexPageProps extends PageProps {
  data: PageQueryData;
}

const IndexPage = ({ data }: IndexPageProps) => {
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout>
      <Seo title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {edges.map(edge => {
          const { title, path } = edge.node.frontmatter;
          return (
            <Link to={path} key={title}>
              {title}
            </Link>
          )
        })}
      </div>
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
      <p>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </p>
    </Layout>
  )
}

export const pageQuery = graphql`
 {
    allMarkdownRemark {
        edges {
            node {
            html
            frontmatter {
                date(formatString: "MM/DD")
                path
                title
            }
            }
        }
    }
  }
`;

export default IndexPage
