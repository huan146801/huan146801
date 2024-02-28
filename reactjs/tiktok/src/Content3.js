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


const lessons = [
    {
        id: 1,
        name: 'ReactJS la gi? Tai sao nen hoc ReactJs?'
    },
    {
        id: 2,
        name: 'SPA/MPA la gi?'
    },
    {
        id: 3,
        name: 'Arrow function'
    }
]

function Content3 () {
    const[lessonId, setLessonId] = useState(1)

    useEffect(() => {
        const handleComment = (e) => {
            console.log(e.detail)
        }
        window.addEventListener(`lesson-${lessonId}`, handleComment)
        
        return () => {
            window.removeEventListener(`lesson-${lessonId}`, handleComment)
        }
    },[lessonId])

    return (
        <div>
            <ul>
                {lessons.map(lesson => (   
                    <li 
                        key={lesson.id}
                        style={{
                            color: lessonId === lesson.id ?
                                'red' :
                                '#333'
                        }}
                        onClick={() => setLessonId(lesson.id)}
                    >
                        {lesson.name}   
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Content3