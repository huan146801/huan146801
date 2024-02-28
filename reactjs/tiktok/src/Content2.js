import { useEffect, useState} from 'react'

// 1. useEffect(callback): - goi callback moi khi component re-render
//                          -goi callback sau khi component them element vao DOM 
// 2. useEffect(callback, []): chi goi callback 1 lan sau khi component mounted
// 3. useEffect(callback. [deps]):
// -Callback se duoc goi lai moi khi deps thay doi

//-------------
//1. Trong ca 3 TH, callback luon duoc goi sau khi component mounted
//2. Cleanup function luon duoc goi truoc khi component unmounted
//3. Cleanup function luon duoc goi truoc khi callback duoc goi(tru lan mounted)


function Content2 () {
    
    const[avatar, setAvatar] = useState()

    useEffect(()=> {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    },[avatar])
    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setAvatar(file)
    }

    return (
        <div>
            <input 
                type="file"
                onChange = {handlePreviewAvatar}
            />
            {avatar && (
                <img src={avatar.preview} alt="" width="80%" />
            )}
        </div>
    )
}

export default Content2