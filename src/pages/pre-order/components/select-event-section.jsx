import React from 'react';
import TableBlock from './table-block';

function SelectEventSection() {
    return (
        <section className="select-event-section">
            <div className="container-fluid wrapper1">
                <div className="col-12">
                    <h2 className="text-center c-black fs40 mb-3 f-omnesMedium">
                        Select event to Pre-order
                    </h2>
                    <p className="text-center c-black f-myriadprolight fs21 mb-60">
                        Your upcoming events
                    </p>
                    <div className="table-block-pre-order">
                        <table className="select-table">
                            <tbody>
                                <TableBlock />
                                <TableBlock />
                                <TableBlock />
                                <TableBlock />
                                <TableBlock />
                                <TableBlock />
                                <TableBlock />
                                <TableBlock />
                                <TableBlock />
                                <TableBlock />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SelectEventSection;
