import React from 'react'
import MWFileReader from './MWFileReader'
import MWFileUpload from './MWFileUpload'
function FileModule({ mode, fileQueue, setFileQueue }) {
    return (
        <div>
            {!mode && <MWFileReader fileQueue={fileQueue} />}
            {mode && <MWFileUpload fileQueue={fileQueue} setFileQueue={setFileQueue} />}
        </div>
    )
}

export default FileModule
