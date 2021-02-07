import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { editPost, getPost } from '../../action/post'
import { getCategories } from '../../action/category'
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js'

const EditPost = ({ getCategories, editPost, getPost, categories, post:{ post, loading }, history, match}) => {
    const [posts, setPosts] = useState({
        title: '',
        content: '',
        category: '',
        file: null
    })
    // console.log(posts)
    const [previewUrl ,setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    
    let postId = match.params.postId;
    // const {file} = posts
    const {title, content, category, file} = posts
    // console.log(posts)
    useEffect(() => {
        // M.AutoInit();
        getCategories()
        getPost(postId)
        console.log(posts && posts)
        setPosts({
            title: loading || !post ? '' : post.title,
            category: loading || !post ? '' : post.category,
            content: loading || !post ? '' : post.content,
            file: loading || !post ? '' : file || post.image,
        })
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }
        console.log(file && typeof(file), file)
        if(typeof(file) === 'object'){
            fileReader.readAsDataURL(file);
        }
    }, [getPost, loading, file])

    const pickedHandler = e => {
        let pickedFile;
        let fileIsValid = isValid
        if(e.target.files && e.target.files.length === 1 ){
            const pickedFile = e.target.files[0];
            // setFile(pickedFile);
            setPosts({...posts, file: pickedFile})
            setIsValid(true);
            fileIsValid = true;
        }else{
            setIsValid(false)
            fileIsValid = false
        }
        // props.onInput(props.id, pickedFile, fileIsValid)
    }
    
    // console.log(posts)
    // const {title, content, category, file} = posts

    const changeHandler = (e) => {
        setPosts({...posts, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(posts)
        editPost({title, content, category, file},postId, history)
    }

    // console.log(posts)
    return (
        <div className="row">
            <div className="col s9 push-s1 l4 push-l4">
            <blockquote>
            <h4>Edit Posts</h4>
            </blockquote>
                <form onSubmit={submitHandler} noValidate>
                <div className="row">
                    <div className="input-field col s12">
                        <input 
                            id="title" 
                            name="title" 
                            type="text" 
                            value={title}
                            className="validate" 
                            onChange={e => changeHandler(e)}
                        />
                        <label htmlFor="title">Title</label>
                        {/* <span className="helper-text" data-error="wrong" data-success="right">Helper text</span> */}
                    </div>
                    <div className="input-field col s12">
                        <select name="category" value={category} onChange={e => changeHandler(e)}>
                        {/* <option value="" disabled selected>Choose your option</option> */}
                            {
                                categories ? categories.length && categories.map(category => {
                                    return <option value={category.catname} key={category._id} 
                                >
                                    {category.catname}
                                </option>
                                }
                                ) : 'no'
                            }
                        </select>
                        <label>Select Category</label>
                    </div>
                    <div class="file-field col s12">
                        <div class="btn #42a5f5 blue lighten-1">
                            <span>File</span>
                            <input 
                                type="file" 
                                name="file"
                                // ref={filePickerRef}
                                // onClick={pickImageHandler} 
                                onChange={e => pickedHandler(e)}
                                accept=".jpg,.png,.jpeg"
                            />
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Upload one or more files" />
                        </div>
                        <div className="img-preview">
                            {previewUrl ? <img src={previewUrl} alt="preview" width="100%" height="130" /> : 'please select image' } 
                        </div>
                    </div>
                    <div className="input-field col s12">
                        <textarea 
                            id="content" 
                            name="content"
                            className="materialize-textarea" 
                            value={content}
                            onChange={e => changeHandler(e)}
                        ></textarea>
                        <label htmlFor="content">Content</label>
                    </div>
                    <p >
                        <button className="waves-effect waves-light btn #42a5f5 blue lighten-1">Edit Post</button>
                    </p>
                </div>
                </form>
            </div>
        </div>
    )
}

EditPost.propTypes = {
    getPost: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    categories: state.category.categories,
    post: state.post
})

export default connect(mapStateToProps, {getPost, getCategories, editPost})(EditPost);
