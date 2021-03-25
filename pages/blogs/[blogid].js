import {useState} from 'react'
import {db} from '../../firebase'
import {useRouter} from 'next/router'
export default function blogpage({blog,user,allComments}) {

     const [myComment,setMyComment] = useState('')
     const [allCommentsBlog,setAllComments] = useState(allComments)
     const router = useRouter()
     const { blogid } = router.query
     const makeCommet = async ()=>{
       
        await db.collection('blogs').doc(blogid).collection('comments').add({
             text:myComment,
             name:user.displayName
         })
        const commentQuery = await db.collection('blogs').doc(blogid).collection('comments').get()
        setAllComments(commentQuery.docs.map(docSnap=>docSnap.data()))

     }
    return (
        <div className="container center">
            <h2>{blog.title}</h2>
            <h5>Created On - {new Date(blog.createdAt).toDateString()}</h5>
            <img src={blog.imageUrl} alt={blog.title} />
            <p>{blog.body}</p>

            {user?
            <>
            <div className="input-field">
                <input type="text" 
                placeholder="add a comment" 
                value={myComment} 
                onChange={(e)=>setMyComment(e.target.value)}/>
            </div>
            <button className="btn #fb8c00 orange darken-1" onClick={()=>makeCommet()}>Make comment</button>
            </>
            :<h3>please login to make comments</h3>
            }
            
            <hr />
            <div className="left-align">

                {allCommentsBlog.map(item=>{
                    return <h6 key={item.name}><span>{item.name}</span> {item.text}</h6>
                })}
            </div>

            <style jsx global>
                {`
                span{
                    font-weight:500;
                }
                body{
                    color:orange
                }
                img{
                    width:100%;
                    max-width:500px;
                }
                `}
            </style>
            
        </div>
    )
}

export async function getServerSideProps({params:{blogid}}) {
     const result =  await db.collection('blogs').doc(blogid).get()
     const allCommetsSnap = await db.collection('blogs').doc(blogid).collection('comments').get()

    const allComments =  allCommetsSnap.docs.map(comDocSnap=>comDocSnap.data())
    return {
      props: {
          blog:{
              ...result.data(),
              createdAt:result.data().createdAt.toMillis()
          },
          allComments
      },
    }
  }




