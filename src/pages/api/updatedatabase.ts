"use client"
import { updateVectorDB } from "@/../utils";
import { Pinecone } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { NextApiRequest, NextApiResponse } from "next";
//import path from "path";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { indexname, namespace } = JSON.parse(req.body)
        console.log("awaiting handle upload");
        await handleUpload(indexname, namespace, res);
    }

}

async function handleUpload(indexname: string, namespace: string, res: NextApiResponse) {
    console.log("handle uplaod function called");
    const loader = new DirectoryLoader('./documents',{
        '.pdf': (path: string) => new PDFLoader(path, {
            splitPages: false
        }),
        //'.txt': (path: string) => new TextLoader(path)
    });
    const docs = await loader.load();
    console.log("loader is ready");
    const client = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!
    })
    await updateVectorDB(client, indexname, namespace, docs, (filename: any, totalChunks: any, chunksUpserted: any, isComplete: any) => {
        console.log(`${filename}-${totalChunks}-${chunksUpserted}-${isComplete}`)
        if (!isComplete) {
            res.write(
                JSON.stringify({
                    filename,
                    totalChunks,
                    chunksUpserted,
                    isComplete
                })
            )
        }else{
            res.end();
        }
    })
}