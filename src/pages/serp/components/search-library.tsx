import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

function LibrarySearch() {
    const { eventID }: { eventID: string } = useParams();

    const URL_LIBRARY = `/library/${eventID}`;
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         LibraryArray: [],
    //         LibName: [],
    //
    //     }
    //     this.addLibrary = this.addLibrary.bind(this);
    //     this.RemoveSearchLibrary = this.RemoveSearchLibrary.bind(this);
    // }

    // RemoveSearchLibrary(e) {
    //     let index = Number(e.target.getAttribute('data-number'));
    //     this.state.LibraryArray.splice(index, 1);
    //     this.state.LibName.splice(index, 1);
    //     let arrayLength = this.state.LibraryArray.length;
    //
    //     // eslint-disable-next-line react/no-direct-mutation-state
    //     this.state.LibraryArray = [];
    //     for (let i = 0; i < arrayLength; i++){
    //         this.state.LibraryArray.push(
    //             <span>
    //             {this.state.LibName[i]}
    //                 <span className="remove-library-s-filter"
    //                       ref={(eRf)=> {this.eRf = eRf}}
    //                       onClick={this.RemoveSearchLibrary}
    //                       data-number={this.state.LibraryArray.length}>
    //                 X
    //             </span>
    //         </span>
    //         )
    //     }
    //     this.setState({
    //         LibraryArray: this.state.LibraryArray
    //     })
    // }

    // addLibrary(e) {
    //     e.preventDefault();
    //     this.textInput.value !== ''
    //     ?
    //     this.state.LibraryArray.push(
    //         <span>
    //             {this.textInput.value}
    //             <span className="remove-library-s-filter"
    //                   ref={(eRf)=> {this.eRf = eRf}}
    //                   onClick={this.RemoveSearchLibrary}
    //                   data-number={this.state.LibraryArray.length}>
    //                 X
    //             </span>
    //         </span>
    //     ): alert('No No No :)')
    //     this.state.LibName.push(this.textInput.value)
    //     this.setState({
    //         LibraryArray: this.state.LibraryArray
    //     })
    //     this.textInput.value = '';
    // }

    return (
        <div
            className="main-form w-100 pt-4 pb-4 border-bottom"
            style={{ background: '#fff' }}>
            <div className="row">
                <div className="col-12 d-lg-flex align-items-center justify-content-start pl-5">
                    <Link
                        to={URL_LIBRARY}
                        className="back-txt c-black fs19 mr-5 d-inline-block mb-md-0 mb-3 text-center back-link">
                        <FontAwesomeIcon icon={faArrowLeft} className="c-red" />
                        <span className="b-bottom ml-2">Back to Library</span>
                    </Link>
                    <div className="search-box d-flex justify-content-start align-items-center mr-lg-4 mr-0 mb-lg-0 mb-3 w-100 position-relative">
                        <div className="library-add-block">
                            {/*{this.state.LibraryArray}*/}
                        </div>
                        <form
                            // onSubmit={this.addLibrary}
                            className="input-add-library">
                            <input
                                type="text"
                                // ref={(element) => (this.textInput = element)}
                                placeholder="Library Name"
                                className="input-add-library"
                            />
                        </form>
                        <div className="input-close_icon position-absolute">
                            <FontAwesomeIcon icon={faSearch} className="mr-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LibrarySearch;
