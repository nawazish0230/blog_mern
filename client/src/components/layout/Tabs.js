import React from 'react'
// import M from 'materialize-css/dist/js/materialize.min.js'
import { connect } from 'react-redux';
import { getCategories } from './../../action/category';
import { Link } from 'react-router-dom';


const TabsMain = ({categories}) => {
    // console.log(categories && categories)
    // $(document).ready(function(){
    //     $('.tabs').tabs();
    //   });
    return (
        <div className="row">
            <div className="col s12">
            <ul className="tabs tabs-fixed-width tab-demo z-depth-1 tab-spacing">
                {
                    categories && categories.length ?
                        categories.map(category => 
                            <p className="tab col l3" key={category._id}>
                                <Link to={`/${category.catname}`}className="active">
                                    {category.catname}
                                </Link>
                            </p>) 
                            : <li className="tab col l3">loading....</li>
                }
                </ul>
            </div>
        </div>

    )
}

TabsMain.propTypes = {
    // getCategories: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    categories: state.category.categories
})

export default connect(mapStateToProps, {getCategories})(TabsMain);
