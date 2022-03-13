import React from 'react';
import { keyGenerator } from 'utils/helpers';
import LoadingAdded from './loadingAdded';
import AddedEventBlock from './added-event-block';

interface IThisProps {
    loading: boolean;
    events: IEvent[];
}

const AddedSection = ({ loading, events }: IThisProps) => {
    return (
        <section className="added-section">
            <div className="row">
                <div className="col-12">
                    <h2 className="added-title">Recently Added Events</h2>
                </div>
                {loading ? (
                    <>
                        <LoadingAdded />
                        <LoadingAdded />
                        <LoadingAdded />
                    </>
                ) : (
                    events.map((event) => {
                        return (
                            <AddedEventBlock
                                key={keyGenerator(30)}
                                event={event}
                            />
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default AddedSection;
