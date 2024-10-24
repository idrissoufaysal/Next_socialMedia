import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'

type FileUploaderProps={
    fieldChange:(FILES:File[])=>void;
    mediaUrl:string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {

    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState('');

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFile(acceptedFiles);
            fieldChange(acceptedFiles);
            setFileUrl(URL.createObjectURL(acceptedFiles[0]))
        }, [file]
    )

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg', '.svg']
        }
    })


    return (
        <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
            <input {...getInputProps()} />
            {
                fileUrl ?
                    (<div>

                    </div>) :
                    (<div className='file_uploader-box bg-dark-3'>
                        <Image
                            src="/assets/icons/file-upload.svg"
                            alt='file'
                            height={95}
                            width={70}
                        />
                        <h3 className='base-medium text-light-2 mb-2 mt-6'>
                            Drag photo here
                        </h3>

                        <p className='text-light-4 mb-6'> SVG, PNG, JPG</p>
                        <Button className='shad-button_dark_4'>
                            Select from computer
                        </Button>
                    </div>)
            }
        </div>
    )
}

export default FileUploader
