import { useEffect, useState} from 'react'

// 1. useEffect(callback): - goi callback moi khi component re-render
//                          -goi callback sau khi component them element vao DOM 
// 2. useEffect(callback, []): chi goi callback 1 lan sau khi component mounted
// 3. useEffect(callback. [deps]):
// -Callback se duoc goi lai moi khi deps thay doi

//-------------
//1. Trong ca 3 TH, callback luon duoc goi sau khi component mounted
//2. Cleanup function luon duoc goi truoc khi component unmounted

const tabs = ['posts','comments','albums']

function Content() {
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const[type, setType] = useState('posts')
    const [goToTop,  setGoToTop] = useState(false)
    
    console.log(type)
    useEffect(() =>{
        fetch(`https://jsonplaceholder.typicode.com/${type}`) 
            .then(res => res.json())
            .then(posts => {
                setPosts(posts)
            })
    }, [type])
    
    useEffect(() => {

        const handleScroll = () => {
            setGoToTop(window.scrollY>=200)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {  //Clean up func
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div>
            {tabs.map(tab => (
                <button 
                    key ={tab}
                    style={type ===tab ? {
                        color: '#fff',
                        backgroundColor: '#333',
                    } : {}}
                    onClick={() => setType(tab)}
                >
                    {tab}
                </button>
            ))}

            <input
                value ={title}
                onChange = {e => setTitle(e.target.value)}
            />
            <ul>
                {posts.map(post => (
                    <li key ={post.id}>{post.title||post.name}</li>
                ))}
            </ul>

            {goToTop && (
                <button
                    style = {{
                        position: 'fixed',
                        right: 20,
                        bottom: 20,
                    }}
                >
                    Go to Top
                </button>
            )}
        </div>
    )
}

export default Content