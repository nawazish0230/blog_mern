import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { createPost } from '../../action/post'
import { getCategories } from '../../action/category'
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js'
import { withRouter } from 'react-router-dom';

const CreatePost = ({createPost, getCategories, categories, history}) => {
    // console.log(createPost, getCategories, categories, history)
    const [post, setPosts] = useState({
        title: '',
        content: '',
        category: '',
        file: null
    })
    const [previewUrl ,setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    
    const {title, content, category, file} = post
    useEffect(() => {
        // M.AutoInit();
        getCategories()
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }, [file])
    
    const filePickerRef = useRef()

    // const pickImageHandler = () => {
    //     filePickerRef.current.click();
    // }

    const pickedHandler = e => {
        let pickedFile;
        let fileIsValid = isValid
        if(e.target.files && e.target.files.length === 1 ){
            const pickedFile = e.target.files[0];
            // setFile(pickedFile);
            console.log(pickedFile)
            setPosts({...post, file: pickedFile})
            setIsValid(true);
            fileIsValid = true;
        }else{
            setIsValid(false)
            fileIsValid = false
        }
        // props.onInput(props.id, pickedFile, fileIsValid)
    }

    const changeHandler = (e) => {
        setPosts({...post, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(post)
        createPost({title, content, category, file}, history)
    }
    // console.log(post)
    return (
        <div className="row">
            <div className="col s9 push-s1 l4 push-l4">
            <blockquote>
            <h4>Create Posts</h4>
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
                        <option value="" disabled >Choose your option</option>
                            {
                                categories && categories.map(category => <option value=     {category.catname} key={category._id} 
                                >
                                {category.catname}
                                </option>
                                
                                )
                            }
                        </select>
                        <label>Select Category</label>
                    </div>
                    <div className="file-field col s12">
                        <div className="btn  #42a5f5 blue lighten-1">
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
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Upload one or more files" />
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
                        <button className="waves-effect waves-light btn #42a5f5 blue lighten-1">Create Post</button>
                    </p>
                </div>
                </form>
            </div>
        </div>
    )
}

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    categories: state.category.categories
})

export default withRouter(connect(mapStateToProps, {createPost, getCategories})(CreatePost)) ;
