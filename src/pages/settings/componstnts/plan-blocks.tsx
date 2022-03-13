import React from 'react';
import { keyGenerator, plansKey, setMessageUser } from 'utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { modalUpgradeUser } from 'redux/modals';
import { CancelPlanUser } from 'api/all-apis';
import { UM } from 'utils/user-messages';
import { setUser } from 'redux/auth.slice';
import moment from 'moment';

interface IThisProps {
    plan: {
        status: string;
        name: string;
        description: string;
        iconColorClass: string;
        plans: string[];
        buttonName: string;
        price: string;
        paid: string;
        planActiveTill: string;
        buttonDisabled: boolean;
    };
}

function PlanBlocks({ plan }: IThisProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const AllPlans = useSelector((state: IAuth) => state.sign.AllPlans);

    function openModalUpgrade() {
        if (plan.name.toLowerCase() === plansKey.basic) {
            dispatch(setMessageUser(UM.P_W));
            CancelPlanUser()
                .then((res) => {
                    const _userInfo = { ...userInfo };
                    _userInfo.plan = plansKey.basic;
                    dispatch(
                        setUser({
                            profile: _userInfo
                        })
                    );
                    dispatch(setMessageUser(UM.PLAN_CANCELED));
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            dispatch(
                modalUpgradeUser({
                    openClose: true,
                    plan: AllPlans.find(
                        (_plan: IPlans) =>
                            _plan.plan === plan.name.toLowerCase()
                    )
                })
            );
        }
    }
    return (
        <div className="col-xl-4 col-lg-6 col-md-12 mb-3">
            <div className="plan-block">
                <div>
                    <p className={`status bgc-${plan.iconColorClass}`}>
                        {plan.status}
                    </p>
                    <p className="title-plans mt-3">{plan.name}</p>
                    <p className="description-plans">{plan.description}</p>
                    {plan.plans.map((text: string) => {
                        return (
                            <p key={keyGenerator(20)} className="info-text">
                                <i
                                    className={`fas fa-check mr-2 c-${plan.iconColorClass}`}
                                />
                                {text}
                            </p>
                        );
                    })}
                </div>

                <div className="bottom-block">
                    {plan.planActiveTill && (
                        <p>
                            Your next payment will be{' '}
                            <b>{moment(plan.planActiveTill).format('lll')}</b>{' '}
                            You can cancel your subscription any time.
                        </p>
                    )}
                    <p className="type">
                        {plan.price}
                        <span className=" ml-1 fs14">{plan.paid}</span>
                    </p>
                    <button
                        className="btn mt-4 bgc-blue-dark"
                        disabled={plan.buttonDisabled}
                        onClick={openModalUpgrade}>
                        {plan.buttonName}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlanBlocks;
