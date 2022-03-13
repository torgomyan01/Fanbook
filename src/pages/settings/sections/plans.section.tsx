import React, { useEffect, useState } from 'react';
import 'assets/css/publisher-plans.page.css';
import PlanBlocks from '../componstnts/plan-blocks';
import { keyGenerator, plansKey } from 'utils/helpers';
import { useSelector } from 'react-redux';

const PlansSection = () => {
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const AllPlans = useSelector((state: IAuth) => state.sign.AllPlans);

    console.log(AllPlans);
    const [SortingPlans, setSortingPlans] = useState<{
        basic: IPlans | undefined;
        pro: IPlans | undefined;
        agency: IPlans | undefined;
    } | null>(null);

    const [PublisherPlans, setPublisherPlans] = useState<any>([]);

    useEffect(() => {
        if (AllPlans) {
            setSortingPlans({
                basic: AllPlans.find(
                    (plan: IPlans) => plan.plan === plansKey.basic
                ),
                pro: AllPlans.find(
                    (plan: IPlans) => plan.plan === plansKey.pro
                ),
                agency: AllPlans.find(
                    (plan: IPlans) => plan.plan === plansKey.agency
                )
            });
        }
    }, [AllPlans, userInfo]);

    useEffect(() => {
        if (AllPlans) {
            setPublisherPlans([
                {
                    status: 'FREE',
                    name: 'Basic',
                    description: '',
                    iconColorClass: 'green-light',
                    plans: [
                        `${SortingPlans?.basic?.options.events.limit} total events`,
                        `${SortingPlans?.basic?.options.books.perEvent} book per event`,
                        `${SortingPlans?.basic?.options.books.sizes} book size available - maximum of ${SortingPlans?.basic?.options.books.maxPages} pages`,
                        'Hardcover - retail price $39.99',
                        `${SortingPlans?.basic?.options.posters.limit} poster template for sale - ${SortingPlans?.basic?.options.posters.sizes} only`,
                        `${
                            SortingPlans?.basic &&
                            SortingPlans?.basic.options.totalPhotoMegabytes /
                                1024
                        } GB of photo upload`,
                        `We get ${SortingPlans?.basic?.options.servicePercent}% of sales’ revenue`
                    ],
                    buttonName:
                        userInfo?.plan === plansKey.basic
                            ? 'This is your current plan'
                            : 'Downgrade',
                    price: 'FREE',
                    paid: '',
                    planActiveTill:
                        userInfo?.plan === plansKey.basic
                            ? userInfo?.planActiveTill
                            : '',
                    buttonDisabled: userInfo?.plan === plansKey.basic
                },
                {
                    status: `${SortingPlans?.pro?.prices[0].value || ''}/m`,
                    name: 'Pro',
                    description: '',
                    iconColorClass: 'blue',
                    plans: [
                        `${SortingPlans?.pro?.options.events.yearly} events per year`,
                        `${SortingPlans?.pro?.options.books.perEvent} books per event`,
                        'Hardcover - retail price $39.99',
                        'Digital downloads for sale',
                        `${
                            SortingPlans?.pro &&
                            SortingPlans?.pro.options.totalPhotoMegabytes / 1024
                        }GB of photo upload`,
                        'Upgraded & additional templates',
                        `We get ${SortingPlans?.pro?.options.servicePercent}% of everything sold`
                    ],
                    buttonName:
                        userInfo?.plan === plansKey.agency
                            ? 'Downgrade'
                            : userInfo?.plan === plansKey.pro
                            ? 'This is your current plan'
                            : 'Upgrade',

                    price: `${SortingPlans?.pro?.prices[1].value || ''}/year`,
                    paid: '',
                    planActiveTill:
                        userInfo?.plan === plansKey.pro
                            ? userInfo?.planActiveTill
                            : '',
                    buttonDisabled: userInfo?.plan === plansKey.pro
                },
                {
                    status: `${SortingPlans?.agency?.prices[0].value || ''}/m`,
                    name: 'Agency',
                    description: '',
                    iconColorClass: 'blue-dark',
                    plans: [
                        'Unlimited events',
                        `${SortingPlans?.agency?.options.books.perEvent} books per event`,
                        'Set prices for your books',
                        `Up to ${SortingPlans?.agency?.options.books.maxPages} page books`,
                        'Digital downloads for sale',
                        'Upgraded & additional templates',
                        `We get ${SortingPlans?.agency?.options.servicePercent}% of everything sold`
                    ],
                    buttonName:
                        userInfo?.plan === plansKey.agency
                            ? 'This is your current plan'
                            : 'Upgrade',
                    price: `${
                        SortingPlans?.agency?.prices[1].value || ''
                    }/year`,
                    paid: '',
                    planActiveTill:
                        userInfo?.plan === plansKey.agency
                            ? userInfo?.planActiveTill
                            : '',
                    buttonDisabled: userInfo?.plan === plansKey.agency
                }
            ]);
        }
    }, [SortingPlans]);

    return (
        <div id="plans" className="tab-pane plans-block fade active show">
            <h2 className="plans-title font-bold">Publisher Plans</h2>
            <div className="row">
                {PublisherPlans.map((plan: any) => (
                    <PlanBlocks key={keyGenerator(20)} plan={plan} />
                ))}
            </div>
        </div>
    );
};

export default PlansSection;
