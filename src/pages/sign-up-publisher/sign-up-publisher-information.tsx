import React, { useEffect, useState } from 'react';
import 'assets/css/sign-up-publisher.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPublisherInformation, setStep } from 'redux/become-publisher';
import {
    Checkbox,
    FormControlLabel,
    makeStyles,
    TextField,
    Typography
} from '@material-ui/core';
import { keyGenerator, setMessageUser } from 'utils/helpers';
import List from '@material-ui/core/List';
import { GetPublisherFrom } from 'api/all-apis';
import Tooltip from '@material-ui/core/Tooltip';
import AddSitesModal from './components/add-sites-modal';
import SitesList from './components/sites-list';
import ModalAddSocialSite from './components/modal-add-social-site';
import ListSocialNetworks from './components/list-social-networks';
import { SocialSiteName } from './social-sites';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { UM } from 'utils/user-messages';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
        marginTop: 20
    },
    inputs: {
        width: '100%',
        marginTop: 20
    },
    title: {
        margin: theme.spacing(4, 0, 2)
    },
    lists: {
        paddingLeft: 0
    }
}));

interface IThisProps {
    step: number;
}

export const SignUpPublisherInformation = ({ step }: IThisProps) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const publisherInfo = useSelector(
        (state: IBecomePublisher) => state.BecomePublisher.publisherProfile
    );

    const [state, setState] = useState<boolean>(false);
    const [countriesCodes, setCountriesCodes] = useState<
        { code: string; name: string }[]
    >([]);

    const [countries, setCountries] = useState<string>('');

    function handleChange() {
        setState(!state);
    }

    useEffect(() => {
        GetPublisherFrom()
            .then((res) => {
                const countries =
                    res.data.data.item.publisherProfile.countryCode;
                setCountriesCodes(countries);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [modalAddSite, setModalAddSite] = useState<boolean>(false);

    const [sitesArray, setSitesArray] = useState<string[]>([]);

    function openModal() {
        if (sitesArray.length < 5) {
            setModalAddSite(true);
        } else {
            dispatch(setMessageUser(UM.MIN_SITES_PUBLISHER));
        }
    }

    function closeModal() {
        setModalAddSite(false);
    }

    function startSaveNewSite(e: string) {
        setSitesArray((oldArray) => [...oldArray, e]);
    }

    function RemoveSite(siteName: string) {
        const _sitesArray = sitesArray.filter((e) => e !== siteName);
        setSitesArray(_sitesArray);
    }

    const [openModalSocialNetworks, setOpenModalSocialNetworks] =
        useState<boolean>(false);

    function openModalSocialNet() {
        setOpenModalSocialNetworks(true);
    }

    function closeModalAddSocialNetwork() {
        setOpenModalSocialNetworks(false);
    }

    const [socSites, setSocSites] = useState<
        { icon: any; name: string; serName: string }[]
    >([]);
    function startSaveAddSocialNetworks(siteName: string) {
        setSocSites((oldArray: any) => [...oldArray, siteName]);
    }

    function startRemove(site: any) {
        const _socSites = [...socSites];
        const newSites = _socSites.filter((st) => st.name !== site.name);
        setSocSites(newSites);
    }

    // publisher name
    const [publisherName, setPublisherName] = useState<string>(
        publisherInfo.name
    );

    function setPubName(e: any) {
        const value = e.target.value;
        setPublisherName(value);
    }

    // publisher Description
    const [publisherDescription, setPublisherDescription] =
        useState<string>('');

    function setPubDescription(e: any) {
        const value = e.target.value;
        setPublisherDescription(value);
    }

    // fiscal Number
    const [fiscalNumber, setFiscalNumber] = useState<string>('');

    function changeFiscalNumber(e: any) {
        const value = e.target.value;
        setFiscalNumber(value);
    }

    // vat number
    const [vatNumber, setVatNumber] = useState<string>('');

    function changeVatNumber(e: any) {
        const value = e.target.value;
        setVatNumber(value);
    }

    // company Type
    const [companyType, setCompanyType] = useState<string>('');

    function changeCompanyType(e: any) {
        const value = e.target.value;
        setCompanyType(value);
    }

    // company Name
    const [companyName, setCompanyName] = useState<string>('');

    function changeCompanyName(e: any) {
        const value = e.target.value;
        setCompanyName(value);
    }

    // company Address
    const [companyAddress, setCompanyAddress] = useState<string>('');

    function changeCompanyAddress(e: any) {
        const value = e.target.value;
        setCompanyAddress(value);
    }

    // company City
    const [companyCity, setCompanyCity] = useState<string>('');

    function changeCompanyCity(e: any) {
        const value = e.target.value;
        setCompanyCity(value);
    }

    // company State
    const [companyState, setCompanyState] = useState<string>('');

    function changeCompanyState(e: any) {
        const value = e.target.value;
        setCompanyState(value);
    }

    // companyZip
    const [companyZip, setCompanyZip] = useState<string>('');

    function changeCompanyZip(e: any) {
        const value = e.target.value;
        setCompanyZip(value);
    }

    function setPubCountry(e: any, val: any) {
        setCountries((val && val.code) || '');
    }

    function nextStep(e: any) {
        e.preventDefault();

        if (
            publisherName === '' ||
            publisherDescription === '' ||
            countries === '' ||
            vatNumber === '' ||
            fiscalNumber === ''
        ) {
            dispatch(setMessageUser(UM.FILL_ALL));
            return;
        } else {
            if (state) {
                if (
                    companyType === '' ||
                    companyName === '' ||
                    companyAddress === '' ||
                    companyCity === '' ||
                    companyState === '' ||
                    companyZip === ''
                ) {
                    dispatch(setMessageUser(UM.COMPANY_ERROR));
                    return;
                }
            }
        }

        const linkedin = socSites.find(
            (social) => social.name === SocialSiteName.linkedin
        )?.serName;
        const facebook = socSites.find(
            (social) => social.name === SocialSiteName.facebook
        )?.serName;
        const twitter = socSites.find(
            (social) => social.name === SocialSiteName.twitter
        )?.serName;
        const instagram = socSites.find(
            (social) => social.name === SocialSiteName.instagram
        )?.serName;
        const tiktok = socSites.find(
            (social) => social.name === SocialSiteName.tiktok
        )?.serName;

        const socialData = {
            facebook: facebook ? `https://www.facebook.com/${facebook}` : '',
            twitter: twitter ? `https://twitter.com/${twitter}` : '',
            linkedin: linkedin ? `https://www.linkedin.com/in/${linkedin}` : '',
            instagram: instagram
                ? `https://www.instagram.com/${instagram}`
                : '',
            tiktok: tiktok ? `https://www.tiktok.com/${tiktok}` : ''
        };

        const data = {
            name: publisherName,
            description: publisherDescription,
            avatar: null,
            cover: null,
            sites: [...sitesArray],
            socialNetwork: { ...socialData },
            fiscalNumber: fiscalNumber ? fiscalNumber : null,
            vatNumber: vatNumber ? vatNumber : null,
            countryCode: countries,
            isCompany: state,
            companyType: state ? companyType : null,
            companyName: state ? companyName : null,
            companyAddress: state ? companyAddress : null,
            companyCity: state ? companyCity : null,
            companyState: state ? companyState : null,
            companyZip: state ? companyZip : null
        };
        dispatch(setPublisherInformation(data));
        dispatch(setStep(1));
    }

    // @ts-ignore
    return (
        <section
            className="form-section"
            style={{ display: step === 0 ? 'block' : 'none' }}>
            <form action="#" className="form-block" onSubmit={nextStep}>
                <h2 className="fs24 font-bold">Publisher information</h2>
                <div className="add-method-box">
                    <TextField
                        className={classes.inputs}
                        id="YourName"
                        defaultValue={publisherName}
                        onChange={setPubName}
                        label="Your Name"
                        required={true}
                    />

                    <TextField
                        className={classes.inputs}
                        id="Description"
                        multiline
                        rows={3}
                        onChange={setPubDescription}
                        label="Description"
                        required={true}
                    />

                    <Autocomplete
                        id="demo-simple-select"
                        options={countriesCodes}
                        className="mt-3"
                        getOptionLabel={(option) => option.name}
                        style={{ width: '100%' }}
                        onChange={setPubCountry}
                        aria-required={true}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Country*"
                                variant="standard"
                            />
                        )}
                    />

                    <TextField
                        className={classes.inputs}
                        id="FiscalNumber"
                        label="Fiscal Number"
                        onChange={changeFiscalNumber}
                        type="text"
                        required={true}
                    />

                    <TextField
                        className={classes.inputs}
                        id="VatNumber"
                        onChange={changeVatNumber}
                        label="Vat Number"
                        type="text"
                        required={true}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state}
                                onChange={handleChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        className="mt-3"
                        label="I Am Representing a Company (LLC, Co. or Ltd.)"
                    />

                    {state && (
                        <>
                            <TextField
                                className={classes.inputs}
                                id="CompanyType"
                                onChange={changeCompanyType}
                                label="Company Type*"
                            />

                            <TextField
                                className={classes.inputs}
                                id="CompanyName"
                                onChange={changeCompanyName}
                                label="Company Name*"
                            />

                            <TextField
                                className={classes.inputs}
                                id="CompanyAddress"
                                onChange={changeCompanyAddress}
                                label="Company Address*"
                            />

                            <TextField
                                className={classes.inputs}
                                id="City"
                                onChange={changeCompanyCity}
                                label="City*"
                            />

                            <TextField
                                className={classes.inputs}
                                id="StateProvinceRegion"
                                onChange={changeCompanyState}
                                label="State / Province / Region*"
                            />

                            <TextField
                                className={classes.inputs}
                                onChange={changeCompanyZip}
                                id="ZIP"
                                label="ZIP*"
                                type="number"
                            />
                        </>
                    )}

                    <Typography variant="h6" className={classes.title}>
                        Your Sites
                        <Tooltip title="Add Sites" id={'test'} placement="top">
                            <i
                                className="fas fa-plus ml-2 c-red cursor-pointer"
                                onClick={openModal}
                            />
                        </Tooltip>
                    </Typography>

                    <List dense={true}>
                        {sitesArray.length > 0 &&
                            sitesArray.map((sitesName: string) => {
                                return (
                                    <SitesList
                                        key={keyGenerator(20)}
                                        name={sitesName}
                                        remove={RemoveSite}
                                    />
                                );
                            })}
                    </List>

                    <Typography variant="h6" className={classes.title}>
                        Your Social Networks
                        <Tooltip
                            title="Add Social Network"
                            id={'test'}
                            placement="top">
                            <i
                                className="fas fa-plus ml-2 c-red cursor-pointer"
                                onClick={openModalSocialNet}
                            />
                        </Tooltip>
                    </Typography>

                    <List dense={true}>
                        {socSites.map((site) => {
                            return (
                                <ListSocialNetworks
                                    key={keyGenerator(20)}
                                    site={site}
                                    startRemove={startRemove}
                                />
                            );
                        })}
                    </List>
                </div>
                <button type="submit" className="signup-btn mt-4">
                    Continue
                </button>
            </form>
            <AddSitesModal
                openModal={modalAddSite}
                closeModal={closeModal}
                save={startSaveNewSite}
            />

            <ModalAddSocialSite
                openModal={openModalSocialNetworks}
                added={socSites}
                save={startSaveAddSocialNetworks}
                closeModal={closeModalAddSocialNetwork}
            />
        </section>
    );
};