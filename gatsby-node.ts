/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
import path from "path";
import { CreatePagesArgs } from "gatsby";

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

interface SiteProps {
    allMarkdownRemark: AllMarkdownRemark;
}

exports.createPages = async ({ graphql, actions }: CreatePagesArgs) => {
    const post = path.resolve('src/templates/post.tsx');

    const { createPage } = actions;

    let result = await graphql<SiteProps>(`
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
    `);

    if (result.errors) {
        throw new Error('GraphQl error.')
    }

    if (!result.data) {
        throw new Error('No data from graphQL query.')
    }

    const { edges } = result.data.allMarkdownRemark;

    edges.forEach(edge => {
        const { frontmatter } = edge.node;
        createPage({
            path: frontmatter.path,
            component: post,
            context: {
                path: frontmatter.path
            }
        })
    })


    // return new Promise((resolve, reject) => {
    //     const post = path.resolve('src/templates/post.tsx');

    // })
}