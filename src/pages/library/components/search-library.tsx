import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class LibrarySearch extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            LibraryArray: [],
            LibName: []
        };
        this.addLibrary = this.addLibrary.bind(this);
        this.RemoveSearchLibrary = this.RemoveSearchLibrary.bind(this);
    }

    RemoveSearchLibrary(e: any) {
        // const index = Number(e.target.getAttribute('data-number'));
        // this.state.LibraryArray.splice(index, 1);
        // this.state.LibName.splice(index, 1);
        // const arrayLength = this.state.LibraryArray.length;
        //
        // // eslint-disable-next-line react/no-direct-mutation-state
        // this.state.LibraryArray = [];
        // for (let i = 0; i < arrayLength; i++) {
        //     this.state.LibraryArray.push(
        //         <span>
        //             {this.state.LibName[i]}
        //             <span
        //                 className="remove-library-s-filter"
        //                 ref={(eRf) => {
        //                     this.eRf = eRf;
        //                 }}
        //                 onClick={this.RemoveSearchLibrary}
        //                 data-number={this.state.LibraryArray.length}>
        //                 X
        //             </span>
        //         </span>
        //     );
        // }
        // this.setState({
        //     LibraryArray: this.state.LibraryArray
        // });
    }

    addLibrary(e: any) {
        e.preventDefault();
        // this.textInput.value !== ''
        //     ? this.state.LibraryArray.push(
        //           <span>
        //               {this.textInput.value}
        //               <span
        //                   className="remove-library-s-filter"
        //                   ref={(eRf) => {
        //                       this.eRf = eRf;
        //                   }}
        //                   onClick={this.RemoveSearchLibrary}
        //                   data-number={this.state.LibraryArray.length}>
        //                   X
        //               </span>
        //           </span>
        //       )
        //     : alert('No No No :)');
        // this.state.LibName.push(this.textInput.value);
        // this.setState({
        //     LibraryArray: this.state.LibraryArray
        // });
        // this.textInput.value = '';
    }

    render() {
        return (
            <div>
                {/* className="main-form w-100 pt-5 pb-5" */}
                <div className="container-fluid wrapper1">
                    <div className="row">
                        <div className="col-12 d-lg-flex">
                            {/*<div className="search-box d-flex justify-content-start align-items-center mr-lg-4 mr-0 mb-lg-0 mb-3 w-100 position-relative">*/}
                            {/*    <div className="library-add-block">*/}
                            {/*        /!*{this.state.LibraryArray}*!/*/}
                            {/*    </div>*/}
                            {/*    <form*/}
                            {/*        onSubmit={this.addLibrary}*/}
                            {/*        className="input-add-library">*/}
                            {/*        <input*/}
                            {/*            type="text"*/}
                            {/*            // ref={(element: any) =>*/}
                            {/*            //     (this.textInput = element)*/}
                            {/*            // }*/}
                            {/*            placeholder="Library Name"*/}
                            {/*            className="input-add-library"*/}
                            {/*        />*/}
                            {/*    </form>*/}
                            {/*    <div className="input-close_icon position-absolute">*/}
                            {/*        <FontAwesomeIcon*/}
                            {/*            icon={faSearch}*/}
                            {/*            className="mr-2"*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LibrarySearch;
