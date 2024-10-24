import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
const FileUploader = () => {
    const [fileUrl, setFileUrl] = useState('')
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div {...getRootProps()}>
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
                        <h3> SVG, PNG, JPG</h3>
                    </div>)
            }
        </div>
    )
}

export default FileUploader
