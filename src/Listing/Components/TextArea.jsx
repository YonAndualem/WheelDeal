import React from 'react'
import { Textarea } from "@/components/ui/textarea"

function TextArea({ item }) {
    return (
        <div>
            <Textarea name={item.name} />
        </div>
    )
}

export default TextArea