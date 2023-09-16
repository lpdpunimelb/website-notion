import * as React from "react";
import { ExtendedRecordMap } from "notion-types";
import * as notion from "../lib/notion";
import { NotionPage } from "../components/NotionPage";
import {
  previewImagesEnabled,
  rootDomain,
  rootNotionPageId,
} from "../lib/config";
import Head from "next/head";

export const getStaticProps = async (context) => {
  const pageId = context.params.pageId as string;
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <>
      <Head>
        <title>{process.env.websiteTitle}</title>
      </Head>
      <NotionPage
        recordMap={recordMap}
        rootDomain={rootDomain}
        rootPageId={rootNotionPageId}
        previewImagesEnabled={previewImagesEnabled}
      />
    </>
  );
}
