import React,{useState} from 'react'

function FollowComponent() {
    const [IsFollow, setIsFollow] = useState(false)

    return (
        <div>
            <button type='button' name='팔로우'>{IsFollow?'팔로우취소':'팔로우'}</button>
        </div>
    )
}

export default FollowComponent
