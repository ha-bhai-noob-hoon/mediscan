"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Database, icons, LucideLoader2, MoveUp, RefreshCcw } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

const VectorDBpage = (props: Props) => {
  const [isUploading, setisUploading] = useState(false); 
  const [indexName, setIndexname] = useState("");

  return (
    <main className='flex flex-col items-center p-24'>
        <Card>
            <CardHeader>
                <CardTitle>Update Knowledge Base</CardTitle>
                <CardDescription>Add new documents to your vector DB</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='col-span-2 grid gap-4 border rounded-lg p-6'>
                        <div className='gap-4 relative'>
                            <Button className='absolute -right-4 -top-4' variant={"ghost"} size={"icon"}>
                                <RefreshCcw />
                            </Button>
                            <Label>Files List</Label>
                            <Textarea readOnly className='min-h-24 resize-none border p-3 shadow-none disabled:cursor-default focus-visibilty:ring-0 text-sm text-muted'>

                            </Textarea>
                        </div>
                        <div className='grid grid-cols-2 gap4'>
                            <div className='grid gap-2'>
                                <Label>
                                    Index Name
                                </Label>
                                <Input placeholder='index name' disabled={isUploading} className='disabled:cursor-default'/>
                            </div>
                            <div className='grid gap-2'>
                                <Label>
                                    Namespace
                                </Label>
                                <Input placeholder='namespace'/>
                            </div>
                        </div>
                    </div>
                    <Button variant={"outline"} className='w-full h-full' disabled={isUploading}>
                        <span className='flex flex-row'>
                        <Database size={50} />
                        <MoveUp className='stroke-[#D90013]' />
                        </span>
                    </Button>
                </div>
                {isUploading && <div className='mt-4'>
                    <Label>File Name: </Label>
                    <div className='flex flex-row items-center gap-4'>
                        <Progress value={80}/>
                        <LucideLoader2 className='stroke-[#D90013] animate-spin'/>
                    </div>
                </div>}
            </CardContent>
        </Card>
    </main>
  )
}

export default VectorDBpage
