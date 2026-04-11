import Layout from "./home-layout";


export function Home({ childeren }: { childeren: React.ReactNode }) {
  return (
    <Layout >
      {childeren}
    </Layout>
  )
}
